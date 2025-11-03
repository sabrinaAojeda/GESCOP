import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-page">
      {/* Alertas de Vencimiento */}
      <div className="alert-panel">
        <div className="alert-header">
          <span>⚠️</span>
          <strong>Alertas de Vencimiento</strong>
        </div>
        <div className="alert-item">
          <span>Seguro del vehículo AB-123-CD vence en 3 días</span>
          <button className="btn-ver">Ver</button>
        </div>
        <div className="alert-item">
          <span>Certificado de Juan Pérez vence en 7 días</span>
          <button className="btn-ver">Ver</button>
        </div>
      </div>

      {/* Resumen General */}
      <div className="dashboard-grid">
        <div 
          className="summary-card flota" 
          onClick={() => handleCardClick('/flota/rodado-maquinarias')}
        >
          <div className="card-header">
            <span className="card-icon">🚗</span>
            <h3>Flota Vehicular</h3>
          </div>
          <div className="card-stats">
            <span className="card-number">47</span>
            <span className="card-label">vehículos</span>
          </div>
          <div className="card-alert">5 vencimientos</div>
        </div>

        <div 
          className="summary-card personal" 
          onClick={() => handleCardClick('/personal')}
        >
          <div className="card-header">
            <span className="card-icon">👥</span>
            <h3>Personal</h3>
          </div>
          <div className="card-stats">
            <span className="card-number">24</span>
            <span className="card-label">personas</span>
          </div>
          <div className="card-alert">3 certificados por vencer</div>
        </div>

        <div 
          className="summary-card sedes" 
          onClick={() => handleCardClick('/sedes')}
        >
          <div className="card-header">
            <span className="card-icon">🏢</span>
            <h3>Sedes/Empresas</h3>
          </div>
          <div className="card-stats">
            <span className="card-number">5</span>
            <span className="card-label">sedes</span>
          </div>
          <div className="card-alert">1 permiso vencido</div>
        </div>

        <div 
          className="summary-card proveedores" 
          onClick={() => handleCardClick('/proveedores')}
        >
          <div className="card-header">
            <span className="card-icon">🤝</span>
            <h3>Proveedores</h3>
          </div>
          <div className="card-stats">
            <span className="card-number">12</span>
            <span className="card-label">proveedores</span>
          </div>
          <div className="card-alert">2 contratos por renovar</div>
        </div>
      </div>

      {/* Vencimientos Próximos */}
      <div className="data-section">
        <div className="section-header">
          <h2 className="section-title">📋 Vencimientos Próximos</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>⏷</span> Filtrar
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Documento
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todos los tipos</option>
            <option>Seguro</option>
            <option>VTV</option>
            <option>Certificado</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Vigente</option>
            <option>Por vencer</option>
            <option>Vencido</option>
          </select>
          <input type="date" className="filter-select" />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Tipo Documento</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Documentos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>AB-123-CD</strong><br />
                <small>Toyota Hilux 2023</small>
              </td>
              <td>Seguro</td>
              <td>15/03/2024</td>
              <td><span className="status-badge status-warning">Por vencer</span></td>
              <td>📄📄</td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Editar">✏️</button>
                  <button className="icon-btn" title="Descargar">📤</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;