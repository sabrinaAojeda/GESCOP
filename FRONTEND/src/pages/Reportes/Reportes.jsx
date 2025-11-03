import React from 'react';
import './Reportes.css';

const Reportes = () => {
  const reportes = [
    {
      nombre: 'Reporte Flota - Marzo 2024',
      tipo: 'Vehículos',
      periodo: 'Mensual',
      fechaGeneracion: '01/04/2024',
      generadoPor: 'Admin',
      tamaño: '2.5 MB'
    },
    {
      nombre: 'Consumo Combustible - Q1 2024',
      tipo: 'Combustible',
      periodo: 'Trimestral',
      fechaGeneracion: '05/04/2024',
      generadoPor: 'Admin',
      tamaño: '1.8 MB'
    }
  ];

  return (
    <div className="reportes-page">
      <div className="page-header">
        <h1>📈 Reportes y Estadísticas</h1>
      </div>

      <div className="reportes-summary">
        <div className="summary-card">
          <div className="summary-number">15</div>
          <div className="summary-label">Reportes Mensuales</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">8</div>
          <div className="summary-label">Reportes Trimestrales</div>
        </div>
        <div className="summary-card">
          <div className="summary-number">3</div>
          <div className="summary-label">Reportes Anuales</div>
        </div>
      </div>

      <div className="reportes-content">
        <div className="section-header">
          <h2 className="section-title">Reportes Generados</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>📊</span> Generar Reporte
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar Todos
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <select className="filter-select">
            <option>Todos los tipos</option>
            <option>Vehículos</option>
            <option>Personal</option>
            <option>Mantenimiento</option>
            <option>Combustible</option>
            <option>Seguros</option>
          </select>
          <select className="filter-select">
            <option>Todos los períodos</option>
            <option>Mensual</option>
            <option>Trimestral</option>
            <option>Anual</option>
            <option>Personalizado</option>
          </select>
          <input type="date" className="filter-select" placeholder="Desde" />
          <input type="date" className="filter-select" placeholder="Hasta" />
          <button className="btn btn-primary">Aplicar Filtros</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre del Reporte</th>
              <th>Tipo</th>
              <th>Período</th>
              <th>Fecha Generación</th>
              <th>Generado por</th>
              <th>Tamaño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte, index) => (
              <tr key={index}>
                <td>{reporte.nombre}</td>
                <td>{reporte.tipo}</td>
                <td>{reporte.periodo}</td>
                <td>{reporte.fechaGeneracion}</td>
                <td>{reporte.generadoPor}</td>
                <td>{reporte.tamaño}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Descargar">📤</button>
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Eliminar">🗑️</button>
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

export default Reportes;