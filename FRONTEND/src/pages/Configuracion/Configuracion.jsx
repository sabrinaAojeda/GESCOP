import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Configuracion = () => {
  const [configuracion, setConfiguracion] = useState({
    alertas: {
      vtvDiasPrevios: 30,
      seguroDiasPrevios: 45,
      licenciasDiasPrevios: 60,
      mantenimientoDiasPrevios: 15
    },
    notificaciones: {
      email: "alertas@empresa.com",
      frecuencia: "Diario"
    },
    seguridad: {
      tiempoSesion: 120,
      intentosLogin: 3
    }
  });

  const handleInputChange = (seccion, campo, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor
      }
    }));
  };

  const guardarConfiguracion = () => {
    // Aquí iría la lógica para guardar en el backend
    alert('Configuración guardada correctamente');
  };

  return (
    <div id="configuracion-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
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
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.alertas.vtvDiasPrevios}
                onChange={(e) => handleInputChange('alertas', 'vtvDiasPrevios', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Seguro</label>
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.alertas.seguroDiasPrevios}
                onChange={(e) => handleInputChange('alertas', 'seguroDiasPrevios', parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Licencias</label>
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.alertas.licenciasDiasPrevios}
                onChange={(e) => handleInputChange('alertas', 'licenciasDiasPrevios', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Días previos para alerta de Mantenimiento</label>
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.alertas.mantenimientoDiasPrevios}
                onChange={(e) => handleInputChange('alertas', 'mantenimientoDiasPrevios', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">📧 Notificaciones por Email</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email para notificaciones</label>
              <input 
                type="email" 
                className="form-input" 
                value={configuracion.notificaciones.email}
                onChange={(e) => handleInputChange('notificaciones', 'email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Frecuencia de reportes</label>
              <select 
                className="form-input"
                value={configuracion.notificaciones.frecuencia}
                onChange={(e) => handleInputChange('notificaciones', 'frecuencia', e.target.value)}
              >
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
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.seguridad.tiempoSesion}
                onChange={(e) => handleInputChange('seguridad', 'tiempoSesion', parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Intentos de login fallidos</label>
              <input 
                type="number" 
                className="form-input" 
                value={configuracion.seguridad.intentosLogin}
                onChange={(e) => handleInputChange('seguridad', 'intentosLogin', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">🔄 Respaldos</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Frecuencia de respaldos automáticos</label>
              <select className="form-input">
                <option>Diario</option>
                <option>Semanal</option>
                <option>Mensual</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Mantener respaldos por</label>
              <select className="form-input">
                <option>30 días</option>
                <option>90 días</option>
                <option>1 año</option>
              </select>
            </div>
          </div>
          <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
            <button className="btn btn-primary">
              <span>💾</span> Generar Respaldo Manual
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-secondary">Cancelar</button>
          <button className="btn btn-primary" onClick={guardarConfiguracion}>
            Guardar Configuración
          </button>
        </div>
      </section>
    </div>
  );
};

export default Configuracion;