import React from 'react'
import { Link } from 'react-router-dom'
import './Reportes.css'

const Reportes = () => {
  return (
    <div className="reportes-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link>
        <span>Reportes</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">📈 Reportes y Estadísticas</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>📊</span> Generar Reporte
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar Todos
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card-small">
            <div className="number">15</div>
            <div className="label">Reportes Mensuales</div>
          </div>
          <div className="summary-card-small">
            <div className="number">8</div>
            <div className="label">Reportes Trimestrales</div>
          </div>
          <div className="summary-card-small">
            <div className="number">3</div>
            <div className="label">Reportes Anuales</div>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todos los tipos</option>
            <option>Vehículos</option>
            <option>Personal</option>
            <option>Mantenimiento</option>
            <option>Combustible</option>
            <option>Seguros</option>
          </select>
          <select className="filter-select">
            <option>Todos los períodos</option>
            <option>Mensual</option>
            <option>Trimestral</option>
            <option>Anual</option>
            <option>Personalizado</option>
          </select>
          <input type="date" className="filter-select" placeholder="Desde" />
          <input type="date" className="filter-select" placeholder="Hasta" />
          <button className="btn btn-primary">Aplicar Filtros</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre del Reporte</th>
              <th>Tipo</th>
              <th>Período</th>
              <th>Fecha Generación</th>
              <th>Generado por</th>
              <th>Tamaño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reporte Flota - Marzo 2024</td>
              <td>Vehículos</td>
              <td>Mensual</td>
              <td>01/04/2024</td>
              <td>Admin</td>
              <td>2.5 MB</td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Descargar">📤</button>
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Eliminar">🗑️</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Consumo Combustible - Q1 2024</td>
              <td>Combustible</td>
              <td>Trimestral</td>
              <td>05/04/2024</td>
              <td>Admin</td>
              <td>1.8 MB</td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Descargar">📤</button>
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Eliminar">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Reportes