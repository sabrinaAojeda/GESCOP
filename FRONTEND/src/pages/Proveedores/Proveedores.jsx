import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTableActions } from '../../hooks/useTableActions';
import { useFiltros } from '../../hooks/useFiltros';

const Proveedores = () => {
  const { proveedores } = useApp();
  const { generarBotonesAcciones } = useTableActions();

  const columnasConfig = [
    { key: 'codigo', label: 'Código', visible: true },
    { key: 'razonSocial', label: 'Razón Social', visible: true },
    { key: 'cuit', label: 'CUIT', visible: true },
    { key: 'rubro', label: 'Rubro', visible: true },
    { key: 'contacto', label: 'Contacto', visible: true },
    { key: 'telefono', label: 'Teléfono', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'direccion', label: 'Dirección', visible: false },
    { key: 'localidad', label: 'Localidad', visible: false },
    { key: 'provincia', label: 'Provincia', visible: false }
  ];

  const {
    datosFiltrados,
    filtros,
    manejarBusqueda,
    manejarFiltroEspecifico,
    cantidadFiltrados,
    cantidadTotal
  } = useFiltros(proveedores, columnasConfig);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
        return 'status-active';
      case 'suspendido':
        return 'status-warning';
      case 'inactivo':
        return 'status-expired';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="breadcrumb">
        <a href="/dashboard">Dashboard</a>
        <span>Proveedores</span>
      </div>

      {/* Resumen cards */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{proveedores.length}</div>
          <div className="label">Proveedores Activos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">8</div>
          <div className="label">Contratos Vigentes</div>
        </div>
        <div className="summary-card-small">
          <div className="number">2</div>
          <div className="label">Contratos por Renovar</div>
        </div>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🤝 Gestión de Proveedores</h2>
          <div className="table-toolbar">
            <div className="column-selector">
              <button className="btn btn-secondary">
                <span>👁️</span> Columnas
              </button>
              <div className="column-selector-content">
                {columnasConfig.map(columna => (
                  <label key={columna.key} className="column-option">
                    <input 
                      type="checkbox" 
                      checked={columna.visible} 
                      onChange={() => {}} 
                      disabled={columna.key === 'codigo' || columna.key === 'razonSocial'}
                    />
                    {columna.label}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Proveedor
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar proveedor..." 
            value={filtros.busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
          />
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('rubro', e.target.value)}
          >
            <option value="">Todos los rubros</option>
            <option value="Combustible">Combustible</option>
            <option value="Repuestos">Repuestos</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Seguros">Seguros</option>
            <option value="Neumáticos">Neumáticos</option>
          </select>
          <select 
            className="filter-select"
            onChange={(e) => manejarFiltroEspecifico('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Suspendido">Suspendido</option>
            <option value="Inactivo">Inactivo</option>
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
            {datosFiltrados.map(proveedor => (
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
                  {generarBotonesAcciones('proveedor', proveedor.id, proveedor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">
          Mostrando {cantidadFiltrados} de {cantidadTotal} proveedores
        </div>
      </section>
    </div>
  );
};

export default Proveedores;