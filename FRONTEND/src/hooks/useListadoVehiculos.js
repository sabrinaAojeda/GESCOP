// src/hooks/useListadoVehiculos.js
import { useState, useEffect } from 'react'

export const useListadoVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVehiculos = async () => {
      try {
        setLoading(true)
        // Simulamos datos mock basados en la estructura del backend
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              interno: "001",
              año: 2023,
              dominio: "AB-123-CD",
              modelo: "Toyota Hilux SRV",
              eq_incorporado: "GPS, Radio",
              sector: "Logística",
              chofer: "Juan Pérez",
              estado: "Activo",
              observaciones: "Nuevo ingreso",
              vtv_vencimiento: "2024-06-15",
              vtv_estado: "Vigente",
              hab_vencimiento: "2024-12-20",
              hab_estado: "Vigente",
              seguro_vencimiento: "2024-05-30",
              tipo: "Rodado",
              documentos: [
                { 
                  id: 1, 
                  tipo: "Seguro", 
                  vencimiento: "2024-06-15", 
                  estado: "Vigente", 
                  archivo: "seguro_001.pdf" 
                }
              ]
            },
            {
              id: 2,
              interno: "002",
              año: 2022,
              dominio: "EF-456-GH",
              modelo: "Ford Ranger XLT",
              eq_incorporado: "Radio",
              sector: "Producción",
              chofer: "",
              estado: "Mantenimiento",
              observaciones: "En taller por reparación",
              vtv_vencimiento: "2024-04-10",
              vtv_estado: "Por vencer",
              hab_vencimiento: "2024-08-15",
              hab_estado: "Vigente",
              seguro_vencimiento: "2024-07-20",
              tipo: "Rodado",
              documentos: []
            },
            {
              id: 3,
              interno: "003",
              año: 2021,
              dominio: "IJ-789-KL",
              modelo: "Mercedes-Benz Sprinter",
              eq_incorporado: "GPS, Radio, Cámara",
              sector: "Logística",
              chofer: "María García",
              estado: "Activo",
              observaciones: "",
              vtv_vencimiento: "2024-03-01",
              vtv_estado: "Vencido",
              hab_vencimiento: "2024-09-30",
              hab_estado: "Vigente",
              seguro_vencimiento: "2024-08-15",
              tipo: "Rodado",
              documentos: [
                { 
                  id: 3, 
                  tipo: "Seguro", 
                  vencimiento: "2024-09-30", 
                  estado: "Vigente", 
                  archivo: "seguro_003.pdf" 
                }
              ]
            },
            {
              id: 4,
              interno: "M001",
              año: 2020,
              dominio: "MA-001-AA",
              modelo: "Cargadora CAT 926M",
              eq_incorporado: "GPS, Balde",
              sector: "Producción",
              chofer: "Carlos López",
              estado: "Activo",
              observaciones: "Máquina principal",
              vtv_vencimiento: "",
              vtv_estado: "No requiere",
              hab_vencimiento: "2024-11-30",
              hab_estado: "Vigente",
              seguro_vencimiento: "2024-10-15",
              tipo: "Maquinaria",
              documentos: []
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