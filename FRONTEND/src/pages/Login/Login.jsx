import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Administrador');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-completar para testing
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 't') {
        setEmail('admin@empresa.com');
        setPassword('123456');
        setUserType('Administrador');
      }
      if (e.key === 'e') {
        setEmail('juan.perez@empresa.com');
        setPassword('123456');
        setUserType('Empleado');
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación básica
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      setLoading(false);
      return;
    }

    if (!email.includes('@empresa.com')) {
      setError('Por favor, use su correo corporativo (@empresa.com)');
      setLoading(false);
      return;
    }

    // Simular proceso de login
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Credenciales de prueba
      const validEmails = [
        'admin@empresa.com',
        'juan.perez@empresa.com',
        'maria.garcia@empresa.com',
        'carlos.lopez@empresa.com'
      ];
      
      if (validEmails.includes(email.toLowerCase()) && password === '123456') {
        const userData = {
          email: email.toLowerCase(),
          userType,
          name: getNameFromEmail(email)
        };
        onLogin(userData);
      } else {
        setError('Credenciales incorrectas. Use: admin@empresa.com / 123456');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const getNameFromEmail = (email) => {
    const names = {
      'admin@empresa.com': 'Administrador',
      'juan.perez@empresa.com': 'Juan Pérez',
      'maria.garcia@empresa.com': 'María García', 
      'carlos.lopez@empresa.com': 'Carlos López'
    };
    return names[email.toLowerCase()] || 'Usuario';
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <span>🌐</span>
            Título Empresa
          </div>
          <div className="login-subtitle">Bienvenido, ingrese sus datos para continuar</div>
        </div>

        <div className="login-body">
          {/* Alert de error */}
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Correo Corporativo</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="usuario@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Usuario</label>
              <div className="role-selector">
                <div 
                  className={`role-option ${userType === 'Administrador' ? 'selected' : ''}`}
                  onClick={() => !loading && setUserType('Administrador')}
                >
                  <span className="role-icon">👨‍💼</span>
                  Administrador
                </div>
                <div 
                  className={`role-option ${userType === 'Empleado' ? 'selected' : ''}`}
                  onClick={() => !loading && setUserType('Empleado')}
                >
                  <span className="role-icon">👤</span>
                  Empleado
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? '🔐 Verificando...' : '🔐 Iniciar Sesión'}
            </button>

            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <div className="loading-text">Verificando credenciales...</div>
              </div>
            )}
          </form>

          <div className="login-footer">
            <div className="footer-text">
              💼 Acceso restringido al personal autorizado
            </div>
            <div className="footer-text-small">
              ¿Problemas para acceder? Contacte al administrador del sistema
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;