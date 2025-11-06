import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RodadoMaquinarias.css';

const RodadoMaquinarias = () => {
  const [showNuevoVehiculo, setShowNuevoVehiculo] = useState(false);
  const [showVerVehiculo, setShowVerVehiculo] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  // Datos de ejemplo
  const vehiculos = [
    { id: 1, interno: '001', dominio: 'ABC123', modelo: 'Volvo FH16', tipo: 'Camión', estado: 'Activo' },
    { id: 2, interno: '002', dominio: 'DEF456', modelo: 'Caterpillar 320', tipo: 'Maquinaria', estado: 'Mantenimiento' },
    { id: 3, interno: '003', dominio: 'GHI789', modelo: 'Mercedes-Benz Actros', tipo: 'Camión', estado: 'Activo' }
  ];

  const handleVerVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
    setShowVerVehiculo(true);
  };

  const ColumnSelector = () => (
    <div className="column-selector">
      <button className="btn btn-secondary">
        <span>👁️</span> Columnas
      </button>
    </div>
  );

  const RodadoTable = ({ onVerVehiculo }) => (
    <table className="data-table">
      <thead>
        <tr>
          <th>Interno</th>
          <th>Dominio</th>
          <th>Modelo</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {vehiculos.map(vehiculo => (
          <tr key={vehiculo.id}>
            <td>{vehiculo.interno}</td>
            <td>{vehiculo.dominio}</td>
            <td>{vehiculo.modelo}</td>
            <td>{vehiculo.tipo}</td>
            <td>
              <span className={`status-badge ${vehiculo.estado === 'Activo' ? 'status-active' : 'status-warning'}`}>
                {vehiculo.estado}
              </span>
            </td>
            <td>
              <div className="action-buttons">
                <button 
                  className="icon-btn" 
                  title="Ver"
                  onClick={() => onVerVehiculo(vehiculo)}
                >
                  👁️
                </button>
                <button className="icon-btn" title="Editar">
                  ✏️
                </button>
                <button className="icon-btn" title="Eliminar">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const ModalVehiculo = ({ mode, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{mode === 'crear' ? 'Nuevo Vehículo' : 'Editar Vehículo'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>Formulario para {mode === 'crear' ? 'crear' : 'editar'} vehículo</p>
          {/* Aquí iría el formulario completo */}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  );

  const ModalVerVehiculo = ({ vehiculo, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Detalles del Vehículo</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="vehiculo-info">
            <p><strong>Interno:</strong> {vehiculo.interno}</p>
            <p><strong>Dominio:</strong> {vehiculo.dominio}</p>
            <p><strong>Modelo:</strong> {vehiculo.modelo}</p>
            <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
            <p><strong>Estado:</strong> {vehiculo.estado}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rodado-maquinarias-page">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <span> / Rodado y Maquinarias</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
          <div className="table-toolbar">
            <ColumnSelector />
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowNuevoVehiculo(true)}
            >
              <span>+</span> Nuevo Vehículo
            </button>
          </div>
        </div>

        {/* FILTROS AGREGADOS AQUÍ */}
        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar..." 
          />
          <select className="filter-select">
            <option>Todos los sectores</option>
            <option>Logística</option>
            <option>Producción</option>
            <option>Administración</option>
          </select>
          <select className="filter-select">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Mantenimiento</option>
            <option>Inactivo</option>
          </select>
        </div>

        <RodadoTable onVerVehiculo={handleVerVehiculo} />

        {/* Modales */}
        {showNuevoVehiculo && (
          <ModalVehiculo 
            mode="crear"
            onClose={() => setShowNuevoVehiculo(false)}
          />
        )}

        {showVerVehiculo && vehiculoSeleccionado && (
          <ModalVerVehiculo 
            vehiculo={vehiculoSeleccionado}
            onClose={() => setShowVerVehiculo(false)}
          />
        )}
      </section>
    </div>
  );
};

export default RodadoMaquinarias;