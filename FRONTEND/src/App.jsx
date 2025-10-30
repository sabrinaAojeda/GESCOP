import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import TopHeader from "./components/Header/TopHeader";
import Dashboard from "./pages/Dashboard/Dashboard";
import RodadoMaquinarias from "./pages/flota/RodadoMaquinarias/RodadoMaquinarias";
import ListadoVehiculos from "./pages/flota/ListadoVehiculos/ListadoVehiculos";
import EquipamientoVehiculos from "./pages/flota/EquipamientoVehiculos/EquipamientoVehiculos";
import VehiculosVendidos from "./pages/flota/VehiculosVendidos/VehiculosVendidos";
import Personal from "./pages/Personal/Personal";
import Proveedores from "./pages/Proveedores/Proveedores";
import Sedes from "./pages/Sedes/Sedes";
import Reportes from "./pages/Reportes/Reportes";
import Configuracion from "./pages/Configuracion/Configuracion";
import Alertas from "./pages/Alertas/Alertas";
import Login from "./pages/Login/Login";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('gesdoc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('gesdoc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gesdoc_user');
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

return (
  <div className="App">
    {user ? (
      <div className="app-container">
        <Sidebar onLogout={handleLogout} currentUser={user} />
        <div className="main-content">
          <TopHeader user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flota/rodado-maquinarias" element={<RodadoMaquinarias />} />
            <Route path="/flota/listado-vehiculos" element={<ListadoVehiculos />} />
            <Route path="/flota/vehiculos-vendidos" element={<VehiculosVendidos />} />
            <Route path="/flota/equipamiento" element={<EquipamientoVehiculos />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/sedes" element={<Sedes />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </div>
      </div>
    ) : (
      <Login onLogin={handleLogin} />
    )}
  </div>
);
}

export default App