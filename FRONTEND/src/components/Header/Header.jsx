import React from 'react'
import { useLocation } from 'react-router-dom'
import TopHeader from './TopHeader'
import './Header.css'

const Header = () => {
  const location = useLocation()

  const getPageTitle = () => {
    const routes = {
      '/': 'Dashboard',
      '/rodado-maquinarias': 'Rodado y Maquinarias',
      '/listado-vehiculos': 'Listado de Vehículos',
      '/vehiculos-vendidos': 'Vehículos Vendidos',
      '/equipamiento-vehiculos': 'Equipamiento',
      '/personal': 'Personal',
      '/sedes': 'Sedes/Empresas',
      '/proveedores': 'Proveedores',
      '/reportes': 'Reportes',
      '/alertas': 'Alertas',
      '/configuracion': 'Configuración'
    }
    return routes[location.pathname] || 'Dashboard'
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="page-title">{getPageTitle()}</h1>
        <TopHeader />
      </div>
    </header>
  )
}

export default Header