// src/components/Common/ModalEquipamiento.jsx
import React, { useState } from 'react'
import GenericModal from './GenericModal'

const ModalEquipamiento = ({ mode = 'crear', equipamiento, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codigo: equipamiento?.codigo || '',
    descripcion: equipamiento?.descripcion || '',
    tipo: equipamiento?.tipo || '',
    vehiculo_asignado: equipamiento?.vehiculo_asignado || '',
    estado: equipamiento?.estado || 'Operativo',
    ultima_revision: equipamiento?.ultima_revision || '',
    proxima_revision: equipamiento?.proxima_revision || '',
    observaciones: equipamiento?.observaciones || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (!formData.codigo || !formData.descripcion || !formData.tipo) {
      alert('Por favor complete los campos obligatorios (*)')
      return
    }

    onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Calcular próxima revisión automáticamente si se ingresa última revisión
  const handleUltimaRevisionChange = (e) => {
    const { value } = e.target
    setFormData(prev => {
      const newData = { ...prev, ultima_revision: value }
      
      // Si se ingresa una última revisión, calcular próxima revisión (6 meses después)
      if (value) {
        try {
          const ultimaRevision = new Date(value)
          const proximaRevision = new Date(ultimaRevision)
          proximaRevision.setMonth(proximaRevision.getMonth() + 6)
          newData.proxima_revision = proximaRevision.toISOString().split('T')[0]
        } catch (e) {
          // Si hay error en la fecha, no calcular
        }
      }
      
      return newData
    })
  }

  return (
    <GenericModal 
      title={mode === 'crear' ? '🔧 Nuevo Equipamiento' : '✏️ Editar Equipamiento'} 
      onClose={onClose}
      size="large"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información del Equipamiento</h3>
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
                placeholder="Ej: GPS-001"
              />
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
                <option value="Navegación">Navegación</option>
                <option value="Comunicación">Comunicación</option>
                <option value="Seguridad">Seguridad</option>
                <option value="Control">Control</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Descripción *</label>
            <input
              type="text"
              className="form-input"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              placeholder="Descripción detallada del equipamiento"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Vehículo Asignado</label>
              <select
                className="form-input"
                name="vehiculo_asignado"
                value={formData.vehiculo_asignado}
                onChange={handleChange}
              >
                <option value="">Sin asignar</option>
                <option value="AB-123-CD">AB-123-CD</option>
                <option value="EF-456-GH">EF-456-GH</option>
                <option value="IJ-789-KL">IJ-789-KL</option>
                <option value="MA-001-AA">MA-001-AA</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estado</label>
              <select
                className="form-input"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="Operativo">Operativo</option>
                <option value="Almacenado">Almacenado</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Vencido">Vencido</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Mantenimiento y Revisiones</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Última Revisión</label>
              <input
                type="date"
                className="form-input"
                name="ultima_revision"
                value={formData.ultima_revision}
                onChange={handleUltimaRevisionChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Próxima Revisión</label>
              <input
                type="date"
                className="form-input"
                name="proxima_revision"
                value={formData.proxima_revision}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Observaciones</h3>
          <div className="form-group">
            <textarea
              className="form-input"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Observaciones adicionales sobre el equipamiento..."
              rows="3"
            />
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Crear Equipamiento' : 'Actualizar Equipamiento'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default ModalEquipamiento