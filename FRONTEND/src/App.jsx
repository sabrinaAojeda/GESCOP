import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import RodadoMaquinarias from './pages/flota/RodadoMaquinarias/RodadoMaquinarias';
import ListadoVehiculos from './pages/flota/ListadoVehiculos/ListadoVehiculos';
import VehiculosVendidos from './pages/flota/VehiculosVendidos/VehiculosVendidos';
import EquipamientoVehiculos from './pages/flota/EquipamientoVehiculos/EquipamientoVehiculos';
import Personal from './pages/Personal/Personal';
import Sedes from './pages/Sedes/Sedes';
import Proveedores from './pages/Proveedores/Proveedores';
import Reportes from './pages/Reportes/Reportes';
import Alertas from './pages/Alertas/Alertas';
import Configuration from './pages/Configuration/Configuration';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="flota/rodado-maquinarias" element={<RodadoMaquinarias />} />
              <Route path="flota/listado-vehiculos" element={<ListadoVehiculos />} />
              <Route path="flota/vehiculos-vendidos" element={<VehiculosVendidos />} />
              <Route path="flota/equipamiento-vehiculos" element={<EquipamientoVehiculos />} />
              <Route path="personal" element={<Personal />} />
              <Route path="sedes" element={<Sedes />} />
              <Route path="proveedores" element={<Proveedores />} />
              <Route path="reportes" element={<Reportes />} />
              <Route path="alertas" element={<Alertas />} />
              <Route path="configuracion" element={<Configuration />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;