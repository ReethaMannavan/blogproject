# blog/tests.py
from django.test import override_settings
from django.core import mail
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


def get_auth_header_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"HTTP_AUTHORIZATION": f"Bearer {str(refresh.access_token)}"}


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend")
class BlogAppTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = "/api/v1/register/"
        self.blogs_url = "/api/v1/blog_posts/"
        self.comments_url = "/api/v1/comments/"

        # Create two users for permission tests
        self.user1 = User.objects.create_user(username="alice", email="alice@example.com", password="pass1234")
        self.user2 = User.objects.create_user(username="bob", email="bob@example.com", password="pass1234")

    def test_registration_creates_profile_and_sends_email(self):
        payload = {"username": "charlie", "email": "charlie@example.com", "password": "pass1234"}
        resp = self.client.post(self.register_url, payload, format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        # user exists
        user = User.objects.filter(username="charlie").first()
        self.assertIsNotNone(user)
        # profile auto-created
        self.assertTrue(hasattr(user, "profile"))
        # email was sent (the RegisterSerializer uses send_mail with fail_silently=True)
        self.assertGreaterEqual(len(mail.outbox), 1)
        self.assertIn("Welcome", mail.outbox[0].subject)

    def test_create_blog_requires_auth_and_owner_can_edit_delete(self):
        # unauthenticated create should be 401/403
        resp = self.client.post(self.blogs_url, {"title": "X", "content": "Y"})
        self.assertIn(resp.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

        # create as user1
        headers = get_auth_header_for_user(self.user1)
        create_resp = self.client.post(self.blogs_url, {"title": "Hello", "content": "World"}, format="json", **headers)
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)
        blog_id = create_resp.data["id"]

        # user2 cannot update user1's post
        headers2 = get_auth_header_for_user(self.user2)
        update_resp = self.client.put(f"{self.blogs_url}{blog_id}/", {"title": "Hack", "content": "No"}, format="json", **headers2)
        self.assertEqual(update_resp.status_code, status.HTTP_403_FORBIDDEN)

        # owner can update
        update_resp_owner = self.client.put(f"{self.blogs_url}{blog_id}/", {"title": "Updated", "content": "New"}, format="json", **headers)
        self.assertIn(update_resp_owner.status_code, [status.HTTP_200_OK, status.HTTP_202_ACCEPTED])

        # owner can delete
        del_resp = self.client.delete(f"{self.blogs_url}{blog_id}/", **headers)
        self.assertIn(del_resp.status_code, [status.HTTP_204_NO_CONTENT, status.HTTP_200_OK])

    def test_comment_creation_sends_notification_email_to_host(self):
        # create a blog by user1
        headers1 = get_auth_header_for_user(self.user1)
        create_resp = self.client.post(self.blogs_url, {"title": "Notify", "content": "Body"}, format="json", **headers1)
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)
        blog_id = create_resp.data["id"]

        # clear outbox then post comment as user2
        mail.outbox = []
        headers2 = get_auth_header_for_user(self.user2)
        # Assuming Comment endpoint accepts 'post' and 'content' fields
        comment_payload = {"post": blog_id, "content": "Nice post!"}
        comment_resp = self.client.post(self.comments_url, comment_payload, format="json", **headers2)
        self.assertEqual(comment_resp.status_code, status.HTTP_201_CREATED)

        # comment should trigger an email to admin (subject "New Comment Alert")
        self.assertGreaterEqual(len(mail.outbox), 1)
        subjects = [m.subject for m in mail.outbox]
        self.assertTrue(any("New Comment Alert" in s for s in subjects))

    def test_blog_list_and_retrieve(self):
        headers = get_auth_header_for_user(self.user1)
        r1 = self.client.post(self.blogs_url, {"title": "L1", "content": "C1"}, format="json", **headers)
        r2 = self.client.post(self.blogs_url, {"title": "L2", "content": "C2"}, format="json", **headers)
        self.assertEqual(r1.status_code, status.HTTP_201_CREATED)
        self.assertEqual(r2.status_code, status.HTTP_201_CREATED)

        list_resp = self.client.get(self.blogs_url)
        self.assertEqual(list_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(len(list_resp.data) >= 2 or "results" in list_resp.data)

        # retrieve detail
        blog_id = r1.data["id"]
        detail_resp = self.client.get(f"{self.blogs_url}{blog_id}/")
        self.assertEqual(detail_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(detail_resp.data["title"], "L1")
