import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sedes = () => {
  const [sedes] = useState([
    {
      id: 1,
      codigo: "SED-001",
      nombre: "Sede Central",
      direccion: "Av. Principal 1234",
      localidad: "Capital",
      provincia: "Buenos Aires",
      telefono: "011-4567-8901",
      vehiculos: 8,
      estado: "Activa"
    },
    {
      id: 2,
      codigo: "SED-002",
      nombre: "Planta Industrial",
      direccion: "Ruta 8 Km 45",
      localidad: "Pilar",
      provincia: "Buenos Aires",
      telefono: "0230-456-789",
      vehiculos: 15,
      estado: "Activa"
    },
    {
      id: 3,
      codigo: "SED-003",
      nombre: "Depósito Norte",
      direccion: "Calle Industrial 567",
      localidad: "Rosario",
      provincia: "Santa Fe",
      telefono: "0341-123-456",
      vehiculos: 5,
      estado: "En Trámite"
    }
  ]);

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Activa': return 'status-active';
      case 'En Trámite': return 'status-warning';
      case 'Inactiva': return 'status-expired';
      default: return '';
    }
  };

  return (
    <div id="sedes-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Sedes/Empresas</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{sedes.length}</div>
          <div className="label">Sedes Activas</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{sedes.reduce((total, sede) => total + sede.vehiculos, 0)}</div>
          <div className="label">Vehículos Asignados</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{sedes.filter(s => s.estado === 'En Trámite').length}</div>
          <div className="label">Permisos por Vencer</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🏢 Gestión de Sedes y Empresas</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nueva Sede
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar sede..." />
          <select className="filter-select">
            <option>Todas las provincias</option>
            <option>Buenos Aires</option>
            <option>Córdoba</option>
            <option>Santa Fe</option>
            <option>Mendoza</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activa</option>
            <option>Inactiva</option>
            <option>En Trámite</option>
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
            {sedes.map(sede => (
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
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                    <button className="icon-btn" title="Vehículos">🚗</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {sedes.length} sedes</div>
      </section>
    </div>
  );
};

export default Sedes;