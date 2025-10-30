import React from 'react';
import { useApp } from '../../../context/AppContext';
import { useTableActions } from '../../../hooks/useTableActions';
import { useFiltros } from '../../../hooks/useFiltros';

const VehiculosVendidos = () => {
  const { vehiculosVendidos } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'interno', label: 'Interno', visible: true },
    { key: 'dominio', label: 'Dominio', visible: true },
    { key: 'modelo', label: 'Marca/Modelo', visible: true },
    { key: 'fechaVenta', label: 'Fecha Venta', visible: true },
    { key: 'comprador', label: 'Comprador', visible: true },
    { key: 'precio', label: 'Precio', visible: true },
    { key: 'estadoDocumentacion', label: 'Estado Documentación', visible: true }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(vehiculosVendidos, columnasConfig);

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

  return (
    <div>
      <div className="breadcrumb">
        <a href="/dashboard">Dashboard</a> 
        <span>Vehículos Vendidos</span>
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
            <div className="column-selector">
              <button className="btn btn-secondary">
                <span>👁️</span> Columnas
              </button>
              <div className="column-selector-content">
                {columnasConfig.map(columna => (
                  <label key={columna.key} className="column-option">
                    <input 
                      type="checkbox" 
                      checked={columna.visible} 
                      onChange={() => {}} 
                      disabled={columna.key === 'interno' || columna.key === 'dominio'}
                    />
                    {columna.label}
                  </label>
                ))}
              </div>
            </div>
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
            <option value="Empresa A">Empresa A</option>
            <option value="Empresa B">Empresa B</option>
          </select>
          <select className="filter-select">
            <option value="">Todos los años</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
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
                    <button 
                      className="icon-btn" 
                      title="Ver"
                      onClick={() => {}}
                    >
                      👁️
                    </button>
                    <button 
                      className="icon-btn" 
                      title="Documentación"
                      onClick={() => {}}
                    >
                      📄
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} vehículos vendidos
        </div>
      </section>
    </div>
  );
};

export default VehiculosVendidos;