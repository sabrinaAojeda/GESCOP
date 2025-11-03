import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import './MainLayout.css'

const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout