// src/pages/flota/RodadoMaquinarias/RodadoMaquinarias.jsx
import React, { useState, useEffect } from "react";
import { useVehiculos } from "@hooks/useVehiculos";
import GenericModal from "@components/Common/GenericModal";
import ColumnSelector from "@components/Common/ColumnSelector";
import ModalVehiculo from "@components/Common/ModalVehiculo";
import ModalDocumentacion from "@components/Common/ModalDocumentacion";
import "./RodadoMaquinarias.css";

const RodadoMaquinarias = () => {
  const { vehiculos, loading, error, agregarVehiculo, actualizarVehiculo, eliminarVehiculo } = useVehiculos();
  
  // Estados para la gestión de la UI
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarColumnSelector, setMostrarColumnSelector] = useState(false);
  const [filtros, setFiltros] = useState({
    buscar: '',
    sector: '',
    estado: ''
  });

  // Estado para columnas visibles (igual que en el prototipo)
  const [columnasVisibles, setColumnasVisibles] = useState({
    'interno': true,
    'anio': true,
    'dominio': true,
    'modelo': true,
    'eq-incorporado': false,
    'sector': true,
    'chofer': false,
    'estado': true,
    'observaciones': false,
    'vtv-vencimiento': false,
    'vtv-ev': false,
    'habilitacion-vencimiento': false,
    'habilitacion-eh': false,
    'tipo-seguro': false,
    'seguro-tecnico': false,
    'seguro-cargas': false
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
        vehiculo.sector?.toLowerCase().includes(termino)
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
        return 'status-expired';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Cargando vehículos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="rodado-maquinarias-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#" onClick={() => window.history.back()}>Dashboard</a>
        <span>Rodado y Maquinarias</span>
      </div>

      {/* Resumen */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculos.length}</div>
          <div className="label">Vehículos Operativos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculos.filter(v => v.estado === 'Activo').length}
          </div>
          <div className="label">En Servicio</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculos.filter(v => v.vtvEstado === 'Por vencer' || v.vtvEstado === 'Vencido').length}
          </div>
          <div className="label">Vencimientos</div>
        </div>
      </div>

      {/* Sección Principal */}
      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
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
            placeholder="Buscar..." 
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
        </div>

        {/* Tabla */}
        <table className="data-table">
          <thead>
            <tr>
              <th className={columnasVisibles.interno ? '' : 'hidden'}>INT.</th>
              <th className={columnasVisibles.anio ? '' : 'hidden'}>AÑO</th>
              <th className={columnasVisibles.dominio ? '' : 'hidden'}>DOMINIO</th>
              <th className={columnasVisibles.modelo ? '' : 'hidden'}>MODELO</th>
              <th className={columnasVisibles['eq-incorporado'] ? '' : 'hidden'}>EQ. INCORPORADO</th>
              <th className={columnasVisibles.sector ? '' : 'hidden'}>SECTOR</th>
              <th className={columnasVisibles.chofer ? '' : 'hidden'}>CHOFER</th>
              <th className={columnasVisibles.estado ? '' : 'hidden'}>ESTADO</th>
              <th className={columnasVisibles.observaciones ? '' : 'hidden'}>OBSERVACIONES</th>
              <th className={columnasVisibles['vtv-vencimiento'] ? '' : 'hidden'}>VTV VTO.</th>
              <th className={columnasVisibles['vtv-ev'] ? '' : 'hidden'}>VTV EV</th>
              <th className={columnasVisibles['habilitacion-vencimiento'] ? '' : 'hidden'}>HAB. VTO.</th>
              <th className={columnasVisibles['habilitacion-eh'] ? '' : 'hidden'}>HAB. EH</th>
              <th className={columnasVisibles['tipo-seguro'] ? '' : 'hidden'}>TIPO SEGURO</th>
              <th className={columnasVisibles['seguro-tecnico'] ? '' : 'hidden'}>SEG. TÉCNICO</th>
              <th className={columnasVisibles['seguro-cargas'] ? '' : 'hidden'}>SEG. CARGAS PEL.</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                <td className={columnasVisibles.interno ? '' : 'hidden'}>{vehiculo.interno}</td>
                <td className={columnasVisibles.anio ? '' : 'hidden'}>{vehiculo.anio}</td>
                <td className={columnasVisibles.dominio ? '' : 'hidden'}>{vehiculo.dominio}</td>
                <td className={columnasVisibles.modelo ? '' : 'hidden'}>{vehiculo.modelo}</td>
                <td className={columnasVisibles['eq-incorporado'] ? '' : 'hidden'}>{vehiculo.eqIncorporado}</td>
                <td className={columnasVisibles.sector ? '' : 'hidden'}>{vehiculo.sector}</td>
                <td className={columnasVisibles.chofer ? '' : 'hidden'}>{vehiculo.chofer}</td>
                <td className={columnasVisibles.estado ? '' : 'hidden'}>
                  <span className={`status-badge ${getEstadoClass(vehiculo.estado)}`}>
                    {vehiculo.estado}
                  </span>
                </td>
                <td className={columnasVisibles.observaciones ? '' : 'hidden'}>{vehiculo.observaciones}</td>
                <td className={columnasVisibles['vtv-vencimiento'] ? '' : 'hidden'}>
                  {formatearFecha(vehiculo.vtvVencimiento)}
                </td>
                <td className={columnasVisibles['vtv-ev'] ? '' : 'hidden'}>
                  <span className={`status-badge ${getEstadoClass(vehiculo.vtvEstado)}`}>
                    {vehiculo.vtvEstado}
                  </span>
                </td>
                <td className={columnasVisibles['habilitacion-vencimiento'] ? '' : 'hidden'}>
                  {formatearFecha(vehiculo.habilitacionVencimiento)}
                </td>
                <td className={columnasVisibles['habilitacion-eh'] ? '' : 'hidden'}>
                  <span className={`status-badge ${getEstadoClass(vehiculo.habilitacionEstado)}`}>
                    {vehiculo.habilitacionEstado}
                  </span>
                </td>
                <td className={columnasVisibles['tipo-seguro'] ? '' : 'hidden'}>{vehiculo.tipoSeguro}</td>
                <td className={columnasVisibles['seguro-tecnico'] ? '' : 'hidden'}>
                  <span className={`status-badge ${getEstadoClass(vehiculo.seguroTecnico)}`}>
                    {vehiculo.seguroTecnico}
                  </span>
                </td>
                <td className={columnasVisibles['seguro-cargas'] ? '' : 'hidden'}>
                  <span className={`status-badge ${getEstadoClass(vehiculo.seguroCargas)}`}>
                    {vehiculo.seguroCargas}
                  </span>
                </td>
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

      {/* Modal Ver Vehículo (COMPLETO como prototipo) */}
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
                  <div className="detail-value">{vehiculoSeleccionado.anio}</div>
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
                  <div className="detail-label">Equipamiento</div>
                  <div className="detail-value">{vehiculoSeleccionado.eqIncorporado || 'No especificado'}</div>
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
                  <div className="detail-label">Observaciones</div>
                  <div className="detail-value">{vehiculoSeleccionado.observaciones || 'Sin observaciones'}</div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <div className="form-section-title">📅 Documentación y Seguros</div>
              <div className="vehicle-details-grid">
                <div>
                  <div className="detail-group">
                    <div className="detail-label">VTV - Vencimiento</div>
                    <div className="detail-value">{formatearFecha(vehiculoSeleccionado.vtvVencimiento) || 'No especificado'}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">VTV - Estado</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.vtvEstado)}`}>
                        {vehiculoSeleccionado.vtvEstado || 'No especificado'}
                      </span>
                    </div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Habilitación - Vencimiento</div>
                    <div className="detail-value">{formatearFecha(vehiculoSeleccionado.habilitacionVencimiento) || 'No especificado'}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Habilitación - Estado</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.habilitacionEstado)}`}>
                        {vehiculoSeleccionado.habilitacionEstado || 'No especificado'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="detail-group">
                    <div className="detail-label">Tipo de Seguro</div>
                    <div className="detail-value">{vehiculoSeleccionado.tipoSeguro || 'No especificado'}</div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Seguro Técnico</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.seguroTecnico)}`}>
                        {vehiculoSeleccionado.seguroTecnico || 'No especificado'}
                      </span>
                    </div>
                  </div>
                  <div className="detail-group">
                    <div className="detail-label">Seguro Cargas Peligrosas</div>
                    <div className="detail-value">
                      <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.seguroCargas)}`}>
                        {vehiculoSeleccionado.seguroCargas || 'No especificado'}
                      </span>
                    </div>
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
        <ColumnSelector
          columnasVisibles={columnasVisibles}
          onToggleColumna={toggleColumna}
          onClose={cerrarColumnSelector}
        />
      )}
    </div>
  );
};

export default RodadoMaquinarias;