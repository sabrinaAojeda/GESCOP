import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './RodadoTable.css'

const RodadoTable = ({ onVerVehiculo }) => {
  const { vehiculos, columnasVisibles } = useApp()
  const [filtros, setFiltros] = useState({
    buscar: '',
    sector: '',
    estado: ''
  })
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([])

  useEffect(() => {
    filtrarVehiculos()
  }, [filtros, vehiculos])

  const filtrarVehiculos = () => {
    let filtrados = vehiculos

    if (filtros.buscar) {
      const busqueda = filtros.buscar.toLowerCase()
      filtrados = filtrados.filter(v => 
        v.interno.toLowerCase().includes(busqueda) ||
        v.dominio.toLowerCase().includes(busqueda) ||
        v.modelo.toLowerCase().includes(busqueda) ||
        (v.chofer && v.chofer.toLowerCase().includes(busqueda))
      )
    }

    if (filtros.sector) {
      filtrados = filtrados.filter(v => v.sector === filtros.sector)
    }

    if (filtros.estado) {
      filtrados = filtrados.filter(v => v.estado === filtros.estado)
    }

    setVehiculosFiltrados(filtrados)
  }

  const getEstadoClass = (estado) => {
    if (!estado) return ''
    switch(estado.toLowerCase()) {
      case 'activo':
      case 'vigente':
        return 'status-active'
      case 'por vencer':
      case 'mantenimiento':
        return 'status-warning'
      case 'vencido':
      case 'inactivo':
        return 'status-expired'
      default:
        return ''
    }
  }

  const formatearFecha = (fechaString) => {
    if (!fechaString) return ''
    try {
      const fecha = new Date(fechaString)
      return fecha.toLocaleDateString('es-AR')
    } catch (e) {
      return fechaString
    }
  }

  return (
    <div className="rodado-table-container">
      <div className="filter-bar">
        <input 
          type="text" 
          className="filter-select" 
          placeholder="Buscar..." 
          value={filtros.buscar}
          onChange={(e) => setFiltros(prev => ({ ...prev, buscar: e.target.value }))}
        />
        <select 
          className="filter-select"
          value={filtros.sector}
          onChange={(e) => setFiltros(prev => ({ ...prev, sector: e.target.value }))}
        >
          <option value="">Todos los sectores</option>
          <option value="Logística">Logística</option>
          <option value="Producción">Producción</option>
          <option value="Administración">Administración</option>
        </select>
        <select 
          className="filter-select"
          value={filtros.estado}
          onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
        >
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columnasVisibles.interno && <th className="col-interno">INT.</th>}
              {columnasVisibles.anio && <th className="col-anio">AÑO</th>}
              {columnasVisibles.dominio && <th className="col-dominio">DOMINIO</th>}
              {columnasVisibles.modelo && <th className="col-modelo">MODELO</th>}
              {columnasVisibles['eq-incorporado'] && <th className="col-eq-incorporado">EQ. INCORPORADO</th>}
              {columnasVisibles.sector && <th className="col-sector">SECTOR</th>}
              {columnasVisibles.chofer && <th className="col-chofer">CHOFER</th>}
              {columnasVisibles.estado && <th className="col-estado">ESTADO</th>}
              {columnasVisibles.observaciones && <th className="col-observaciones">OBSERVACIONES</th>}
              {columnasVisibles['vtv-vencimiento'] && <th className="col-vtv-vencimiento">VTV VTO.</th>}
              {columnasVisibles['vtv-ev'] && <th className="col-vtv-ev">VTV EV</th>}
              {columnasVisibles['habilitacion-vencimiento'] && <th className="col-habilitacion-vencimiento">HAB. VTO.</th>}
              {columnasVisibles['habilitacion-eh'] && <th className="col-habilitacion-eh">HAB. EH</th>}
              {columnasVisibles['tipo-seguro'] && <th className="col-tipo-seguro">TIPO SEGURO</th>}
              {columnasVisibles['seguro-tecnico'] && <th className="col-seguro-tecnico">SEG. TÉCNICO</th>}
              {columnasVisibles['seguro-cargas'] && <th className="col-seguro-cargas">SEG. CARGAS PEL.</th>}
              <th className="col-acciones">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                {columnasVisibles.interno && <td className="col-interno">{vehiculo.interno}</td>}
                {columnasVisibles.anio && <td className="col-anio">{vehiculo.anio}</td>}
                {columnasVisibles.dominio && <td className="col-dominio">{vehiculo.dominio}</td>}
                {columnasVisibles.modelo && <td className="col-modelo">{vehiculo.modelo}</td>}
                {columnasVisibles['eq-incorporado'] && <td className="col-eq-incorporado">{vehiculo.eqIncorporado || ''}</td>}
                {columnasVisibles.sector && <td className="col-sector">{vehiculo.sector}</td>}
                {columnasVisibles.chofer && <td className="col-chofer">{vehiculo.chofer || ''}</td>}
                {columnasVisibles.estado && (
                  <td className="col-estado">
                    <span className={`status-badge ${getEstadoClass(vehiculo.estado)}`}>
                      {vehiculo.estado}
                    </span>
                  </td>
                )}
                {columnasVisibles.observaciones && <td className="col-observaciones">{vehiculo.observaciones || ''}</td>}
                {columnasVisibles['vtv-vencimiento'] && <td className="col-vtv-vencimiento">{formatearFecha(vehiculo.vtvVencimiento)}</td>}
                {columnasVisibles['vtv-ev'] && (
                  <td className="col-vtv-ev">
                    <span className={`status-badge ${getEstadoClass(vehiculo.vtvEstado)}`}>
                      {vehiculo.vtvEstado || ''}
                    </span>
                  </td>
                )}
                {columnasVisibles['habilitacion-vencimiento'] && <td className="col-habilitacion-vencimiento">{formatearFecha(vehiculo.habilitacionVencimiento)}</td>}
                {columnasVisibles['habilitacion-eh'] && (
                  <td className="col-habilitacion-eh">
                    <span className={`status-badge ${getEstadoClass(vehiculo.habilitacionEstado)}`}>
                      {vehiculo.habilitacionEstado || ''}
                    </span>
                  </td>
                )}
                {columnasVisibles['tipo-seguro'] && <td className="col-tipo-seguro">{vehiculo.tipoSeguro || ''}</td>}
                {columnasVisibles['seguro-tecnico'] && (
                  <td className="col-seguro-tecnico">
                    <span className={`status-badge ${getEstadoClass(vehiculo.seguroTecnico)}`}>
                      {vehiculo.seguroTecnico || ''}
                    </span>
                  </td>
                )}
                {columnasVisibles['seguro-cargas'] && (
                  <td className="col-seguro-cargas">
                    <span className={`status-badge ${getEstadoClass(vehiculo.seguroCargas)}`}>
                      {vehiculo.seguroCargas || ''}
                    </span>
                  </td>
                )}
                <td className="col-acciones">
                  <div className="action-buttons">
                    <button 
                      className="icon-btn" 
                      title="Ver"
                      onClick={() => onVerVehiculo(vehiculo)}
                    >
                      👁️
                    </button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="contador">
        Mostrando {vehiculosFiltrados.length} de {vehiculos.length} vehículos
      </div>
    </div>
  )
}

export default RodadoTable