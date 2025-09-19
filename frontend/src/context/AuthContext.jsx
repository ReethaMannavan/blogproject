// import { createContext, useState, useEffect } from 'react';
// import api from '../api/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     if (token) {
//       api.get('users/me/').then(res => setUser(res.data)).catch(() => setUser(null));
//     }
//   }, []);

//   const login = (access, refresh) => {
//     localStorage.setItem('access', access);
//     localStorage.setItem('refresh', refresh);
//     api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
//     api.get('users/me/').then(res => setUser(res.data));
//   };

//   const logout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     delete api.defaults.headers.common['Authorization'];
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On load: fetch current user if access token exists
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      api.get("users/me/").then(res => setUser(res.data)).catch(() => setUser(null));
    }
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    api.get("users/me/").then(res => setUser(res.data));
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
