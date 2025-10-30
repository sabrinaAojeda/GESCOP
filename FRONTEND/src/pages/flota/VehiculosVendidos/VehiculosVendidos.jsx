import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VehiculosVendidos = () => {
  const [vehiculosVendidos] = useState([
    {
      id: 1,
      interno: "045",
      dominio: "MN-789-PQ",
      modelo: "Volkswagen Amarok",
      fechaVenta: "2024-01-15",
      comprador: "Empresa XYZ",
      precio: "$25,000,000",
      estadoDocumentacion: "Completa"
    },
    {
      id: 2,
      interno: "028",
      dominio: "RS-456-AB",
      modelo: "Ford Ranger Wildtrak",
      fechaVenta: "2024-02-20",
      comprador: "Transportes ABC",
      precio: "$22,500,000",
      estadoDocumentacion: "Pendiente"
    }
  ]);

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Completa': return 'status-active';
      case 'Pendiente': return 'status-warning';
      case 'Incompleta': return 'status-expired';
      default: return '';
    }
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-AR');
  };

  return (
    <div id="vehiculos-vendidos-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Vehículos Vendidos</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculosVendidos.length}</div>
          <div className="label">Vehículos Vendidos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">$47,500,000</div>
          <div className="label">Total en Ventas</div>
        </div>
        <div className="summary-card-small">
          <div className="number">2</div>
          <div className="label">Ventas Este Mes</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">💰 Vehículos Vendidos</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Registrar Venta
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar..." />
          <select className="filter-select">
            <option>Todos los años</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select className="filter-select">
            <option>Todos los compradores</option>
            <option>Empresa XYZ</option>
            <option>Transportes ABC</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Interno</th>
              <th>Dominio</th>
              <th>Marca/Modelo</th>
              <th>Fecha Venta</th>
              <th>Comprador</th>
              <th>Precio</th>
              <th>Estado Documentación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosVendidos.map(vehiculo => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.interno}</td>
                <td>{vehiculo.dominio}</td>
                <td>{vehiculo.modelo}</td>
                <td>{formatearFecha(vehiculo.fechaVenta)}</td>
                <td>{vehiculo.comprador}</td>
                <td>{vehiculo.precio}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(vehiculo.estadoDocumentacion)}`}>
                    {vehiculo.estadoDocumentacion}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                    <button className="icon-btn" title="Contrato">📝</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {vehiculosVendidos.length} vehículos vendidos</div>
      </section>
    </div>
  );
};

export default VehiculosVendidos;