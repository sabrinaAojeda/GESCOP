import React from 'react'
import './Header.css'

const Header = ({ onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="top-header">
      <div className="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Buscar documentos, vehículos, personas..." />
      </div>
      
      <div className="user-actions">
        <div style={{ position: 'relative' }}>
          <span>🔔</span>
          <div className="notification-badge">3</div>
        </div>
        <div>👤 Administrador</div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          🚪 Salir
        </button>
      </div>
    </header>
  )
}

export default Header