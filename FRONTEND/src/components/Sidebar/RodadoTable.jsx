import React, { useState } from 'react';
import './RodadoMaquinarias.css';

const RodadoMaquinarias = () => {
  const [vehiculos] = useState([
    {
      id: 1,
      interno: "001",
      anio: 2023,
      dominio: "AB-123-CD",
      modelo: "Toyota Hilux SRV",
      sector: "Logística",
      estado: "Activo"
    },
    {
      id: 2,
      interno: "002", 
      anio: 2022,
      dominio: "EF-456-GH",
      modelo: "Ford Ranger XLT",
      sector: "Producción",
      estado: "Mantenimiento"
    }
  ]);

  return (
    <div id="rodado-maquinarias-page" className="page active">
      <div className="breadcrumb">
        <a href="#">Dashboard</a> 
        <a href="#">Flota Vehicular</a> 
        <span>Rodado y Maquinarias</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
          <div className="table-toolbar">
            <div className="column-selector">
              <button className="btn btn-secondary">
                <span>👁️</span> Columnas
              </button>
              <div className="column-selector-content">
                {/* Contenido del selector de columnas */}
              </div>
            </div>
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
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Mantenimiento</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>INT.</th>
              <th>AÑO</th>
              <th>DOMINIO</th>
              <th>MODELO</th>
              <th>SECTOR</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map(vehiculo => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.interno}</td>
                <td>{vehiculo.anio}</td>
                <td>{vehiculo.dominio}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.sector}</td>
                <td>
                  <span className={`status-badge ${
                    vehiculo.estado === 'Activo' ? 'status-active' : 
                    vehiculo.estado === 'Mantenimiento' ? 'status-warning' : 'status-expired'
                  }`}>
                    {vehiculo.estado}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RodadoMaquinarias;