import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EquipamientoVehiculos = () => {
  // Datos de ejemplo
  const [equipamiento] = useState([
    {
      id: 1,
      codigo: 'EQ001',
      descripcion: 'GPS Garmin',
      tipo: 'GPS',
      vehiculoAsignado: 'ABC123',
      estado: 'Operativo',
      ultimaRevision: '2024-01-10',
      proximaRevision: '2024-07-10'
    },
    {
      id: 2,
      codigo: 'EQ002',
      descripcion: 'Radio Kenwood',
      tipo: 'Radio',
      vehiculoAsignado: 'DEF456',
      estado: 'Mantenimiento',
      ultimaRevision: '2023-12-15',
      proximaRevision: '2024-06-15'
    }
  ]);

  const [filtros, setFiltros] = useState({
    busqueda: '',
    tipo: '',
    estado: ''
  });

  const manejarBusqueda = (valor) => {
    setFiltros(prev => ({ ...prev, busqueda: valor }));
  };

  const manejarFiltroEspecifico = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const datosFiltrados = equipamiento.filter(item => {
    const coincideBusqueda = !filtros.busqueda || 
      item.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      item.tipo.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const coincideTipo = !filtros.tipo || item.tipo === filtros.tipo;
    const coincideEstado = !filtros.estado || item.estado === filtros.estado;
    
    return coincideBusqueda && coincideTipo && coincideEstado;
  });

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
        <span> / Equipamiento</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{equipamiento.filter(item => item.estado === 'Operativo').length}</div>
          <div className="label">ítems operativos</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🔧 Equipamiento</h2>
          <div className="table-toolbar">
            <ColumnSelector />
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
                    <button className="icon-btn" title="Ver">
                      👁️
                    </button>
                    <button className="icon-btn" title="Editar">
                      ✏️
                    </button>
                    <button className="icon-btn" title="Historial">
                      📊
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {datosFiltrados.length} de {equipamiento.length} ítems de equipamiento
        </div>
      </section>
    </div>
  );
};

export default EquipamientoVehiculos;