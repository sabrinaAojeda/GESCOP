import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTableActions } from '../../hooks/useTableActions';
import { useFiltros } from '../../hooks/useFiltros';

const Sedes = () => {
  const { sedes } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'codigo', label: 'Código', visible: true },
    { key: 'nombre', label: 'Nombre Sede', visible: true },
    { key: 'direccion', label: 'Dirección', visible: true },
    { key: 'localidad', label: 'Localidad', visible: true },
    { key: 'provincia', label: 'Provincia', visible: true },
    { key: 'telefono', label: 'Teléfono', visible: true },
    { key: 'vehiculos', label: 'Vehículos', visible: true },
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'contacto', label: 'Contacto', visible: false },
    { key: 'email', label: 'Email', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(sedes, columnasConfig);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activa':
        return 'status-active';
      case 'en trámite':
        return 'status-warning';
      case 'inactiva':
        return 'status-expired';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <a href="/dashboard">Dashboard</a> 
        <span>Sedes/Empresas</span>
      </div>

      {/* Resumen cards */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{sedes.length}</div>
          <div className="label">Sedes Activas</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {sedes.reduce((total, sede) => total + (sede.vehiculos || 0), 0)}
          </div>
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
                      disabled={columna.key === 'codigo' || columna.key === 'nombre'}
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
              <span>+</span> Nueva Sede
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar sede..." 
            value={filtros.busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
          />
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('provincia', e.target.value)}
          >
            <option value="">Todas las provincias</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Córdoba">Córdoba</option>
            <option value="Santa Fe">Santa Fe</option>
            <option value="Mendoza">Mendoza</option>
          </select>
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
            <option value="En Trámite">En Trámite</option>
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
            {datosFiltrados.map(sede => (
              <tr key={sede.id}>
                <td>{sede.codigo}</td>
                <td>{sede.nombre}</td>
                <td>{sede.direccion}</td>
                <td>{sede.localidad}</td>
                <td>{sede.provincia}</td>
                <td>{sede.telefono}</td>
                <td>{sede.vehiculos}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(sede.estado)}`}>
                    {sede.estado}
                  </span>
                </td>
                <td>
                  {generarBotonesAcciones('sede', sede.id, sede)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} sedes
        </div>
      </section>
    </div>
  );
};

export default Sedes;