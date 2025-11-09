// src/components/Common/ModalVehiculoVendido.jsx
import React, { useState } from 'react'
import GenericModal from './GenericModal'

const ModalVehiculoVendido = ({ mode = 'crear', vehiculo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    interno: vehiculo?.interno || '',
    dominio: vehiculo?.dominio || '',
    marca_modelo: vehiculo?.marca_modelo || '',
    fecha_venta: vehiculo?.fecha_venta || '',
    comprador: vehiculo?.comprador || '',
    precio: vehiculo?.precio || '',
    estado_documentacion: vehiculo?.estado_documentacion || 'En trámite',
    kilometraje_venta: vehiculo?.kilometraje_venta || '',
    observaciones: vehiculo?.observaciones || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validaciones básicas
    if (!formData.interno || !formData.dominio || !formData.marca_modelo || !formData.fecha_venta) {
      alert('Por favor complete los campos obligatorios (*)')
      return
    }

    const datosParaGuardar = {
      ...formData,
      precio: parseFloat(formData.precio) || 0,
      kilometraje_venta: parseInt(formData.kilometraje_venta) || 0
    }

    onSave(datosParaGuardar)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <GenericModal 
      title={mode === 'crear' ? '💰 Registrar Venta de Vehículo' : '✏️ Editar Venta de Vehículo'} 
      onClose={onClose}
      size="large"
    >
      <form onSubmit={handleSubmit} className="modal-vehiculo-form">
        <div className="form-section">
          <h3 className="form-section-title">Información del Vehículo</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Interno *</label>
              <input
                type="text"
                className="form-input"
                name="interno"
                value={formData.interno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dominio *</label>
              <input
                type="text"
                className="form-input"
                name="dominio"
                value={formData.dominio}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Marca/Modelo *</label>
            <input
              type="text"
              className="form-input"
              name="marca_modelo"
              value={formData.marca_modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kilometraje al Vender</label>
            <input
              type="number"
              className="form-input"
              name="kilometraje_venta"
              value={formData.kilometraje_venta}
              onChange={handleChange}
              placeholder="Ej: 85000"
            />
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Información de Venta</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Fecha de Venta *</label>
              <input
                type="date"
                className="form-input"
                name="fecha_venta"
                value={formData.fecha_venta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Precio de Venta</label>
              <input
                type="number"
                className="form-input"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ej: 15000000"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Comprador *</label>
            <input
              type="text"
              className="form-input"
              name="comprador"
              value={formData.comprador}
              onChange={handleChange}
              required
              placeholder="Nombre o razón social del comprador"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Estado Documentación</label>
              <select
                className="form-input"
                name="estado_documentacion"
                value={formData.estado_documentacion}
                onChange={handleChange}
              >
                <option value="En trámite">En trámite</option>
                <option value="Completa">Completa</option>
                <option value="Incompleta">Incompleta</option>
              </select>
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
              placeholder="Observaciones adicionales sobre la venta..."
              rows="3"
            />
          </div>
        </div>

        <div className="modal-vehiculo-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === 'crear' ? 'Registrar Venta' : 'Actualizar Registro'}
          </button>
        </div>
      </form>
    </GenericModal>
  )
}

export default ModalVehiculoVendido