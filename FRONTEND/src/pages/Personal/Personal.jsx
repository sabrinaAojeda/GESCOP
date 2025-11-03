import React from 'react'
import { Link } from 'react-router-dom'
import './Personal.css'

const Personal = () => {
  return (
    <div className="personal-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link> 
        <span>Personal</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">24</div>
          <div className="label">Empleados Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">18</div>
          <div className="label">Con Licencia Vigente</div>
        </div>
        <div className="summary-card-small">
          <div className="number">3</div>
          <div className="label">Licencias por Vencer</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">👥 Gestión de Personal</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Empleado
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar empleado..." />
          <select className="filter-select">
            <option>Todos los sectores</option>
            <option>Logística</option>
            <option>Producción</option>
            <option>Administración</option>
            <option>Mantenimiento</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Vacaciones</option>
            <option>Licencia</option>
            <option>Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Legajo</th>
              <th>Nombre Completo</th>
              <th>DNI</th>
              <th>Sector</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Licencia Venc.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1001</td>
              <td>Juan Pérez</td>
              <td>30.123.456</td>
              <td>Logística</td>
              <td>Chofer</td>
              <td><span className="status-badge status-active">Activo</span></td>
              <td>15/08/2024</td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Editar">✏️</button>
                  <button className="icon-btn" title="Documentación">📄</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>1002</td>
              <td>María García</td>
              <td>29.987.654</td>
              <td>Producción</td>
              <td>Operaria</td>
              <td><span className="status-badge status-warning">Licencia</span></td>
              <td>20/05/2024</td>
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

export default Personal