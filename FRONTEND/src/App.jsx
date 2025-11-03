import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import RodadoMaquinarias from './pages/flota/RodadoMaquinarias/RodadoMaquinarias'
import ListadoVehiculos from './pages/flota/ListadoVehiculos/ListadoVehiculos'
import VehiculosVendidos from './pages/flota/VehiculosVendidos/VehiculosVendidos'
import EquipamientoVehiculos from './pages/flota/EquipamientoVehiculos/EquipamientoVehiculos'
import Personal from './pages/Personal/Personal'
import Sedes from './pages/Sedes/Sedes'
import Proveedores from './pages/Proveedores/Proveedores'
import Reportes from './pages/Reportes/Reportes'
import Alertas from './pages/Alertas/Alertas'
import Configuration from './pages/Configuration/Configuration'
import { AppProvider } from './context/AppContext'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rodado-maquinarias" element={<RodadoMaquinarias />} />
            <Route path="listado-vehiculos" element={<ListadoVehiculos />} />
            <Route path="vehiculos-vendidos" element={<VehiculosVendidos />} />
            <Route path="equipamiento-vehiculos" element={<EquipamientoVehiculos />} />
            <Route path="personal" element={<Personal />} />
            <Route path="sedes" element={<Sedes />} />
            <Route path="proveedores" element={<Proveedores />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="alertas" element={<Alertas />} />
            <Route path="configuracion" element={<Configuration />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App