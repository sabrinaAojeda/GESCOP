import React from 'react'
import { Link } from 'react-router-dom'
import './Sedes.css'

const Sedes = () => {
  return (
    <div className="sedes-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link>  
        <span>Sedes/Empresas</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">5</div>
          <div className="label">Sedes Activas</div>
        </div>
        <div className="summary-card-small">
          <div className="number">12</div>
          <div className="label">Vehículos Asignados</div>
        </div>
        <div className="summary-card-small">
          <div className="number">1</div>
          <div className="label">Permisos por Vencer</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🏢 Gestión de Sedes y Empresas</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nueva Sede
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar sede..." />
          <select className="filter-select">
            <option>Todas las provincias</option>
            <option>Buenos Aires</option>
            <option>Córdoba</option>
            <option>Santa Fe</option>
            <option>Mendoza</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activa</option>
            <option>Inactiva</option>
            <option>En Trámite</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre Sede</th>
              <th>Dirección</th>
              <th>Localidad</th>
              <th>Provincia</th>
              <th>Teléfono</th>
              <th>Vehículos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SED-001</td>
              <td>Sede Central</td>
              <td>Av. Principal 1234</td>
              <td>Capital</td>
              <td>Buenos Aires</td>
              <td>011-4567-8901</td>
              <td>8</td>
              <td><span className="status-badge status-active">Activa</span></td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Editar">✏️</button>
                  <button className="icon-btn" title="Documentación">📄</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>SED-002</td>
              <td>Planta Industrial</td>
              <td>Ruta 8 Km 45</td>
              <td>Pilar</td>
              <td>Buenos Aires</td>
              <td>0230-456-789</td>
              <td>15</td>
              <td><span className="status-badge status-active">Activa</span></td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Editar">✏️</button>
                  <button className="icon-btn" title="Documentación">📄</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Sedes