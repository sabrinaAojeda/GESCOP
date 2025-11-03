import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay usuario en localStorage al cargar
    const storedUser = localStorage.getItem('gescop_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    return new Promise((resolve, reject) => {
      // Simular delay de red
      setTimeout(() => {
        const validEmails = [
          'wendy.orellana@copesa-ar.com',
          'rrhh@copesa-ar.com',
          'gestiondocumental@copesa-ar.com',
          'a.sabrinaojeda@gmail.com'
        ];

        const emailLower = email.toLowerCase();
        
        if (validEmails.includes(emailLower)) {
          const userData = {
            email: email,
            name: getNameFromEmail(emailLower),
            role: getRoleFromEmail(emailLower),
            loginTime: new Date().toISOString()
          };
          
          setUser(userData);
          localStorage.setItem('gescop_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Correo no autorizado. Use un correo corporativo válido de COPESA.'));
        }
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gescop_user');
    // Forzar recarga para limpiar el estado
    window.location.href = '/login';
  };

  const getNameFromEmail = (email) => {
    const names = {
      'wendy.orellana@copesa-ar.com': 'Wendy ORELLANA',
      'rrhh@copesa-ar.com': 'Ana Tenorio',
      'gestiondocumental@copesa-ar.com': 'Gestión Documental',
      'a.sabrinaojeda@gmail.com': 'Sabrina Ojeda'
    };
    return names[email] || 'Usuario COPESA';
  };

  const getRoleFromEmail = (email) => {
    if (email.includes('wendy.orellana') || email.includes('a.sabrinaojeda') || email.includes('gestiondocumental')) {
      return 'admin';
    }
    return 'empleado';
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