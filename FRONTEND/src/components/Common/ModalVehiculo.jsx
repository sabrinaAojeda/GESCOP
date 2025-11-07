// src/components/Common/ModalVehiculo.jsx
import React, { useState, useEffect } from "react";
import "./ModalVehiculo.css";

const ModalVehiculo = ({ mode = "crear", vehiculo, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    interno: "",
    anio: "",
    dominio: "",
    modelo: "",
    eqIncorporado: "",
    sector: "",
    chofer: "",
    estado: "",
    observaciones: "",
    vtvVencimiento: "",
    vtvEstado: "",
    habilitacionVencimiento: "",
    habilitacionEstado: "",
    tipoSeguro: "",
    seguroTecnico: "",
    seguroCargas: ""
  });

  useEffect(() => {
    if (mode === "editar" && vehiculo) {
      setFormData(vehiculo);
    } else {
      // Reset form for crear mode
      setFormData({
        interno: "",
        anio: "",
        dominio: "",
        modelo: "",
        eqIncorporado: "",
        sector: "",
        chofer: "",
        estado: "",
        observaciones: "",
        vtvVencimiento: "",
        vtvEstado: "",
        habilitacionVencimiento: "",
        habilitacionEstado: "",
        tipoSeguro: "",
        seguroTecnico: "",
        seguroCargas: ""
      });
    }
  }, [mode, vehiculo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.interno || !formData.dominio || !formData.modelo || !formData.sector || !formData.estado) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    if (mode === "crear") {
      onSave(formData);
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="modal-vehiculo-overlay">
      <div className="modal-vehiculo-content">
        <div className="modal-vehiculo-header">
          <h2 className="modal-vehiculo-title">
            {mode === "crear" ? "➕ Nuevo Vehículo" : "✏️ Editar Vehículo"}
          </h2>
          <button className="modal-vehiculo-close" onClick={onClose}>×</button>
        </div>

        <form className="modal-vehiculo-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Información Básica</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Interno</label>
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
                <label className="form-label">Año</label>
                <input
                  type="number"
                  className="form-input"
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                  min="2000"
                  max="2030"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Dominio</label>
                <input
                  type="text"
                  className="form-input"
                  name="dominio"
                  value={formData.dominio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label required">Marca y Modelo</label>
                <input
                  type="text"
                  className="form-input"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Equipamiento Incorporado</label>
              <input
                type="text"
                className="form-input"
                name="eqIncorporado"
                value={formData.eqIncorporado}
                onChange={handleChange}
                placeholder="GPS, Radio, etc."
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Operación</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label required">Sector</label>
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
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">Estado</label>
                <select
                  className="form-input"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Activo">Activo</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Chofer Asignado</label>
              <select
                className="form-input"
                name="chofer"
                value={formData.chofer}
                onChange={handleChange}
              >
                <option value="">Sin asignar</option>
                <option value="Juan Pérez">Juan Pérez</option>
                <option value="María García">María García</option>
                <option value="Carlos López">Carlos López</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Observaciones</label>
              <textarea
                className="form-input"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="3"
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Documentación</h3>
            <div className="sub-columns">
              <div>
                <h4>VTV</h4>
                <div className="form-group">
                  <label className="form-label">Vencimiento</label>
                  <input
                    type="date"
                    className="form-input"
                    name="vtvVencimiento"
                    value={formData.vtvVencimiento}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-input"
                    name="vtvEstado"
                    value={formData.vtvEstado}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Vigente">Vigente</option>
                    <option value="Por vencer">Por vencer</option>
                    <option value="Vencido">Vencido</option>
                  </select>
                </div>
              </div>
              <div>
                <h4>Habilitación</h4>
                <div className="form-group">
                  <label className="form-label">Vencimiento</label>
                  <input
                    type="date"
                    className="form-input"
                    name="habilitacionVencimiento"
                    value={formData.habilitacionVencimiento}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-input"
                    name="habilitacionEstado"
                    value={formData.habilitacionEstado}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Vigente">Vigente</option>
                    <option value="Por vencer">Por vencer</option>
                    <option value="Vencido">Vencido</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Seguros</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Tipo de Seguro</label>
                <select
                  className="form-input"
                  name="tipoSeguro"
                  value={formData.tipoSeguro}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Terceros Completo">Terceros Completo</option>
                  <option value="Todo Riesgo">Todo Riesgo</option>
                  <option value="Responsabilidad Civil">Responsabilidad Civil</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Seguro Técnico</label>
                <select
                  className="form-input"
                  name="seguroTecnico"
                  value={formData.seguroTecnico}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Vigente">Vigente</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Seguro Cargas Peligrosas</label>
                <select
                  className="form-input"
                  name="seguroCargas"
                  value={formData.seguroCargas}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Vigente">Vigente</option>
                  <option value="No requiere">No requiere</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-vehiculo-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "crear" ? "Guardar Vehículo" : "Actualizar Vehículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalVehiculo;