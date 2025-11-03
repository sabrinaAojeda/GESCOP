import React, { useState } from 'react'
import GenericModal from '../../Common/GenericModal'

const ProveedorForm = ({ mode = 'crear', proveedor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: proveedor?.codigo || '',
    razonSocial: proveedor?.razonSocial || '',
    cuit: proveedor?.cuit || '',
    rubro: proveedor?.rubro || '',
    contacto: proveedor?.contacto || '',
    telefono: proveedor?.telefono || '',
    email: proveedor?.email || '',
    direccion: proveedor?.direccion || '',
    estado: proveedor?.estado || 'Activo'
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
      title={mode === 'crear' ? '➕ Nuevo Proveedor' : '✏️ Editar Proveedor'} 
      onClose={onClose}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información del Proveedor</h3>
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
                <option value="Activo">Activo</option>
                <option value="Suspendido">Suspendido</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Razón Social *</label>
            <input
              type="text"
              className="form-input"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">CUIT *</label>
              <input
                type="text"
                className="form-input"
                name="cuit"
                value={formData.cuit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rubro *</label>
              <select
                className="form-input"
                name="rubro"
                value={formData.rubro}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="Combustible">Combustible</option>
                <option value="Repuestos">Repuestos</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Seguros">Seguros</option>
                <option value="Neumáticos">Neumáticos</option>
                <option value="Lavadero">Lavadero</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Información de Contacto</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Contacto</label>
              <input
                type="text"
                className="form-input"
                name="contacto"
                value={formData.contacto}
                onChange={handleChange}
              />
            </div>
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
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Crear Proveedor' : 'Actualizar Proveedor'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default ProveedorForm