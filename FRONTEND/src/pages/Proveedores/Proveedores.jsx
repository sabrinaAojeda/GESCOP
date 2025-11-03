import React from 'react'
import { Link } from 'react-router-dom'
import './Proveedores.css'

const Proveedores = () => {
  return (
    <div className="proveedores-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link> 
        <span>Proveedores</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">12</div>
          <div className="label">Proveedores Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">8</div>
          <div className="label">Contratos Vigentes</div>
        </div>
        <div className="summary-card-small">
          <div className="number">2</div>
          <div className="label">Contratos por Renovar</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🤝 Gestión de Proveedores</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Proveedor
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar proveedor..." />
          <select className="filter-select">
            <option>Todos los rubros</option>
            <option>Combustible</option>
            <option>Repuestos</option>
            <option>Mantenimiento</option>
            <option>Seguros</option>
            <option>Neumáticos</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Suspendido</option>
            <option>Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Razón Social</th>
              <th>CUIT</th>
              <th>Rubro</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PROV-001</td>
              <td>YPF S.A.</td>
              <td>30-12345678-9</td>
              <td>Combustible</td>
              <td>Carlos Rodríguez</td>
              <td>011-4789-1234</td>
              <td>crodriguez@ypf.com</td>
              <td><span className="status-badge status-active">Activo</span></td>
              <td>
                <div className="action-buttons">
                  <button className="icon-btn" title="Ver">👁️</button>
                  <button className="icon-btn" title="Editar">✏️</button>
                  <button className="icon-btn" title="Documentación">📄</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>PROV-002</td>
              <td>Neumáticos SRL</td>
              <td>30-98765432-1</td>
              <td>Neumáticos</td>
              <td>Ana López</td>
              <td>011-4123-4567</td>
              <td>alopez@neumaticos.com</td>
              <td><span className="status-badge status-active">Activo</span></td>
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

export default Proveedores