import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Reportes = () => {
  const [reportes] = useState([
    {
      id: 1,
      nombre: "Reporte Flota - Marzo 2024",
      tipo: "Vehículos",
      periodo: "Mensual",
      fechaGeneracion: "2024-04-01",
      generadoPor: "Admin",
      tamaño: "2.5 MB"
    },
    {
      id: 2,
      nombre: "Consumo Combustible - Q1 2024",
      tipo: "Combustible",
      periodo: "Trimestral",
      fechaGeneracion: "2024-04-05",
      generadoPor: "Admin",
      tamaño: "1.8 MB"
    },
    {
      id: 3,
      nombre: "Mantenimiento Preventivo - 2024",
      tipo: "Mantenimiento",
      periodo: "Anual",
      fechaGeneracion: "2024-01-15",
      generadoPor: "Admin",
      tamaño: "3.2 MB"
    }
  ]);

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-AR');
  };

  return (
    <div id="reportes-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Reportes</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">📈 Reportes y Estadísticas</h2>
          <div className="table-toolbar">
            <button className="btn btn-primary">
              <span>📊</span> Generar Reporte
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar Todos
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card-small">
            <div className="number">{reportes.filter(r => r.periodo === 'Mensual').length}</div>
            <div className="label">Reportes Mensuales</div>
          </div>
          <div className="summary-card-small">
            <div className="number">{reportes.filter(r => r.periodo === 'Trimestral').length}</div>
            <div className="label">Reportes Trimestrales</div>
          </div>
          <div className="summary-card-small">
            <div className="number">{reportes.filter(r => r.periodo === 'Anual').length}</div>
            <div className="label">Reportes Anuales</div>
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
            {reportes.map(reporte => (
              <tr key={reporte.id}>
                <td>{reporte.nombre}</td>
                <td>{reporte.tipo}</td>
                <td>{reporte.periodo}</td>
                <td>{formatearFecha(reporte.fechaGeneracion)}</td>
                <td>{reporte.generadoPor}</td>
                <td>{reporte.tamaño}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Descargar">📤</button>
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Eliminar">🗑️</button>
                    <button className="icon-btn" title="Programar">⏰</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {reportes.length} reportes</div>
      </section>
    </div>
  );
};

export default Reportes;