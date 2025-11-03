import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()

  const summaryCards = [
    {
      title: 'Flota Vehicular',
      icon: '🚗',
      number: '47',
      label: 'vehículos',
      alert: '5 vencimientos',
      color: 'flota',
      page: 'rodado-maquinarias'
    },
    {
      title: 'Personal',
      icon: '👥',
      number: '24',
      label: 'personas',
      alert: '3 certificados por vencer',
      color: 'personal',
      page: 'personal'
    },
    {
      title: 'Sedes/Empresas',
      icon: '🏢',
      number: '5',
      label: 'sedes',
      alert: '1 permiso vencido',
      color: 'sedes',
      page: 'sedes'
    },
    {
      title: 'Proveedores',
      icon: '🤝',
      number: '12',
      label: 'proveedores',
      alert: '2 contratos por renovar',
      color: 'proveedores',
      page: 'proveedores'
    }
  ]

  return (
    <div className="dashboard-page">
      {/* Alert Panel */}
      <div className="alert-panel">
        <div className="alert-header">
          <span>⚠️</span>
          <strong>Alertas de Vencimiento</strong>
        </div>
        <div className="alert-item">
          <span>Seguro del vehículo AB-123-CD vence en 3 días</span>
          <button className="btn btn-primary small">Ver</button>
        </div>
        <div className="alert-item">
          <span>Certificado de Juan Pérez vence en 7 días</span>
          <button className="btn btn-primary small">Ver</button>
        </div>
      </div>

      {/* Dashboard Summary */}
      <section className="dashboard-grid">
        {summaryCards.map((card, index) => (
          <div 
            key={index}
            className={`summary-card ${card.color}`}
            onClick={() => navigate(`/${card.page}`)}
          >
            <div className="card-header">
              <span className="card-icon">{card.icon}</span>
              <h3>{card.title}</h3>
            </div>
            <div className="card-stats">
              <span className="card-number">{card.number}</span>
              <span className="card-label">{card.label}</span>
            </div>
            <div className="card-alert">{card.alert}</div>
          </div>
        ))}
      </section>

      {/* Vencimientos Recientes Section */}
      <section className="data-section">
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
      </section>
    </div>
  )
}

export default Dashboard