import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [selectedRole, setSelectedRole] = useState('admin')
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validación básica
    if (!credentials.email || !credentials.password) {
      setErrorMessage('Por favor, complete todos los campos')
      setShowError(true)
      return
    }

    if (!credentials.email.includes('@empresa.com')) {
      setErrorMessage('Por favor, use su correo corporativo (@empresa.com)')
      setShowError(true)
      return
    }

    setIsLoading(true)
    
    // Simular proceso de login
    setTimeout(() => {
      // Credenciales de prueba
      const validEmails = [
        'admin@empresa.com',
        'juan.perez@empresa.com',
        'maria.garcia@empresa.com',
        'carlos.lopez@empresa.com'
      ]
      
      if (validEmails.includes(credentials.email.toLowerCase()) && credentials.password === '123456') {
        // Login exitoso
        localStorage.setItem('userRole', selectedRole)
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('userName', getNameFromEmail(credentials.email))
        navigate('/')
      } else {
        // Login fallido
        setErrorMessage('Credenciales incorrectas. Use: admin@empresa.com / 123456')
        setShowError(true)
        setIsLoading(false)
      }
    }, 2000)
  }

  const getNameFromEmail = (email) => {
    const names = {
      'admin@empresa.com': 'Administrador',
      'juan.perez@empresa.com': 'Juan Pérez',
      'maria.garcia@empresa.com': 'María García', 
      'carlos.lopez@empresa.com': 'Carlos López'
    }
    return names[email.toLowerCase()] || 'Usuario'
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <span>🌐</span>
            GESCOP
          </div>
          <div className="login-subtitle">Bienvenido, ingrese sus datos para continuar</div>
        </div>

        <div className="login-body">
          {/* Alert de error */}
          {showError && (
            <div className="alert alert-error">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Correo Corporativo</label>
              <input
                type="email"
                className="form-input"
                placeholder="usuario@empresa.com"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Usuario</label>
              <div className="role-selector">
                <div 
                  className={`role-option ${selectedRole === 'admin' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('admin')}
                >
                  <span className="role-icon">👨‍💼</span>
                  Administrador
                </div>
                <div 
                  className={`role-option ${selectedRole === 'empleado' ? 'selected' : ''}`}
                  onClick={() => setSelectedRole('empleado')}
                >
                  <span className="role-icon">👤</span>
                  Empleado
                </div>
              </div>
            </div>

            {!isLoading ? (
              <button type="submit" className="btn btn-primary">
                🔐 Iniciar Sesión
              </button>
            ) : (
              <div className="loading">
                <div className="spinner"></div>
                <div>Verificando credenciales...</div>
              </div>
            )}
          </form>

          <div className="login-footer">
            <div className="footer-text">
              💼 Acceso restringido al personal autorizado
            </div>
            <div className="footer-text small">
              ¿Problemas para acceder? Contacte al administrador del sistema
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login