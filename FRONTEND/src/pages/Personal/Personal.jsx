import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTableActions } from '../../hooks/useTableActions';
import { useFiltros } from '../../hooks/useFiltros';

const Personal = () => {
  const { personal } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'legajo', label: 'Legajo', visible: true },
    { key: 'nombre', label: 'Nombre Completo', visible: true },
    { key: 'dni', label: 'DNI', visible: true },
    { key: 'sector', label: 'Sector', visible: true },
    { key: 'cargo', label: 'Cargo', visible: true },
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'licenciaVencimiento', label: 'Licencia Venc.', visible: true },
    { key: 'telefono', label: 'Teléfono', visible: false },
    { key: 'email', label: 'Email', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(personal, columnasConfig);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
        return 'status-active';
      case 'licencia':
      case 'vacaciones':
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
        <span>Personal</span>
      </div>

      {/* Resumen cards */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{personal.length}</div>
          <div className="label">Empleados Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {personal.filter(p => p.estado === 'Activo').length}
          </div>
          <div className="label">Con Licencia Vigente</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {personal.filter(p => {
              if (!p.licenciaVencimiento) return false;
              const vencimiento = new Date(p.licenciaVencimiento);
              const hoy = new Date();
              const diffTime = vencimiento - hoy;
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 30 && diffDays > 0;
            }).length}
          </div>
          <div className="label">Licencias por Vencer</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">👥 Gestión de Personal</h2>
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
                      disabled={columna.key === 'legajo' || columna.key === 'nombre'}
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
              <span>+</span> Nuevo Empleado
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar empleado..." 
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
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Vacaciones">Vacaciones</option>
            <option value="Licencia">Licencia</option>
            <option value="Inactivo">Inactivo</option>
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
            {datosFiltrados.map(persona => (
              <tr key={persona.id}>
                <td>{persona.legajo}</td>
                <td>{persona.nombre}</td>
                <td>{persona.dni}</td>
                <td>{persona.sector}</td>
                <td>{persona.cargo}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(persona.estado)}`}>
                    {persona.estado}
                  </span>
                </td>
                <td>{formatearFecha(persona.licenciaVencimiento)}</td>
                <td>
                  {generarBotonesAcciones('personal', persona.id, persona)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} empleados
        </div>
      </section>
    </div>
  );
};

export default Personal;