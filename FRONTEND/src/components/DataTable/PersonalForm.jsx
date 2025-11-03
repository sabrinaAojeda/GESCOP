import React, { useState } from 'react'
import GenericModal from '../../Common/GenericModal'

const PersonalForm = ({ mode = 'crear', personal, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    legajo: personal?.legajo || '',
    nombre: personal?.nombre || '',
    apellido: personal?.apellido || '',
    dni: personal?.dni || '',
    sector: personal?.sector || '',
    cargo: personal?.cargo || '',
    telefono: personal?.telefono || '',
    email: personal?.email || '',
    licenciaVencimiento: personal?.licenciaVencimiento || '',
    estado: personal?.estado || 'Activo'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <GenericModal 
      title={mode === 'crear' ? '➕ Nuevo Empleado' : '✏️ Editar Empleado'} 
      onClose={onClose}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información Personal</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Legajo *</label>
              <input
                type="text"
                className="form-input"
                name="legajo"
                value={formData.legajo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">DNI *</label>
              <input
                type="text"
                className="form-input"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                className="form-input"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido *</label>
              <input
                type="text"
                className="form-input"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Sector *</label>
              <select
                className="form-input"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Logística">Logística</option>
                <option value="Producción">Producción</option>
                <option value="Administración">Administración</option>
                <option value="Mantenimiento">Mantenimiento</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Cargo *</label>
              <input
                type="text"
                className="form-input"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Contacto y Documentación</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-input"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Licencia Vencimiento</label>
              <input
                type="date"
                className="form-input"
                name="licenciaVencimiento"
                value={formData.licenciaVencimiento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                className="form-input"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Vacaciones">Vacaciones</option>
                <option value="Licencia">Licencia</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Crear Empleado' : 'Actualizar Empleado'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default PersonalForm