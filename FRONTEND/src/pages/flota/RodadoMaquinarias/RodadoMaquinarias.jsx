import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RodedoTable from '../../../components/Sidebar/RodedoTable'
import ColumnSelector from '../../../components/Common/Columns/ColumnSelector'
import ModalVehiculo from '../../../components/Common/ModalVehiculo'
import ModalVerVehiculo from '../../../components/Common/ModalVerVehiculo'
import './RodadoMaquinarias.css'

const RodadoMaquinarias = () => {
  const [showNuevoVehiculo, setShowNuevoVehiculo] = useState(false)
  const [showVerVehiculo, setShowVerVehiculo] = useState(false)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null)

  const handleVerVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo)
    setShowVerVehiculo(true)
  }

  return (
    <div className="rodado-maquinarias-page">
      <div className="breadcrumb">
        <Link to="/">Dashboard</Link> 
        <Link to="/rodado-maquinarias">Flota Vehicular</Link> 
        <span>Rodado y Maquinarias</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
          <div className="table-toolbar">
            <ColumnSelector />
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowNuevoVehiculo(true)}
            >
              <span>+</span> Nuevo Vehículo
            </button>
          </div>
        </div>

        <RodedoTable onVerVehiculo={handleVerVehiculo} />
      </section>

      {/* Modales */}
      {showNuevoVehiculo && (
        <ModalVehiculo 
          mode="crear"
          onClose={() => setShowNuevoVehiculo(false)}
        />
      )}

      {showVerVehiculo && vehiculoSeleccionado && (
        <ModalVerVehiculo 
          vehiculo={vehiculoSeleccionado}
          onClose={() => setShowVerVehiculo(false)}
        />
      )}
    </div>
  )
}

export default RodadoMaquinarias