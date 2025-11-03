import React, { useState } from 'react'
import GenericModal from '../../Common/GenericModal'

const SedeForm = ({ mode = 'crear', sede, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: sede?.codigo || '',
    nombre: sede?.nombre || '',
    direccion: sede?.direccion || '',
    localidad: sede?.localidad || '',
    provincia: sede?.provincia || '',
    telefono: sede?.telefono || '',
    email: sede?.email || '',
    responsable: sede?.responsable || '',
    estado: sede?.estado || 'Activa'
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
      title={mode === 'crear' ? '➕ Nueva Sede' : '✏️ Editar Sede'} 
      onClose={onClose}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información de la Sede</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Código *</label>
              <input
                type="text"
                className="form-input"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
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
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="En Trámite">En Trámite</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Nombre de la Sede *</label>
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
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-input"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Localidad</label>
              <input
                type="text"
                className="form-input"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Provincia</label>
              <select
                className="form-input"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Mendoza">Mendoza</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Contacto</h3>
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

          <div className="form-group">
            <label className="form-label">Responsable</label>
            <input
              type="text"
              className="form-input"
              name="responsable"
              value={formData.responsable}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Crear Sede' : 'Actualizar Sede'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default SedeForm