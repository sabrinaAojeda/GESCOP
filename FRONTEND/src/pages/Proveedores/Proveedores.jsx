import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Proveedores = () => {
  const [proveedores] = useState([
    {
      id: 1,
      codigo: "PROV-001",
      razonSocial: "YPF S.A.",
      cuit: "30-12345678-9",
      rubro: "Combustible",
      contacto: "Carlos Rodríguez",
      telefono: "011-4789-1234",
      email: "crodriguez@ypf.com",
      estado: "Activo"
    },
    {
      id: 2,
      codigo: "PROV-002",
      razonSocial: "Neumáticos SRL",
      cuit: "30-98765432-1",
      rubro: "Neumáticos",
      contacto: "Ana López",
      telefono: "011-4123-4567",
      email: "alopez@neumaticos.com",
      estado: "Activo"
    },
    {
      id: 3,
      codigo: "PROV-003",
      razonSocial: "Taller Mecánico Integral",
      cuit: "30-45678912-3",
      rubro: "Mantenimiento",
      contacto: "Roberto Sánchez",
      telefono: "011-4455-6677",
      email: "rsanchez@tallermecanico.com",
      estado: "Suspendido"
    }
  ]);

  const getEstadoClass = (estado) => {
    switch(estado) {
      case 'Activo': return 'status-active';
      case 'Suspendido': return 'status-warning';
      case 'Inactivo': return 'status-expired';
      default: return '';
    }
  };

  const getContratosPorRenovar = () => {
    return proveedores.filter(p => p.estado === 'Activo').length - 1;
  };

  return (
    <div id="proveedores-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span>Proveedores</span>
      </div>

      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{proveedores.length}</div>
          <div className="label">Proveedores Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{proveedores.filter(p => p.estado === 'Activo').length}</div>
          <div className="label">Contratos Vigentes</div>
        </div>
        <div className="summary-card-small">
          <div className="number">{getContratosPorRenovar()}</div>
          <div className="label">Contratos por Renovar</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🤝 Gestión de Proveedores</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary">
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Proveedor
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar proveedor..." />
          <select className="filter-select">
            <option>Todos los rubros</option>
            <option>Combustible</option>
            <option>Repuestos</option>
            <option>Mantenimiento</option>
            <option>Seguros</option>
            <option>Neumáticos</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Suspendido</option>
            <option>Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Razón Social</th>
              <th>CUIT</th>
              <th>Rubro</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map(proveedor => (
              <tr key={proveedor.id}>
                <td>{proveedor.codigo}</td>
                <td>{proveedor.razonSocial}</td>
                <td>{proveedor.cuit}</td>
                <td>{proveedor.rubro}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(proveedor.estado)}`}>
                    {proveedor.estado}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn" title="Ver">👁️</button>
                    <button className="icon-btn" title="Editar">✏️</button>
                    <button className="icon-btn" title="Documentación">📄</button>
                    <button className="icon-btn" title="Contratos">📝</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {proveedores.length} proveedores</div>
      </section>
    </div>
  );
};

export default Proveedores;