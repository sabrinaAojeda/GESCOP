import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay usuario en localStorage usando los datos correctos
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    if (userEmail) {
      setUser({
        email: userEmail,
        role: userRole,
        name: userName
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const userObj = {
      email: userData.email,
      role: userData.role, 
      name: userData.name
    };
    setUser(userObj);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
