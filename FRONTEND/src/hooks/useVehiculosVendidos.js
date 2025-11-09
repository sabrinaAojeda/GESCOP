// src/hooks/useVehiculosVendidos.js
import { useState, useEffect } from 'react'

export const useVehiculosVendidos = () => {
  const [vehiculosVendidos, setVehiculosVendidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVehiculosVendidos = async () => {
      try {
        setLoading(true)
        // Simulamos datos mock basados en la estructura del backend
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              interno: "001",
              dominio: "AB-123-CD",
              marca_modelo: "Toyota Hilux SRV 2020",
              fecha_venta: "2024-01-15",
              comprador: "Empresa XYZ S.A.",
              precio: 15000000,
              estado_documentacion: "Completa",
              kilometraje_venta: 85000,
              observaciones: "Venta con entrega inmediata",
              documentos: [
                { 
                  id: 1, 
                  tipo: "Contrato de Venta", 
                  vencimiento: "", 
                  estado: "Completo", 
                  archivo: "contrato_001.pdf" 
                },
                { 
                  id: 2, 
                  tipo: "Transferencia", 
                  vencimiento: "", 
                  estado: "Completo", 
                  archivo: "transferencia_001.pdf" 
                }
              ]
            },
            {
              id: 2,
              interno: "002",
              dominio: "EF-456-GH",
              marca_modelo: "Ford Ranger XLT 2019",
              fecha_venta: "2024-02-20",
              comprador: "Transportes ABC",
              precio: 12000000,
              estado_documentacion: "En trámite",
              kilometraje_venta: 120000,
              observaciones: "Esperando firma de contrato",
              documentos: [
                { 
                  id: 3, 
                  tipo: "Contrato de Venta", 
                  vencimiento: "", 
                  estado: "Pendiente", 
                  archivo: "contrato_002.pdf" 
                }
              ]
            },
            {
              id: 3,
              interno: "003",
              dominio: "IJ-789-KL",
              marca_modelo: "Mercedes-Benz Sprinter 2021",
              fecha_venta: "2023-12-10",
              comprador: "Logística Rápida S.R.L.",
              precio: 18000000,
              estado_documentacion: "Completa",
              kilometraje_venta: 65000,
              observaciones: "",
              documentos: []
            },
            {
              id: 4,
              interno: "M001",
              dominio: "MA-001-AA",
              marca_modelo: "Cargadora CAT 926M 2018",
              fecha_venta: "2024-03-05",
              comprador: "Construcciones Norte",
              precio: 25000000,
              estado_documentacion: "Incompleta",
              kilometraje_venta: 4500,
              observaciones: "Falta documentación de habilitación",
              documentos: []
            }
          ]
          setVehiculosVendidos(mockData)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadVehiculosVendidos()
  }, [])

  const agregarVehiculoVendido = (nuevoVehiculo) => {
    const vehiculoConId = {
      ...nuevoVehiculo,
      id: Date.now(),
      documentos: []
    }
    setVehiculosVendidos(prev => [...prev, vehiculoConId])
  }

  const actualizarVehiculoVendido = (id, datosActualizados) => {
    setVehiculosVendidos(prev => prev.map(v => v.id === id ? { ...v, ...datosActualizados } : v))
  }

  const eliminarVehiculoVendido = (id) => {
    setVehiculosVendidos(prev => prev.filter(v => v.id !== id))
  }

  return {
    vehiculosVendidos,
    loading,
    error,
    agregarVehiculoVendido,
    actualizarVehiculoVendido,
    eliminarVehiculoVendido
  }
}