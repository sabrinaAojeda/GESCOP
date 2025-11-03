import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      logout();
    }
  };

  return (
    <header className="top-header">
      <div className="search-bar">
        <span>🔍</span>
        <input 
          type="text" 
          placeholder="Buscar documentos, vehículos, personas..." 
        />
      </div>

      <div className="user-actions">
        <div className="notification-icon">
          <span>🔔</span>
          <div className="notification-badge">3</div>
        </div>
        <div className="user-info">
          <span>👤</span>
          {user?.name}
        </div>
        <button 
          className="btn-logout"
          onClick={handleLogout}
        >
          🚪 Salir
        </button>
      </div>
    </header>
  );
};

export default Header;