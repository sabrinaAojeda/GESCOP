import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VehiculosVendidos = () => {
  // Datos de ejemplo
  const [vehiculosVendidos] = useState([
    { 
      id: 1, 
      interno: 'V001', 
      dominio: 'ABC123', 
      modelo: 'Volvo FH16', 
      fechaVenta: '2024-01-15', 
      comprador: 'Empresa XYZ', 
      precio: 150000, 
      estadoDocumentacion: 'Completa' 
    },
    { 
      id: 2, 
      interno: 'V002', 
      dominio: 'DEF456', 
      modelo: 'Mercedes Actros', 
      fechaVenta: '2024-02-20', 
      comprador: 'Transportes ABC', 
      precio: 120000, 
      estadoDocumentacion: 'En trámite' 
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    comprador: ''
  });

  const manejarBusqueda = (valor) => {
    setFiltros(prev => ({ ...prev, busqueda: valor }));
  };

  const manejarFiltroEspecifico = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const datosFiltrados = vehiculosVendidos.filter(vehiculo => {
    const coincideBusqueda = !filtros.busqueda || 
      vehiculo.interno.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      vehiculo.dominio.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      vehiculo.modelo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      vehiculo.comprador.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const coincideComprador = !filtros.comprador || vehiculo.comprador === filtros.comprador;
    
    return coincideBusqueda && coincideComprador;
  });

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'completa':
        return 'status-active';
      case 'en trámite':
        return 'status-warning';
      case 'incompleta':
        return 'status-expired';
      default:
        return '';
    }
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-AR');
    } catch (e) {
      return fechaString;
    }
  };

  const formatearPrecio = (precio) => {
    if (!precio) return '';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  const ColumnSelector = () => (
    <div className="column-selector">
      <button className="btn btn-secondary">
        <span>👁️</span> Columnas
      </button>
    </div>
  );

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span> / Vehículos Vendidos</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculosVendidos.length}</div>
          <div className="label">vehículos vendidos</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">💰 Vehículos Vendidos</h2>
          <div className="table-toolbar">
            <ColumnSelector />
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Registrar Venta
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar..." 
            value={filtros.busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
          />
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('comprador', e.target.value)}
          >
            <option value="">Todos los compradores</option>
            <option value="Empresa XYZ">Empresa XYZ</option>
            <option value="Transportes ABC">Transportes ABC</option>
          </select>
          <select className="filter-select">
            <option value="">Todos los años</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
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
            {datosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.interno}</td>
                <td>{vehiculo.dominio}</td>
                <td>{vehiculo.modelo}</td>
                <td>{formatearFecha(vehiculo.fechaVenta)}</td>
                <td>{vehiculo.comprador}</td>
                <td>{formatearPrecio(vehiculo.precio)}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(vehiculo.estadoDocumentacion)}`}>
                    {vehiculo.estadoDocumentacion}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">
                      👁️
                    </button>
                    <button className="icon-btn" title="Documentación">
                      📄
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {datosFiltrados.length} de {vehiculosVendidos.length} vehículos vendidos
        </div>
      </section>
    </div>
  );
};

export default VehiculosVendidos;