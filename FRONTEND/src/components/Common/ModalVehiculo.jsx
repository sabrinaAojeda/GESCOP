import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import "./ModalVehiculo.css";

const ModalVehiculo = ({ mode = "crear", vehiculo, onClose }) => {
  const { agregarVehiculo, actualizarVehiculo } = useApp();
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
    
    if (mode === "crear") {
      agregarVehiculo(formData);
    } else {
      actualizarVehiculo(vehiculo.id, formData);
    }
    
    onClose();
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
                <label className="form-label">Año *</label>
                <input
                  type="number"
                  className="form-input"
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                  min="2000"
                  max="2030"
                  required
                />
              </div>
            </div>
            <div className="form-row">
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
              <div className="form-group">
                <label className="form-label">Marca y Modelo *</label>
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
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Operación</h3>
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
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Estado *</label>
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
              />
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