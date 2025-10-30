import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EquipamientoVehiculos = () => {
  const [equipamientos] = useState([
    {
      id: 1,
      codigo: "GPS-001",
      descripcion: "Sistema de Rastreo GPS",
      tipo: "GPS",
      vehiculoAsignado: "AB-123-CD",
      estado: "Operativo",
      ultimaRevision: "2024-02-15",
      proximaRevision: "2024-05-15"
    },
    {
      id: 2,
      codigo: "CAM-002",
      descripcion: "Cámara de Reversa",
      tipo: "Cámara",
      vehiculoAsignado: "EF-456-GH",
      estado: "Mantenimiento",
      ultimaRevision: "2024-01-10",
      proximaRevision: "2024-02-10"
    },
    {
      id: 3,
      codigo: "RAD-003",
      descripcion: "Radio Comunicación VHF",
      tipo: "Radio",
      vehiculoAsignado: "IJ-789-KL",
      estado: "Operativo",
      ultimaRevision: "2024-03-01",
      proximaRevision: "2024-06-01"
    }
  ]);

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Operativo': return 'status-active';
      case 'Mantenimiento': return 'status-warning';
      case 'Inactivo': return 'status-expired';
      default: return '';
    }
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-AR');
  };

  return (
    <div id="equipamiento-vehiculos-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Equipamiento</span>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{equipamientos.length}</div>
          <div className="label">Ítems Operativo</div>
        </div>
        <div className="summary-card-small">
          <div className="number">2</div>
          <div className="label">En Mantenimiento</div>
        </div>
        <div className="summary-card-small">
          <div className="number">5</div>
          <div className="label">Próximos a Revisar</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🔧 Equipamiento</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Equipamiento
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar..." />
          <select className="filter-select">
            <option>Todos los tipos</option>
            <option>GPS</option>
            <option>Radio</option>
            <option>Cámara</option>
            <option>Herramientas</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Operativo</option>
            <option>Mantenimiento</option>
            <option>Inactivo</option>
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
            {equipamientos.map(equipo => (
              <tr key={equipo.id}>
                <td>{equipo.codigo}</td>
                <td>{equipo.descripcion}</td>
                <td>{equipo.tipo}</td>
                <td>{equipo.vehiculoAsignado}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(equipo.estado)}`}>
                    {equipo.estado}
                  </span>
                </td>
                <td>{formatearFecha(equipo.ultimaRevision)}</td>
                <td>{formatearFecha(equipo.proximaRevision)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                    <button className="icon-btn" title="Historial">📊</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {equipamientos.length} ítems de equipamiento</div>
      </section>
    </div>
  );
};

export default EquipamientoVehiculos;