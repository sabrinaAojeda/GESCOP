// src/pages/flota/ListadoVehiculos/ListadoVehiculos.jsx
import React, { useState, useEffect } from "react";
import { useListadoVehiculos } from "@hooks/useListadoVehiculos";
import GenericModal from "@components/Common/GenericModal";
import ColumnSelectorListadoVehiculos from "@components/Common/ColumnSelectorListadoVehiculos";
import ModalVehiculo from "@components/Common/ModalVehiculo";
import ModalDocumentacion from "@components/Common/ModalDocumentacion";
import "./ListadoVehiculos.css";

const ListadoVehiculos = () => {
  const { vehiculos, loading, error, agregarVehiculo, actualizarVehiculo, eliminarVehiculo } = useListadoVehiculos();
  
  // Estados para la gestión de la UI
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarColumnSelector, setMostrarColumnSelector] = useState(false);
  const [filtros, setFiltros] = useState({
    buscar: '',
    sector: '',
    estado: '',
    tipo: ''
  });

  // Estado para columnas visibles
  const [columnasVisibles, setColumnasVisibles] = useState({
    'interno': true,
    'año': true,
    'dominio': true,
    'modelo': true,
    'eq_incorporado': false,
    'sector': true,
    'chofer': false,
    'estado': true,
    'observaciones': false,
    'vtv_vencimiento': false,
    'vtv_estado': false,
    'hab_vencimiento': false,
    'hab_estado': false,
    'seguro_vencimiento': false,
    'tipo': true
  });

  // Efecto para aplicar filtros
  useEffect(() => {
    let resultados = vehiculos;
    
    // Filtro de búsqueda
    if (filtros.buscar) {
      const termino = filtros.buscar.toLowerCase();
      resultados = resultados.filter(vehiculo =>
        vehiculo.interno?.toLowerCase().includes(termino) ||
        vehiculo.dominio?.toLowerCase().includes(termino) ||
        vehiculo.modelo?.toLowerCase().includes(termino) ||
        vehiculo.sector?.toLowerCase().includes(termino) ||
        (vehiculo.chofer && vehiculo.chofer.toLowerCase().includes(termino))
      );
    }
    
    // Filtro por sector
    if (filtros.sector) {
      resultados = resultados.filter(vehiculo => vehiculo.sector === filtros.sector);
    }
    
    // Filtro por estado
    if (filtros.estado) {
      resultados = resultados.filter(vehiculo => vehiculo.estado === filtros.estado);
    }

    // Filtro por tipo
    if (filtros.tipo) {
      resultados = resultados.filter(vehiculo => vehiculo.tipo === filtros.tipo);
    }
    
    setVehiculosFiltrados(resultados);
  }, [vehiculos, filtros]);

  // Handlers para los modales
  const abrirModalNuevo = () => {
    setModalAbierto('nuevo');
    setVehiculoSeleccionado(null);
  };

  const abrirModalVer = (vehiculo) => {
    setModalAbierto('ver');
    setVehiculoSeleccionado(vehiculo);
  };

  const abrirModalEditar = (vehiculo) => {
    setModalAbierto('editar');
    setVehiculoSeleccionado(vehiculo);
  };

  const abrirModalDocumentacion = (vehiculo) => {
    setModalAbierto('documentacion');
    setVehiculoSeleccionado(vehiculo);
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    setVehiculoSeleccionado(null);
  };

  // Handlers para ColumnSelector
  const abrirColumnSelector = () => {
    setMostrarColumnSelector(true);
  };

  const cerrarColumnSelector = () => {
    setMostrarColumnSelector(false);
  };

  const toggleColumna = (columnaKey) => {
    setColumnasVisibles(prev => ({
      ...prev,
      [columnaKey]: !prev[columnaKey]
    }));
  };

  // Handlers para CRUD
  const handleCrearVehiculo = (datosVehiculo) => {
    console.log('Creando vehículo:', datosVehiculo);
    agregarVehiculo(datosVehiculo);
    cerrarModal();
    alert('Vehículo creado correctamente');
  };

  const handleActualizarVehiculo = (datosVehiculo) => {
    console.log('Actualizando vehículo:', datosVehiculo);
    actualizarVehiculo(vehiculoSeleccionado.id, datosVehiculo);
    cerrarModal();
    alert('Vehículo actualizado correctamente');
  };

  const handleEliminarVehiculo = (id) => {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo && window.confirm(`¿Está seguro de eliminar el vehículo ${vehiculo.modelo} (${vehiculo.dominio})? Esta acción no se puede deshacer.`)) {
      eliminarVehiculo(id);
    }
  };

  const handleGuardarDocumentacion = (documentos) => {
    if (vehiculoSeleccionado) {
      actualizarVehiculo(vehiculoSeleccionado.id, {
        ...vehiculoSeleccionado,
        documentos: documentos
      });
    }
    cerrarModal();
  };

  // Función para formatear fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-AR');
    } catch (e) {
      return fechaString;
    }
  };

  // Función para obtener clase de estado
  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
      case 'vigente':
        return 'status-active';
      case 'por vencer':
      case 'mantenimiento':
        return 'status-warning';
      case 'vencido':
      case 'inactivo':
      case 'no requiere':
        return 'status-expired';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Cargando vehículos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="listado-vehiculos-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#" onClick={() => window.history.back()}>Dashboard</a>
        <span>Listado de Vehículos</span>
      </div>

      {/* Resumen */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculos.length}</div>
          <div className="label">Total Vehículos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculos.filter(v => v.estado === 'Activo').length}
          </div>
          <div className="label">En Servicio</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculos.filter(v => v.tipo === 'Rodado').length}
          </div>
          <div className="label">Rodados</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculos.filter(v => v.tipo === 'Maquinaria').length}
          </div>
          <div className="label">Maquinarias</div>
        </div>
      </div>

      {/* Sección Principal */}
      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">📋 Listado de Vehículos</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary" onClick={abrirColumnSelector}>
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary" onClick={abrirModalNuevo}>
              <span>+</span> Nuevo Vehículo
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar por interno, dominio, modelo..." 
            value={filtros.buscar}
            onChange={(e) => setFiltros(prev => ({ ...prev, buscar: e.target.value }))}
          />
          <select 
            className="filter-select" 
            value={filtros.sector}
            onChange={(e) => setFiltros(prev => ({ ...prev, sector: e.target.value }))}
          >
            <option value="">Todos los sectores</option>
            <option value="Logística">Logística</option>
            <option value="Producción">Producción</option>
            <option value="Administración">Administración</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
          <select 
            className="filter-select" 
            value={filtros.estado}
            onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
          >
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <select 
            className="filter-select" 
            value={filtros.tipo}
            onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
          >
            <option value="">Todos los tipos</option>
            <option value="Rodado">Rodado</option>
            <option value="Maquinaria">Maquinaria</option>
          </select>
        </div>

        {/* Tabla */}
        <table className="data-table">
          <thead>
            <tr>
              {columnasVisibles.interno && <th>INT.</th>}
              {columnasVisibles.año && <th>AÑO</th>}
              {columnasVisibles.dominio && <th>DOMINIO</th>}
              {columnasVisibles.modelo && <th>MODELO</th>}
              {columnasVisibles.eq_incorporado && <th>EQ. INCORPORADO</th>}
              {columnasVisibles.sector && <th>SECTOR</th>}
              {columnasVisibles.chofer && <th>CHOFER</th>}
              {columnasVisibles.estado && <th>ESTADO</th>}
              {columnasVisibles.observaciones && <th>OBSERVACIONES</th>}
              {columnasVisibles.vtv_vencimiento && <th>VTV VTO.</th>}
              {columnasVisibles.vtv_estado && <th>VTV ESTADO</th>}
              {columnasVisibles.hab_vencimiento && <th>HAB. VTO.</th>}
              {columnasVisibles.hab_estado && <th>HAB. ESTADO</th>}
              {columnasVisibles.seguro_vencimiento && <th>SEG. VTO.</th>}
              {columnasVisibles.tipo && <th>TIPO</th>}
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                {columnasVisibles.interno && <td>{vehiculo.interno}</td>}
                {columnasVisibles.año && <td>{vehiculo.año}</td>}
                {columnasVisibles.dominio && <td>{vehiculo.dominio}</td>}
                {columnasVisibles.modelo && <td>{vehiculo.modelo}</td>}
                {columnasVisibles.eq_incorporado && <td>{vehiculo.eq_incorporado || '-'}</td>}
                {columnasVisibles.sector && <td>{vehiculo.sector}</td>}
                {columnasVisibles.chofer && <td>{vehiculo.chofer || '-'}</td>}
                {columnasVisibles.estado && (
                  <td>
                    <span className={`status-badge ${getEstadoClass(vehiculo.estado)}`}>
                      {vehiculo.estado}
                    </span>
                  </td>
                )}
                {columnasVisibles.observaciones && <td>{vehiculo.observaciones || '-'}</td>}
                {columnasVisibles.vtv_vencimiento && <td>{formatearFecha(vehiculo.vtv_vencimiento)}</td>}
                {columnasVisibles.vtv_estado && (
                  <td>
                    <span className={`status-badge ${getEstadoClass(vehiculo.vtv_estado)}`}>
                      {vehiculo.vtv_estado}
                    </span>
                  </td>
                )}
                {columnasVisibles.hab_vencimiento && <td>{formatearFecha(vehiculo.hab_vencimiento)}</td>}
                {columnasVisibles.hab_estado && (
                  <td>
                    <span className={`status-badge ${getEstadoClass(vehiculo.hab_estado)}`}>
                      {vehiculo.hab_estado}
                    </span>
                  </td>
                )}
                {columnasVisibles.seguro_vencimiento && <td>{formatearFecha(vehiculo.seguro_vencimiento)}</td>}
                {columnasVisibles.tipo && (
                  <td>
                    <span className={`status-badge ${vehiculo.tipo === 'Rodado' ? 'status-active' : 'status-warning'}`}>
                      {vehiculo.tipo}
                    </span>
                  </td>
                )}
                <td>
                  <div className="action-buttons">
                    <button 
                      className="icon-btn" 
                      title="Ver" 
                      onClick={() => abrirModalVer(vehiculo)}
                    >
                      👁️
                    </button>
                    <button 
                      className="icon-btn" 
                      title="Editar" 
                      onClick={() => abrirModalEditar(vehiculo)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="icon-btn" 
                      title="Documentación" 
                      onClick={() => abrirModalDocumentacion(vehiculo)}
                    >
                      📄
                    </button>
                    <button 
                      className="icon-btn" 
                      title="Eliminar" 
                      onClick={() => handleEliminarVehiculo(vehiculo.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="contador">
          Mostrando {vehiculosFiltrados.length} de {vehiculos.length} vehículos
        </div>
      </section>

      {/* Modal Ver Vehículo */}
      {modalAbierto === 'ver' && vehiculoSeleccionado && (
        <GenericModal
          title={`👁️ Detalles del Vehículo - ${vehiculoSeleccionado.dominio}`}
          onClose={cerrarModal}
          size="xlarge"
        >
          <div className="vehicle-details-modal">
            <div className="vehicle-details-grid">
              <div>
                <div className="detail-group">
                  <div className="detail-label">Interno</div>
                  <div className="detail-value">{vehiculoSeleccionado.interno}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Año</div>
                  <div className="detail-value">{vehiculoSeleccionado.año}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Dominio</div>
                  <div className="detail-value">{vehiculoSeleccionado.dominio}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Modelo</div>
                  <div className="detail-value">{vehiculoSeleccionado.modelo}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Tipo</div>
                  <div className="detail-value">
                    <span className={`status-badge ${vehiculoSeleccionado.tipo === 'Rodado' ? 'status-active' : 'status-warning'}`}>
                      {vehiculoSeleccionado.tipo}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="detail-group">
                  <div className="detail-label">Sector</div>
                  <div className="detail-value">{vehiculoSeleccionado.sector}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Chofer</div>
                  <div className="detail-value">{vehiculoSeleccionado.chofer || 'No asignado'}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Estado</div>
                  <div className="detail-value">
                    <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.estado)}`}>
                      {vehiculoSeleccionado.estado}
                    </span>
                  </div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Equipamiento</div>
                  <div className="detail-value">{vehiculoSeleccionado.eq_incorporado || 'No especificado'}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Observaciones</div>
                  <div className="detail-value">{vehiculoSeleccionado.observaciones || 'Sin observaciones'}</div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <div className="form-section-title">📅 Documentación y Vencimientos</div>
              <div className="vehicle-details-grid">
                <div>
                  <div className="detail-group">
                    <div className="detail-label">VTV - Vencimiento</div>
                    <div className="detail-value">{formatearFecha(vehiculoSeleccionado.vtv_vencimiento) || 'No especificado'}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">VTV - Estado</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.vtv_estado)}`}>
                        {vehiculoSeleccionado.vtv_estado || 'No especificado'}
                      </span>
                    </div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Habilitación - Vencimiento</div>
                    <div className="detail-value">{formatearFecha(vehiculoSeleccionado.hab_vencimiento) || 'No especificado'}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Habilitación - Estado</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.hab_estado)}`}>
                        {vehiculoSeleccionado.hab_estado || 'No especificado'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="detail-group">
                    <div className="detail-label">Seguro - Vencimiento</div>
                    <div className="detail-value">{formatearFecha(vehiculoSeleccionado.seguro_vencimiento) || 'No especificado'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="documents-section">
              <h3 className="form-section-title">📄 Documentación Asociada</h3>
              <div className="document-cards">
                {vehiculoSeleccionado.documentos && vehiculoSeleccionado.documentos.length > 0 ? (
                  vehiculoSeleccionado.documentos.map(doc => (
                    <div key={doc.id} className="document-card">
                      <div className="document-card-header">
                        <div className="document-card-title">{doc.tipo}</div>
                        <span className={`document-card-status status-badge ${getEstadoClass(doc.estado)}`}>
                          {doc.estado}
                        </span>
                      </div>
                      <div className="detail-group">
                        <div className="detail-label">Vencimiento</div>
                        <div className="detail-value">{formatearFecha(doc.vencimiento)}</div>
                      </div>
                      <div className="detail-group">
                        <div className="detail-label">Archivo</div>
                        <div className="detail-value">{doc.archivo}</div>
                      </div>
                      <div className="action-buttons" style={{marginTop: '10px'}}>
                        <button className="icon-btn" title="Descargar">📤</button>
                        <button className="icon-btn" title="Ver">👁️</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay documentos asociados a este vehículo.</p>
                )}
              </div>
            </div>

            <div className="modal-vehiculo-actions">
              <button className="btn btn-secondary" onClick={cerrarModal}>
                Cerrar
              </button>
              <button className="btn btn-primary" onClick={() => {
                cerrarModal();
                setTimeout(() => abrirModalEditar(vehiculoSeleccionado), 300);
              }}>
                Editar Vehículo
              </button>
            </div>
          </div>
        </GenericModal>
      )}

      {/* Modales existentes */}
      {modalAbierto === 'nuevo' && (
        <ModalVehiculo
          mode="crear"
          onClose={cerrarModal}
          onSave={handleCrearVehiculo}
        />
      )}

      {modalAbierto === 'editar' && vehiculoSeleccionado && (
        <ModalVehiculo
          mode="editar"
          vehiculo={vehiculoSeleccionado}
          onClose={cerrarModal}
          onSave={handleActualizarVehiculo}
        />
      )}

      {modalAbierto === 'documentacion' && vehiculoSeleccionado && (
        <ModalDocumentacion
          vehiculo={vehiculoSeleccionado}
          onClose={cerrarModal}
          onSave={handleGuardarDocumentacion}
        />
      )}

      {/* Column Selector Modal */}
      {mostrarColumnSelector && (
        <ColumnSelectorListadoVehiculos
          columnasVisibles={columnasVisibles}
          onToggleColumna={toggleColumna}
          onClose={cerrarColumnSelector}
        />
      )}
    </div>
  );
};

export default ListadoVehiculos;