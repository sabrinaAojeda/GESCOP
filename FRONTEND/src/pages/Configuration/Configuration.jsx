import React from 'react'
import { Link } from 'react-router-dom'
import './Configuration.css'

const Configuration = () => {
  return (
    <div className="configuration-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link>
        <span>Configuración</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">⚙️ Configuración del Sistema</h2>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">🔔 Configuración de Alertas</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Días previos para alerta de VTV</label>
              <input type="number" className="form-input" defaultValue="30" />
            </div>
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Seguro</label>
              <input type="number" className="form-input" defaultValue="45" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Licencias</label>
              <input type="number" className="form-input" defaultValue="60" />
            </div>
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Mantenimiento</label>
              <input type="number" className="form-input" defaultValue="15" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">📧 Notificaciones por Email</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email para notificaciones</label>
              <input type="email" className="form-input" defaultValue="alertas@empresa.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Frecuencia de reportes</label>
              <select className="form-input">
                <option>Diario</option>
                <option>Semanal</option>
                <option>Mensual</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">🔐 Seguridad</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Tiempo de sesión (minutos)</label>
              <input type="number" className="form-input" defaultValue="120" />
            </div>
            <div className="form-group">
              <label className="form-label">Intentos de login fallidos</label>
              <input type="number" className="form-input" defaultValue="3" />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary">Cancelar</button>
          <button className="btn btn-primary">Guardar Configuración</button>
        </div>
      </section>
    </div>
  )
}

export default Configuration