import React from 'react'
import { Link } from 'react-router-dom'
import './Alertas.css'

const Alertas = () => {
  return (
    <div className="alertas-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link>
        <span>Alertas</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🔔 Sistema de Alertas</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>⚙️</span> Configurar Alertas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card-small">
            <div className="number">8</div>
            <div className="label">Alertas Activas</div>
          </div>
          <div className="summary-card-small">
            <div className="number">3</div>
            <div className="label">Críticas</div>
          </div>
          <div className="summary-card-small">
            <div className="number">12</div>
            <div className="label">Resueltas Hoy</div>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todas las categorías</option>
            <option>Vencimientos</option>
            <option>Mantenimiento</option>
            <option>Documentación</option>
            <option>Seguros</option>
            <option>Personal</option>
          </select>
          <select className="filter-select">
            <option>Todos los niveles</option>
            <option>Crítico</option>
            <option>Alto</option>
            <option>Medio</option>
            <option>Bajo</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En Proceso</option>
            <option>Resuelto</option>
          </select>
          <button className="btn btn-primary">Aplicar Filtros</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Elemento</th>
              <th>Fecha Generación</th>
              <th>Vencimiento</th>
              <th>Nivel</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ALT-001</td>
              <td>Vencimientos</td>
              <td>VTV por vencer</td>
              <td>AB-123-CD</td>
              <td>01/04/2024</td>
              <td>15/04/2024</td>
              <td><span className="status-badge status-warning">Alto</span></td>
              <td><span className="status-badge status-warning">Pendiente</span></td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Resolver">✅</button>
                  <button className="icon-btn" title="Posponer">⏰</button>
                  <button className="icon-btn" title="Ver">👁️</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>ALT-002</td>
              <td>Mantenimiento</td>
              <td>Service próximo</td>
              <td>EF-456-GH</td>
              <td>28/03/2024</td>
              <td>05/04/2024</td>
              <td><span className="status-badge status-expired">Crítico</span></td>
              <td><span className="status-badge status-warning">Pendiente</span></td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Resolver">✅</button>
                  <button className="icon-btn" title="Posponer">⏰</button>
                  <button className="icon-btn" title="Ver">👁️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Alertas