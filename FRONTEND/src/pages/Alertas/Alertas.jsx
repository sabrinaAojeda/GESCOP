import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Alertas = () => {
  const [alertas] = useState([
    {
      id: "ALT-001",
      categoria: "Vencimientos",
      descripcion: "VTV por vencer",
      elemento: "AB-123-CD",
      fechaGeneracion: "2024-04-01",
      vencimiento: "2024-04-15",
      nivel: "Alto",
      estado: "Pendiente"
    },
    {
      id: "ALT-002",
      categoria: "Mantenimiento",
      descripcion: "Service próximo",
      elemento: "EF-456-GH",
      fechaGeneracion: "2024-03-28",
      vencimiento: "2024-04-05",
      nivel: "Crítico",
      estado: "Pendiente"
    },
    {
      id: "ALT-003",
      categoria: "Documentación",
      descripcion: "Seguro por vencer",
      elemento: "IJ-789-KL",
      fechaGeneracion: "2024-04-02",
      vencimiento: "2024-04-30",
      nivel: "Medio",
      estado: "En Proceso"
    }
  ]);

  const getNivelClass = (nivel) => {
    switch(nivel) {
      case 'Crítico': return 'status-expired';
      case 'Alto': return 'status-warning';
      case 'Medio':
      case 'Bajo': return 'status-active';
      default: return '';
    }
  };

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Pendiente': return 'status-warning';
      case 'En Proceso': return 'status-active';
      case 'Resuelto': return 'status-expired';
      default: return '';
    }
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-AR');
  };

  const alertasCriticas = alertas.filter(a => a.nivel === 'Crítico').length;
  const alertasResueltas = alertas.filter(a => a.estado === 'Resuelto').length;

  return (
    <div id="alertas-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Alertas</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🔔 Sistema de Alertas</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>⚙️</span> Configurar Alertas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card-small">
            <div className="number">{alertas.length}</div>
            <div className="label">Alertas Activas</div>
          </div>
          <div className="summary-card-small">
            <div className="number">{alertasCriticas}</div>
            <div className="label">Críticas</div>
          </div>
          <div className="summary-card-small">
            <div className="number">{alertasResueltas}</div>
            <div className="label">Resueltas Hoy</div>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todas las categorías</option>
            <option>Vencimientos</option>
            <option>Mantenimiento</option>
            <option>Documentación</option>
            <option>Seguros</option>
            <option>Personal</option>
          </select>
          <select className="filter-select">
            <option>Todos los niveles</option>
            <option>Crítico</option>
            <option>Alto</option>
            <option>Medio</option>
            <option>Bajo</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>En Proceso</option>
            <option>Resuelto</option>
          </select>
          <button className="btn btn-primary">Aplicar Filtros</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Elemento</th>
              <th>Fecha Generación</th>
              <th>Vencimiento</th>
              <th>Nivel</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map(alerta => (
              <tr key={alerta.id}>
                <td>{alerta.id}</td>
                <td>{alerta.categoria}</td>
                <td>{alerta.descripcion}</td>
                <td>{alerta.elemento}</td>
                <td>{formatearFecha(alerta.fechaGeneracion)}</td>
                <td>{formatearFecha(alerta.vencimiento)}</td>
                <td>
                  <span className={`status-badge ${getNivelClass(alerta.nivel)}`}>
                    {alerta.nivel}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getEstadoClass(alerta.estado)}`}>
                    {alerta.estado}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Resolver">✅</button>
                    <button className="icon-btn" title="Posponer">⏰</button>
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Notificar">📧</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {alertas.length} alertas</div>
      </section>
    </div>
  );
};

export default Alertas;