import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [flotaExpanded, setFlotaExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sidebar">
      <div className="logo">
        <span>📊</span>
        GesDoc Pro
      </div>

      <div className="nav-section">
        <div className="nav-title">Navegación Principal</div>
        <Link 
          to="/dashboard" 
          className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span>🏠</span> Dashboard
        </Link>
        
        <div 
          className={`nav-item has-submenu ${flotaExpanded ? 'expanded' : ''}`}
          onClick={() => setFlotaExpanded(!flotaExpanded)}
        >
          <span>🚗</span> Flota Vehicular
        </div>
        
        <div className={`submenu ${flotaExpanded ? 'expanded' : ''}`}>
          <Link 
            to="/flota/rodado-maquinarias" 
            className={`submenu-item ${isActive('/flota/rodado-maquinarias') ? 'active' : ''}`}
          >
            <span>🚛</span> Rodado y Maquinarias
          </Link>
          <Link 
            to="/flota/listado-vehiculos" 
            className={`submenu-item ${isActive('/flota/listado-vehiculos') ? 'active' : ''}`}
          >
            <span>📋</span> Listado de Vehículos
          </Link>
          <Link 
            to="/flota/vehiculos-vendidos" 
            className={`submenu-item ${isActive('/flota/vehiculos-vendidos') ? 'active' : ''}`}
          >
            <span>💰</span> Vehículos Vendidos
          </Link>
          <Link 
            to="/flota/equipamiento" 
            className={`submenu-item ${isActive('/flota/equipamiento') ? 'active' : ''}`}
          >
            <span>🔧</span> Equipamiento
          </Link>
        </div>

        <Link 
          to="/personal" 
          className={`nav-item ${isActive('/personal') ? 'active' : ''}`}
        >
          <span>👥</span> Personal
        </Link>
        <Link 
          to="/sedes" 
          className={`nav-item ${isActive('/sedes') ? 'active' : ''}`}
        >
          <span>🏢</span> Sedes/Empresas
        </Link>
        <Link 
          to="/proveedores" 
          className={`nav-item ${isActive('/proveedores') ? 'active' : ''}`}
        >
          <span>🤝</span> Proveedores
        </Link>
      </div>

      <div className="nav-section">
        <div className="nav-title">Herramientas</div>
        <Link 
          to="/reportes" 
          className={`nav-item ${isActive('/reportes') ? 'active' : ''}`}
        >
          <span>📈</span> Reportes
        </Link>
        <Link 
          to="/alertas" 
          className={`nav-item ${isActive('/alertas') ? 'active' : ''}`}
        >
          <span>🔔</span> Alertas
        </Link>
        <Link 
          to="/configuracion" 
          className={`nav-item ${isActive('/configuracion') ? 'active' : ''}`}
        >
          <span>⚙️</span> Configuración
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;