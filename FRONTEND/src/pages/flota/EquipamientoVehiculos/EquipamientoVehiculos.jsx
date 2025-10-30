import React from 'react';
import { useApp } from '../../../context/AppContext';
import { useTableActions } from '../../../hooks/useTableActions';
import { useFiltros } from '../../../hooks/useFiltros';

const EquipamientoVehiculos = () => {
  const { equipamiento } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'codigo', label: 'Código', visible: true },
    { key: 'descripcion', label: 'Descripción', visible: true },
    { key: 'tipo', label: 'Tipo', visible: true },
    { key: 'vehiculoAsignado', label: 'Vehículo Asignado', visible: true },
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'ultimaRevision', label: 'Última Revisión', visible: true },
    { key: 'proximaRevision', label: 'Próxima Revisión', visible: true },
    { key: 'observaciones', label: 'Observaciones', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(equipamiento, columnasConfig);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'operativo':
        return 'status-active';
      case 'mantenimiento':
        return 'status-warning';
      case 'inactivo':
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
        <span>Equipamiento</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{equipamiento.length}</div>
          <div className="label">ítems operativo</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🔧 Equipamiento</h2>
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
                      disabled={columna.key === 'codigo' || columna.key === 'descripcion'}
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
              <span>+</span> Nuevo Equipamiento
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
            onChange={(e) => manejarFiltroEspecifico('tipo', e.target.value)}
          >
            <option value="">Todos los tipos</option>
            <option value="GPS">GPS</option>
            <option value="Radio">Radio</option>
            <option value="Cámara">Cámara</option>
            <option value="Herramientas">Herramientas</option>
          </select>
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Operativo">Operativo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Vehículo Asignado</th>
              <th>Estado</th>
              <th>Última Revisión</th>
              <th>Próxima Revisión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map(item => (
              <tr key={item.id}>
                <td>{item.codigo}</td>
                <td>{item.descripcion}</td>
                <td>{item.tipo}</td>
                <td>{item.vehiculoAsignado}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(item.estado)}`}>
                    {item.estado}
                  </span>
                </td>
                <td>{formatearFecha(item.ultimaRevision)}</td>
                <td>{formatearFecha(item.proximaRevision)}</td>
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
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} ítems de equipamiento
        </div>
      </section>
    </div>
  );
};

export default EquipamientoVehiculos;