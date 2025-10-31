import React from 'react';
import { useApp } from '../../../context/AppContext';
import { useTableActions } from '../../../hooks/useTableActions';
import { useFiltros } from '../../../hooks/useFiltros';

const ListadoVehiculos = () => {
  const { vehiculos } = useApp();
  const { generarBotonesAcciones, manejarAccion } = useTableActions();

  const columnasConfig = [
    { key: 'interno', label: 'Interno', visible: true },
    { key: 'dominio', label: 'Dominio', visible: true },
    { key: 'modelo', label: 'Marca/Modelo', visible: true },
    { key: 'sector', label: 'Sector', visible: true },
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'vtvVencimiento', label: 'VTV Venc.', visible: true },
    { key: 'vtvEstado', label: 'VTV Estado', visible: false },
    { key: 'habilitacionVencimiento', label: 'Hab. Venc.', visible: false },
    { key: 'habilitacionEstado', label: 'Hab. Estado', visible: false },
    { key: 'chofer', label: 'Chofer', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(vehiculos, columnasConfig);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
      case 'vigente':
        return 'status-active';
      case 'mantenimiento':
      case 'por vencer':
        return 'status-warning';
      case 'inactivo':
      case 'vencido':
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

  return (
    <div>
      <div className="breadcrumb">
        <a href="/dashboard">Dashboard</a> 
        <span>Listado de Vehículos</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculos.length}</div>
          <div className="label">registros operativo</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">📋 Listado de Vehículos</h2>
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
              <span>+</span> Nuevo Vehículo
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
            onChange={(e) => manejarFiltroEspecifico('sector', e.target.value)}
          >
            <option value="">Todos los sectores</option>
            <option value="Logística">Logística</option>
            <option value="Producción">Producción</option>
            <option value="Administración">Administración</option>
          </select>
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
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
            {datosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.interno}</td>
                <td>{vehiculo.dominio}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.sector}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(vehiculo.estado)}`}>
                    {vehiculo.estado}
                  </span>
                </td>
                <td>{formatearFecha(vehiculo.vtvVencimiento)}</td>
                <td>{formatearFecha(vehiculo.habilitacionVencimiento)}</td>
                <td>
                  {generarBotonesAcciones('vehiculo', vehiculo.id, vehiculo, manejarAccion)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} vehículos
        </div>
      </section>
    </div>
  );
};

export default ListadoVehiculos;