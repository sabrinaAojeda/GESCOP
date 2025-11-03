import React from 'react';
import './Configuration.css';

const Configuration = () => {
  return (
    <div className="configuration-page">
      <div className="page-header">
        <h1>⚙️ Configuración del Sistema</h1>
      </div>

      <div className="configuration-content">
        <div className="config-section">
          <h3 className="section-title">🔔 Configuración de Alertas</h3>
          <div className="config-grid">
            <div className="config-group">
              <label className="config-label">Días previos para alerta de VTV</label>
              <input type="number" className="config-input" defaultValue="30" />
            </div>
            <div className="config-group">
              <label className="config-label">Días previos para alerta de Seguro</label>
              <input type="number" className="config-input" defaultValue="45" />
            </div>
            <div className="config-group">
              <label className="config-label">Días previos para alerta de Licencias</label>
              <input type="number" className="config-input" defaultValue="60" />
            </div>
            <div className="config-group">
              <label className="config-label">Días previos para alerta de Mantenimiento</label>
              <input type="number" className="config-input" defaultValue="15" />
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">📧 Notificaciones por Email</h3>
          <div className="config-grid">
            <div className="config-group full-width">
              <label className="config-label">Email para notificaciones</label>
              <input 
                type="email" 
                className="config-input" 
                defaultValue="gestiondocumental@copesa-ar.com" 
              />
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3 className="section-title">🔐 Seguridad</h3>
          <div className="config-grid">
            <div className="config-group">
              <label className="config-label">Tiempo de sesión (minutos)</label>
              <input type="number" className="config-input" defaultValue="120" />
            </div>
            <div className="config-group">
              <label className="config-label">Intentos de login fallidos</label>
              <input type="number" className="config-input" defaultValue="3" />
            </div>
          </div>
        </div>

        <div className="config-actions">
          <button className="btn btn-secondary">Cancelar</button>
          <button className="btn btn-primary">Guardar Configuración</button>
        </div>
      </div>
    </div>
  );
};

export default Configuration;