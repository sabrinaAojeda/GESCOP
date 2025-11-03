import React from 'react'
import './TopHeader.css'

const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="search-bar">
        <span>🔍</span>
        <input 
          type="text" 
          placeholder="Buscar documentos, vehículos, personas..." 
          className="search-input"
        />
      </div>

      <div className="user-actions">
        <div className="notification-icon">
          <span>🔔</span>
          <div className="notification-badge">3</div>
        </div>
        <div className="user-info">👤 Administrador</div>
        <button className="btn btn-secondary">🚪 Salir</button>
      </div>
    </div>
  )
}

export default TopHeader