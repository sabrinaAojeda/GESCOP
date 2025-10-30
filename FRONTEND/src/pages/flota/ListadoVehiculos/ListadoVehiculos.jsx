import React from 'react';
import { Link } from 'react-router-dom';

const ListadoVehiculos = () => {
  return (
    <div id="listado-vehiculos-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Listado de Vehículos</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">47</div>
          <div className="label">registros operativo</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">📋 Listado de Vehículos</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Vehículo
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar..." />
          <select className="filter-select">
            <option>Todos los sectores</option>
            <option>Logística</option>
            <option>Producción</option>
            <option>Administración</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Mantenimiento</option>
            <option>Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Interno</th>
              <th>Dominio</th>
              <th>Marca/Modelo</th>
              <th>Sector</th>
              <th>Estado</th>
              <th>VTV Venc.</th>
              <th>Seguro Venc.</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>AB-123-CD</td>
              <td>Toyota Hilux</td>
              <td>Logística</td>
              <td><span className="status-badge status-active">Activo</span></td>
              <td>15/06/2024</td>
              <td>30/04/2024</td>
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
  );
};

export default ListadoVehiculos;