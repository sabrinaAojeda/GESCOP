import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Personal = () => {
  const [personal] = useState([
    {
      id: 1,
      legajo: "1001",
      nombreCompleto: "Juan Pérez",
      dni: "30.123.456",
      sector: "Logística",
      cargo: "Chofer",
      estado: "Activo",
      licenciaVencimiento: "2024-08-15"
    },
    {
      id: 2,
      legajo: "1002",
      nombreCompleto: "María García",
      dni: "29.987.654",
      sector: "Producción",
      cargo: "Operaria",
      estado: "Licencia",
      licenciaVencimiento: "2024-05-20"
    },
    {
      id: 3,
      legajo: "1003",
      nombreCompleto: "Carlos Rodríguez",
      dni: "31.456.789",
      sector: "Mantenimiento",
      cargo: "Mecánico",
      estado: "Activo",
      licenciaVencimiento: "2024-11-10"
    }
  ]);

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Activo': return 'status-active';
      case 'Licencia':
      case 'Vacaciones': return 'status-warning';
      case 'Inactivo': return 'status-expired';
      default: return '';
    }
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-AR');
  };

  const getAlertCount = () => {
    const hoy = new Date();
    const treintaDias = new Date();
    treintaDias.setDate(hoy.getDate() + 30);
    
    return personal.filter(p => {
      const vencimiento = new Date(p.licenciaVencimiento);
      return vencimiento <= treintaDias && vencimiento >= hoy;
    }).length;
  };

  return (
    <div id="personal-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Personal</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{personal.length}</div>
          <div className="label">Empleados Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{personal.filter(p => p.estado === 'Activo').length}</div>
          <div className="label">Con Licencia Vigente</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{getAlertCount()}</div>
          <div className="label">Licencias por Vencer</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">👥 Gestión de Personal</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Empleado
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar empleado..." />
          <select className="filter-select">
            <option>Todos los sectores</option>
            <option>Logística</option>
            <option>Producción</option>
            <option>Administración</option>
            <option>Mantenimiento</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Vacaciones</option>
            <option>Licencia</option>
            <option>Inactivo</option>
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
            {personal.map(empleado => (
              <tr key={empleado.id}>
                <td>{empleado.legajo}</td>
                <td>{empleado.nombreCompleto}</td>
                <td>{empleado.dni}</td>
                <td>{empleado.sector}</td>
                <td>{empleado.cargo}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(empleado.estado)}`}>
                    {empleado.estado}
                  </span>
                </td>
                <td>{formatearFecha(empleado.licenciaVencimiento)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                    <button className="icon-btn" title="Licencias">🚗</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {personal.length} empleados</div>
      </section>
    </div>
  );
};

export default Personal;