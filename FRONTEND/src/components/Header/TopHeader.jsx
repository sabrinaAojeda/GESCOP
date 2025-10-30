import React from 'react';

const TopHeader = ({ user, onLogout }) => {
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Implementar búsqueda global
      console.log('Buscar:', e.target.value);
    }
  };

  return (
    <header className="top-header">
      <div className="search-bar">
        <span>🔍</span>
        <input 
          type="text" 
          placeholder="Buscar documentos, vehículos, personas..." 
          onKeyPress={handleSearch}
        />
      </div>

      <div className="user-actions">
        <div style={{ position: 'relative' }}>
          <span>🔔</span>
          <div className="notification-badge">3</div>
        </div>
        <div>👤 {user?.name || 'Administrador'}</div>
        <button className="btn btn-secondary" onClick={onLogout}>
          🚪 Salir
        </button>
      </div>
    </header>
  );
};

export default TopHeader;