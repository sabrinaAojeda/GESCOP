import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Efecto para el selector de roles
  useEffect(() => {
    const roleOptions = document.querySelectorAll('.role-option');
    
    const handleRoleClick = function() {
      roleOptions.forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
    };

    roleOptions.forEach(option => {
      option.addEventListener('click', handleRoleClick);
    });

    // Cleanup
    return () => {
      roleOptions.forEach(option => {
        option.removeEventListener('click', handleRoleClick);
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!email) {
      setError('Por favor, ingrese su correo corporativo');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, ingrese un correo electrónico válido');
      setLoading(false);
      return;
    }

    try {
      await login(email);
      // La redirección se maneja en el useEffect de arriba
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo">
          <span>🌐</span>
          GESCOP - COPESA
        </div>
        <div className="login-subtitle">Bienvenido, ingrese sus datos para continuar</div>
      </div>

      <div className="login-body">
        {error && (
          <div className="alert alert-error" id="errorAlert">
            {error}
          </div>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo Corporativo</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="usuario@copesa-ar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Usuario</label>
            <div className="role-selector">
              <div className="role-option selected" data-role="admin">
                <span className="role-icon">👨‍💼</span>
                Administrador
              </div>
              <div className="role-option" data-role="empleado">
                <span className="role-icon">👤</span>
                Empleado
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            id="loginBtn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Verificando...
              </>
            ) : (
              <>🔐 Iniciar Sesión</>
            )}
          </button>

          {loading && (
            <div className="loading" id="loading">
              <div className="spinner"></div>
              <div>Verificando credenciales...</div>
            </div>
          )}
        </form>

        <div className="login-footer">
          <div className="footer-text">
            💼 Acceso restringido al personal autorizado
          </div>
          <div className="footer-text" style={{marginTop: '8px', fontSize: '12px'}}>
            ¿Problemas para acceder? Contacte al administrador del sistema
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;