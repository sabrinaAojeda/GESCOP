import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      interno: "001",
      anio: 2023,
      dominio: "AB-123-CD",
      modelo: "Toyota Hilux SRV",
      eqIncorporado: "GPS, Radio",
      sector: "Logística",
      chofer: "Juan Pérez",
      estado: "Activo",
      observaciones: "Nuevo ingreso",
      vtvVencimiento: "2024-06-15",
      vtvEstado: "Vigente",
      habilitacionVencimiento: "2024-12-20",
      habilitacionEstado: "Vigente",
      tipoSeguro: "Todo Riesgo",
      seguroTecnico: "Vigente",
      seguroCargas: "No requiere",
      documentos: [
        { tipo: "Seguro", vencimiento: "2024-06-15", estado: "Vigente", archivo: "seguro_001.pdf" },
        { tipo: "VTV", vencimiento: "2024-03-01", estado: "Vencido", archivo: "vtv_001.pdf" }
      ]
    }
  ])

  const [columnasVisibles, setColumnasVisibles] = useState({
    'interno': true,
    'anio': true,
    'dominio': true,
    'modelo': true,
    'eq-incorporado': false,
    'sector': true,
    'chofer': false,
    'estado': true,
    'observaciones': false,
    'vtv-vencimiento': false,
    'vtv-ev': false,
    'habilitacion-vencimiento': false,
    'habilitacion-eh': false,
    'tipo-seguro': false,
    'seguro-tecnico': false,
    'seguro-cargas': false
  })

  const agregarVehiculo = (nuevoVehiculo) => {
    setVehiculos(prev => [...prev, { ...nuevoVehiculo, id: Date.now() }])
  }

  const actualizarVehiculo = (id, datosActualizados) => {
    setVehiculos(prev => prev.map(v => v.id === id ? { ...v, ...datosActualizados } : v))
  }

  const eliminarVehiculo = (id) => {
    setVehiculos(prev => prev.filter(v => v.id !== id))
  }

  const toggleColumna = (columna) => {
    setColumnasVisibles(prev => ({
      ...prev,
      [columna]: !prev[columna]
    }))
  }

  const value = {
    vehiculos,
    columnasVisibles,
    agregarVehiculo,
    actualizarVehiculo,
    eliminarVehiculo,
    toggleColumna
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}