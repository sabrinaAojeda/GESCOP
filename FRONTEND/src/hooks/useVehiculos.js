// src/hooks/useVehiculos.js
import { useState, useEffect } from 'react'

export const useVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVehiculos = async () => {
      try {
        setLoading(true)
        setTimeout(() => {
          const mockData = [
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
                { 
                  id: 1, 
                  tipo: "Seguro", 
                  vencimiento: "2024-06-15", 
                  estado: "Vigente", 
                  archivo: "seguro_001.pdf" 
                },
                { 
                  id: 2, 
                  tipo: "VTV", 
                  vencimiento: "2024-03-01", 
                  estado: "Vencido", 
                  archivo: "vtv_001.pdf" 
                }
              ]
            },
            {
              id: 2,
              interno: "002",
              anio: 2022,
              dominio: "EF-456-GH",
              modelo: "Ford Ranger XLT",
              eqIncorporado: "Radio",
              sector: "Producción",
              chofer: "",
              estado: "Mantenimiento",
              observaciones: "En taller por reparación",
              vtvVencimiento: "2024-04-10",
              vtvEstado: "Por vencer",
              habilitacionVencimiento: "2024-08-15",
              habilitacionEstado: "Vigente",
              tipoSeguro: "Terceros Completo",
              seguroTecnico: "Vigente",
              seguroCargas: "No requiere",
              documentos: []
            },
            {
              id: 3,
              interno: "003",
              anio: 2021,
              dominio: "IJ-789-KL",
              modelo: "Mercedes-Benz Sprinter",
              eqIncorporado: "GPS, Radio, Cámara",
              sector: "Logística",
              chofer: "María García",
              estado: "Activo",
              observaciones: "",
              vtvVencimiento: "2024-03-01",
              vtvEstado: "Vencido",
              habilitacionVencimiento: "2024-09-30",
              habilitacionEstado: "Vigente",
              tipoSeguro: "Todo Riesgo",
              seguroTecnico: "Vigente",
              seguroCargas: "Vigente",
              documentos: [
                { 
                  id: 3, 
                  tipo: "Seguro", 
                  vencimiento: "2024-09-30", 
                  estado: "Vigente", 
                  archivo: "seguro_003.pdf" 
                }
              ]
            }
          ]
          setVehiculos(mockData)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadVehiculos()
  }, [])

  const agregarVehiculo = (nuevoVehiculo) => {
    const vehiculoConId = {
      ...nuevoVehiculo,
      id: Date.now(),
      documentos: []
    }
    setVehiculos(prev => [...prev, vehiculoConId])
  }

  const actualizarVehiculo = (id, datosActualizados) => {
    setVehiculos(prev => prev.map(v => v.id === id ? { ...v, ...datosActualizados } : v))
  }

  const eliminarVehiculo = (id) => {
    setVehiculos(prev => prev.filter(v => v.id !== id))
  }

  return {
    vehiculos,
    loading,
    error,
    agregarVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
  }
}