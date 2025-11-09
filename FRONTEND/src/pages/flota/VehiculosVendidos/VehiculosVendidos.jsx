// src/pages/flota/VehiculosVendidos/VehiculosVendidos.jsx
import React, { useState, useEffect } from "react";
import { useVehiculosVendidos } from "@hooks/useVehiculosVendidos";
import GenericModal from "@components/Common/GenericModal";
import ColumnSelectorVehiculosVendidos from "@components/Common/ColumnSelectorVehiculosVendidos";
import ModalVehiculoVendido from "@components/Common/ModalVehiculoVendido";
import ModalDocumentacion from "@components/Common/ModalDocumentacion";
import "./VehiculosVendidos.css";

const VehiculosVendidos = () => {
  const { vehiculosVendidos, loading, error, agregarVehiculoVendido, actualizarVehiculoVendido, eliminarVehiculoVendido } = useVehiculosVendidos();
  
  // Estados para la gestión de la UI
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(null);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [mostrarColumnSelector, setMostrarColumnSelector] = useState(false);
  const [filtros, setFiltros] = useState({
    buscar: '',
    comprador: '',
    estado_documentacion: '',
    año: ''
  });

  // Estado para columnas visibles
  const [columnasVisibles, setColumnasVisibles] = useState({
    'interno': true,
    'dominio': true,
    'marca_modelo': true,
    'fecha_venta': true,
    'comprador': true,
    'precio': true,
    'estado_documentacion': true,
    'kilometraje_venta': false,
    'observaciones': false
  });

  // Efecto para aplicar filtros
  useEffect(() => {
    let resultados = vehiculosVendidos;
    
    // Filtro de búsqueda
    if (filtros.buscar) {
      const termino = filtros.buscar.toLowerCase();
      resultados = resultados.filter(vehiculo =>
        vehiculo.interno?.toLowerCase().includes(termino) ||
        vehiculo.dominio?.toLowerCase().includes(termino) ||
        vehiculo.marca_modelo?.toLowerCase().includes(termino) ||
        vehiculo.comprador?.toLowerCase().includes(termino)
      );
    }
    
    // Filtro por comprador
    if (filtros.comprador) {
      resultados = resultados.filter(vehiculo => vehiculo.comprador === filtros.comprador);
    }
    
    // Filtro por estado de documentación
    if (filtros.estado_documentacion) {
      resultados = resultados.filter(vehiculo => vehiculo.estado_documentacion === filtros.estado_documentacion);
    }

    // Filtro por año
    if (filtros.año) {
      resultados = resultados.filter(vehiculo => {
        const fechaVenta = new Date(vehiculo.fecha_venta);
        return fechaVenta.getFullYear().toString() === filtros.año;
      });
    }
    
    setVehiculosFiltrados(resultados);
  }, [vehiculosVendidos, filtros]);

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
  const handleCrearVehiculoVendido = (datosVehiculo) => {
    console.log('Registrando vehículo vendido:', datosVehiculo);
    agregarVehiculoVendido(datosVehiculo);
    cerrarModal();
    alert('Vehículo vendido registrado correctamente');
  };

  const handleActualizarVehiculoVendido = (datosVehiculo) => {
    console.log('Actualizando vehículo vendido:', datosVehiculo);
    actualizarVehiculoVendido(vehiculoSeleccionado.id, datosVehiculo);
    cerrarModal();
    alert('Vehículo vendido actualizado correctamente');
  };

  const handleEliminarVehiculoVendido = (id) => {
    const vehiculo = vehiculosVendidos.find(v => v.id === id);
    if (vehiculo && window.confirm(`¿Está seguro de eliminar el registro de venta del vehículo ${vehiculo.marca_modelo} (${vehiculo.dominio})? Esta acción no se puede deshacer.`)) {
      eliminarVehiculoVendido(id);
    }
  };

  const handleGuardarDocumentacion = (documentos) => {
    if (vehiculoSeleccionado) {
      actualizarVehiculoVendido(vehiculoSeleccionado.id, {
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

  // Función para formatear precio
  const formatearPrecio = (precio) => {
    if (!precio) return '';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  // Función para obtener clase de estado
  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'completa':
        return 'status-active';
      case 'en trámite':
        return 'status-warning';
      case 'incompleta':
        return 'status-expired';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Cargando vehículos vendidos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="vehiculos-vendidos-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="#" onClick={() => window.history.back()}>Dashboard</a>
        <span>Vehículos Vendidos</span>
      </div>

      {/* Resumen */}
      <div className="summary-cards">
        <div className="summary-card-small">
          <div className="number">{vehiculosVendidos.length}</div>
          <div className="label">Total Vendidos</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {vehiculosVendidos.filter(v => v.estado_documentacion === 'Completa').length}
          </div>
          <div className="label">Documentación Completa</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {formatearPrecio(vehiculosVendidos.reduce((total, v) => total + (v.precio || 0), 0))}
          </div>
          <div className="label">Total Recaudado</div>
        </div>
        <div className="summary-card-small">
          <div className="number">
            {new Date().getFullYear()}
          </div>
          <div className="label">Ventas {new Date().getFullYear()}</div>
        </div>
      </div>

      {/* Sección Principal */}
      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">💰 Vehículos Vendidos</h2>
          <div className="table-toolbar">
            <button className="btn btn-secondary" onClick={abrirColumnSelector}>
              <span>👁️</span> Columnas
            </button>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary" onClick={abrirModalNuevo}>
              <span>+</span> Registrar Venta
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="filter-bar">
          <input 
            type="text" 
            className="filter-select" 
            placeholder="Buscar por interno, dominio, modelo, comprador..." 
            value={filtros.buscar}
            onChange={(e) => setFiltros(prev => ({ ...prev, buscar: e.target.value }))}
          />
          <select 
            className="filter-select" 
            value={filtros.comprador}
            onChange={(e) => setFiltros(prev => ({ ...prev, comprador: e.target.value }))}
          >
            <option value="">Todos los compradores</option>
            <option value="Empresa XYZ S.A.">Empresa XYZ S.A.</option>
            <option value="Transportes ABC">Transportes ABC</option>
            <option value="Logística Rápida S.R.L.">Logística Rápida S.R.L.</option>
            <option value="Construcciones Norte">Construcciones Norte</option>
          </select>
          <select 
            className="filter-select" 
            value={filtros.estado_documentacion}
            onChange={(e) => setFiltros(prev => ({ ...prev, estado_documentacion: e.target.value }))}
          >
            <option value="">Todos los estados</option>
            <option value="Completa">Completa</option>
            <option value="En trámite">En trámite</option>
            <option value="Incompleta">Incompleta</option>
          </select>
          <select 
            className="filter-select" 
            value={filtros.año}
            onChange={(e) => setFiltros(prev => ({ ...prev, año: e.target.value }))}
          >
            <option value="">Todos los años</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        {/* Tabla */}
        <table className="data-table">
          <thead>
            <tr>
              {columnasVisibles.interno && <th>INT.</th>}
              {columnasVisibles.dominio && <th>DOMINIO</th>}
              {columnasVisibles.marca_modelo && <th>MARCA/MODELO</th>}
              {columnasVisibles.fecha_venta && <th>FECHA VENTA</th>}
              {columnasVisibles.comprador && <th>COMPRADOR</th>}
              {columnasVisibles.precio && <th>PRECIO</th>}
              {columnasVisibles.estado_documentacion && <th>ESTADO DOC.</th>}
              {columnasVisibles.kilometraje_venta && <th>KM VENTA</th>}
              {columnasVisibles.observaciones && <th>OBSERVACIONES</th>}
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map(vehiculo => (
              <tr key={vehiculo.id}>
                {columnasVisibles.interno && <td>{vehiculo.interno}</td>}
                {columnasVisibles.dominio && <td>{vehiculo.dominio}</td>}
                {columnasVisibles.marca_modelo && <td>{vehiculo.marca_modelo}</td>}
                {columnasVisibles.fecha_venta && <td>{formatearFecha(vehiculo.fecha_venta)}</td>}
                {columnasVisibles.comprador && <td>{vehiculo.comprador}</td>}
                {columnasVisibles.precio && <td>{formatearPrecio(vehiculo.precio)}</td>}
                {columnasVisibles.estado_documentacion && (
                  <td>
                    <span className={`status-badge ${getEstadoClass(vehiculo.estado_documentacion)}`}>
                      {vehiculo.estado_documentacion}
                    </span>
                  </td>
                )}
                {columnasVisibles.kilometraje_venta && <td>{vehiculo.kilometraje_venta ? `${vehiculo.kilometraje_venta.toLocaleString()} km` : '-'}</td>}
                {columnasVisibles.observaciones && <td>{vehiculo.observaciones || '-'}</td>}
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
                      onClick={() => handleEliminarVehiculoVendido(vehiculo.id)}
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
          Mostrando {vehiculosFiltrados.length} de {vehiculosVendidos.length} vehículos vendidos
        </div>
      </section>

      {/* Modal Ver Vehículo Vendido */}
      {modalAbierto === 'ver' && vehiculoSeleccionado && (
        <GenericModal
          title={`👁️ Detalles de Venta - ${vehiculoSeleccionado.dominio}`}
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
                  <div className="detail-label">Dominio</div>
                  <div className="detail-value">{vehiculoSeleccionado.dominio}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Marca/Modelo</div>
                  <div className="detail-value">{vehiculoSeleccionado.marca_modelo}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Fecha de Venta</div>
                  <div className="detail-value">{formatearFecha(vehiculoSeleccionado.fecha_venta)}</div>
                </div>
              </div>
              <div>
                <div className="detail-group">
                  <div className="detail-label">Comprador</div>
                  <div className="detail-value">{vehiculoSeleccionado.comprador}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Precio de Venta</div>
                  <div className="detail-value">{formatearPrecio(vehiculoSeleccionado.precio)}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Kilometraje al Vender</div>
                  <div className="detail-value">{vehiculoSeleccionado.kilometraje_venta ? `${vehiculoSeleccionado.kilometraje_venta.toLocaleString()} km` : 'No registrado'}</div>
                </div>
                <div className="detail-group">
                  <div className="detail-label">Estado Documentación</div>
                  <div className="detail-value">
                    <span className={`status-badge ${getEstadoClass(vehiculoSeleccionado.estado_documentacion)}`}>
                      {vehiculoSeleccionado.estado_documentacion}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <div className="form-section-title">📝 Observaciones</div>
              <div className="detail-group">
                <div className="detail-value">{vehiculoSeleccionado.observaciones || 'Sin observaciones'}</div>
              </div>
            </div>

            <div className="documents-section">
              <h3 className="form-section-title">📄 Documentación de Venta</h3>
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
                  <p>No hay documentos asociados a esta venta.</p>
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
                Editar Registro
              </button>
            </div>
          </div>
        </GenericModal>
      )}

      {/* Modales existentes */}
      {modalAbierto === 'nuevo' && (
        <ModalVehiculoVendido
          mode="crear"
          onClose={cerrarModal}
          onSave={handleCrearVehiculoVendido}
        />
      )}

      {modalAbierto === 'editar' && vehiculoSeleccionado && (
        <ModalVehiculoVendido
          mode="editar"
          vehiculo={vehiculoSeleccionado}
          onClose={cerrarModal}
          onSave={handleActualizarVehiculoVendido}
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
        <ColumnSelectorVehiculosVendidos
          columnasVisibles={columnasVisibles}
          onToggleColumna={toggleColumna}
          onClose={cerrarColumnSelector}
        />
      )}
    </div>
  );
};

export default VehiculosVendidos;