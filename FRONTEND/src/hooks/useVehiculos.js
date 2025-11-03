import { useState, useEffect } from 'react'

export const useVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simular carga de datos
    const loadVehiculos = async () => {
      try {
        setLoading(true)
        // En una implementación real, esto sería una llamada a la API
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
              seguroCargas: "No requiere"
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
    setVehiculos(prev => [...prev, { ...nuevoVehiculo, id: Date.now() }])
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