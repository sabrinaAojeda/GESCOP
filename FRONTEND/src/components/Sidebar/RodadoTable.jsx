import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTableActions } from '../../hooks/useTableActions';
import { useFiltros } from '../../hooks/useFiltros';
import './RodadoTable.css';

const RodadoTable = () => {
  const { vehiculos } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'interno', label: 'INT.', visible: true },
    { key: 'anio', label: 'AÑO', visible: true },
    { key: 'dominio', label: 'DOMINIO', visible: true },
    { key: 'modelo', label: 'MODELO', visible: true },
    { key: 'eqIncorporado', label: 'EQ. INCORPORADO', visible: false },
    { key: 'sector', label: 'SECTOR', visible: true },
    { key: 'chofer', label: 'CHOFER', visible: false },
    { key: 'estado', label: 'ESTADO', visible: true },
    { key: 'observaciones', label: 'OBSERVACIONES', visible: false },
    { key: 'vtvVencimiento', label: 'VTV VTO.', visible: false },
    { key: 'vtvEstado', label: 'VTV EV', visible: false },
    { key: 'habilitacionVencimiento', label: 'HAB. VTO.', visible: false },
    { key: 'habilitacionEstado', label: 'HAB. EH', visible: false },
    { key: 'tipoSeguro', label: 'TIPO SEGURO', visible: false },
    { key: 'seguroTecnico', label: 'SEG. TÉCNICO', visible: false },
    { key: 'seguroCargas', label: 'SEG. CARGAS PEL.', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    columnasVisibles,
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
      case 'por vencer':
      case 'mantenimiento':
        return 'status-warning';
      case 'vencido':
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
    <section className="data-section">
      <div className="section-header">
        <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
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
                    checked={columnasVisibles[columna.key]} 
                    onChange={() => {}} // Se manejará en el hook
                    disabled={columna.key === 'interno' || columna.key === 'anio' || columna.key === 'dominio'}
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
            {columnasConfig.map(columna => 
              columnasVisibles[columna.key] && (
                <th key={columna.key} className={`col-${columna.key}`}>
                  {columna.label}
                </th>
              )
            )}
            <th className="col-acciones">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map(vehiculo => (
            <tr key={vehiculo.id}>
              {columnasConfig.map(columna => 
                columnasVisibles[columna.key] && (
                  <td key={columna.key} className={`col-${columna.key}`}>
                    {columna.key === 'estado' || 
                     columna.key === 'vtvEstado' || 
                     columna.key === 'habilitacionEstado' || 
                     columna.key === 'seguroTecnico' || 
                     columna.key === 'seguroCargas' ? (
                      <span className={`status-badge ${getEstadoClass(vehiculo[columna.key])}`}>
                        {vehiculo[columna.key]}
                      </span>
                    ) : columna.key === 'vtvVencimiento' || columna.key === 'habilitacionVencimiento' ? (
                      formatearFecha(vehiculo[columna.key])
                    ) : (
                      vehiculo[columna.key] || ''
                    )}
                  </td>
                )
              )}
              <td className="col-acciones">
                {generarBotonesAcciones('vehiculo', vehiculo.id, vehiculo)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="contador">
        Mostrando {cantidadFiltrados} de {cantidadTotal} vehículos
      </div>
    </section>
  );
};

export default RodadoTable;