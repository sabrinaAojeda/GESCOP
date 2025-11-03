import React from "react";
import "./ModalVehiculo.css";

const ModalVerVehiculo = ({ vehiculo, onClose }) => {
  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
      case 'vigente':
        return 'status-active'
      case 'por vencer':
      case 'mantenimiento':
        return 'status-warning'
      case 'vencido':
      case 'inactivo':
        return 'status-expired'
      default:
        return ''
    }
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'No especificado';
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-AR');
    } catch (e) {
      return fechaString;
    }
  };

  return (
    <div className="modal-vehiculo-overlay">
      <div className="modal-vehiculo-content">
        <div className="modal-vehiculo-header">
          <h2 className="modal-vehiculo-title">👁️ Detalles del Vehículo</h2>
          <button className="modal-vehiculo-close" onClick={onClose}>×</button>
        </div>

        <div className="vehicle-details">
          <div>
            <div className="detail-group">
              <div className="detail-label">Interno</div>
              <div className="detail-value">{vehiculo.interno}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Año</div>
              <div className="detail-value">{vehiculo.anio}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Dominio</div>
              <div className="detail-value">{vehiculo.dominio}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Modelo</div>
              <div className="detail-value">{vehiculo.modelo}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Equipamiento</div>
              <div className="detail-value">{vehiculo.eqIncorporado || 'No especificado'}</div>
            </div>
          </div>
          <div>
            <div className="detail-group">
              <div className="detail-label">Sector</div>
              <div className="detail-value">{vehiculo.sector}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Chofer</div>
              <div className="detail-value">{vehiculo.chofer || 'No asignado'}</div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Estado</div>
              <div className="detail-value">
                <span className={`status-badge ${getEstadoClass(vehiculo.estado)}`}>
                  {vehiculo.estado}
                </span>
              </div>
            </div>
            <div className="detail-group">
              <div className="detail-label">Observaciones</div>
              <div className="detail-value">{vehiculo.observaciones || 'Sin observaciones'}</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">📅 Documentación y Seguros</h3>
          <div className="vehicle-details">
            <div>
              <div className="detail-group">
                <div className="detail-label">VTV - Vencimiento</div>
                <div className="detail-value">{formatearFecha(vehiculo.vtvVencimiento)}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">VTV - Estado</div>
                <div className="detail-value">
                  <span className={`status-badge ${getEstadoClass(vehiculo.vtvEstado)}`}>
                    {vehiculo.vtvEstado || 'No especificado'}
                  </span>
                </div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Habilitación - Vencimiento</div>
                <div className="detail-value">{formatearFecha(vehiculo.habilitacionVencimiento)}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Habilitación - Estado</div>
                <div className="detail-value">
                  <span className={`status-badge ${getEstadoClass(vehiculo.habilitacionEstado)}`}>
                    {vehiculo.habilitacionEstado || 'No especificado'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="detail-group">
                <div className="detail-label">Tipo de Seguro</div>
                <div className="detail-value">{vehiculo.tipoSeguro || 'No especificado'}</div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Seguro Técnico</div>
                <div className="detail-value">
                  <span className={`status-badge ${getEstadoClass(vehiculo.seguroTecnico)}`}>
                    {vehiculo.seguroTecnico || 'No especificado'}
                  </span>
                </div>
              </div>
              <div className="detail-group">
                <div className="detail-label">Seguro Cargas Peligrosas</div>
                <div className="detail-value">
                  <span className={`status-badge ${getEstadoClass(vehiculo.seguroCargas)}`}>
                    {vehiculo.seguroCargas || 'No especificado'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button className="btn btn-primary">
            Editar Vehículo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerVehiculo;