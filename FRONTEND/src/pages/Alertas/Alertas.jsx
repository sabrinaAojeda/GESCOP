import React from 'react';
import './Alertas.css';

const Alertas = () => {
  const alertas = [
    {
      id: 'ALT-001',
      categoria: 'Vencimientos',
      descripcion: 'VTV por vencer',
      elemento: 'AB-123-CD',
      fechaGeneracion: '01/04/2024',
      vencimiento: '15/04/2024',
      nivel: 'Alto',
      estado: 'Pendiente'
    },
    {
      id: 'ALT-002',
      categoria: 'Mantenimiento',
      descripcion: 'Service próximo',
      elemento: 'EF-456-GH',
      fechaGeneracion: '28/03/2024',
      vencimiento: '05/04/2024',
      nivel: 'Crítico',
      estado: 'Pendiente'
    }
  ];

  return (
    <div className="alertas-page">
      <div className="page-header">
        <h1>🔔 Sistema de Alertas</h1>
      </div>

      <div className="alertas-summary">
        <div className="summary-card">
          <div className="summary-number">8</div>
          <div className="summary-label">Alertas Activas</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">3</div>
          <div className="summary-label">Críticas</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">12</div>
          <div className="summary-label">Resueltas Hoy</div>
        </div>
      </div>

      <div className="alertas-content">
        <div className="section-header">
          <h2 className="section-title">Alertas Activas</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>⚙️</span> Configurar Alertas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todas las categorías</option>
            <option>Vencimientos</option>
            <option>Mantenimiento</option>
            <option>Documentación</option>
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
                <td>{alerta.fechaGeneracion}</td>
                <td>{alerta.vencimiento}</td>
                <td>
                  <span className={`status-badge status-${alerta.nivel.toLowerCase()}`}>
                    {alerta.nivel}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${alerta.estado.toLowerCase().replace(' ', '-')}`}>
                    {alerta.estado}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Resolver">✅</button>
                    <button className="icon-btn" title="Posponer">⏰</button>
                    <button className="icon-btn" title="Ver">👁️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alertas;