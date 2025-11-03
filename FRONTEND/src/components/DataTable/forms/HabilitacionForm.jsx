import React, { useState } from 'react'
import GenericModal from '../../Common/GenericModal'

const HabilitacionForm = ({ mode = 'crear', habilitacion, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vehiculo: habilitacion?.vehiculo || '',
    tipo: habilitacion?.tipo || '',
    numero: habilitacion?.numero || '',
    fechaEmision: habilitacion?.fechaEmision || '',
    fechaVencimiento: habilitacion?.fechaVencimiento || '',
    estado: habilitacion?.estado || 'Vigente',
    observaciones: habilitacion?.observaciones || ''
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
      title={mode === 'crear' ? '➕ Nueva Habilitación' : '✏️ Editar Habilitación'} 
      onClose={onClose}
      size="medium"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información de la Habilitación</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Vehículo *</label>
              <select
                className="form-input"
                name="vehiculo"
                value={formData.vehiculo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar vehículo...</option>
                <option value="AB-123-CD">AB-123-CD - Toyota Hilux</option>
                <option value="EF-456-GH">EF-456-GH - Ford Ranger</option>
                <option value="IJ-789-KL">IJ-789-KL - Mercedes Sprinter</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tipo *</label>
              <select
                className="form-input"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar tipo...</option>
                <option value="VTV">VTV</option>
                <option value="Habilitación">Habilitación</option>
                <option value="Seguro">Seguro</option>
                <option value="Certificado">Certificado</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Número de Documento *</label>
            <input
              type="text"
              className="form-input"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha de Emisión</label>
              <input
                type="date"
                className="form-input"
                name="fechaEmision"
                value={formData.fechaEmision}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Fecha de Vencimiento *</label>
              <input
                type="date"
                className="form-input"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                className="form-input"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Vigente">Vigente</option>
                <option value="Por vencer">Por vencer</option>
                <option value="Vencido">Vencido</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Observaciones</label>
            <textarea
              className="form-input"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Crear Habilitación' : 'Actualizar Habilitación'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default HabilitacionForm