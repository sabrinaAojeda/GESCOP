// src/hooks/useEquipamientos.js
import { useState, useEffect } from 'react'

export const useEquipamientos = () => {
  const [equipamientos, setEquipamientos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadEquipamientos = async () => {
      try {
        setLoading(true)
        // Simulamos datos mock basados en la estructura del backend
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              codigo: "GPS-001",
              descripcion: "Sistema de Posicionamiento Global Garmin",
              tipo: "Navegación",
              vehiculo_asignado: "AB-123-CD",
              estado: "Operativo",
              ultima_revision: "2024-01-15",
              proxima_revision: "2024-07-15",
              observaciones: "Funcionando correctamente",
              documentos: [
                { 
                  id: 1, 
                  tipo: "Manual de Usuario", 
                  vencimiento: "", 
                  estado: "Vigente", 
                  archivo: "manual_gps_001.pdf" 
                }
              ]
            },
            {
              id: 2,
              codigo: "RAD-002",
              descripcion: "Radio VHF Motorola",
              tipo: "Comunicación",
              vehiculo_asignado: "EF-456-GH",
              estado: "Mantenimiento",
              ultima_revision: "2024-02-20",
              proxima_revision: "2024-08-20",
              observaciones: "En reparación por falla en transmisión",
              documentos: []
            },
            {
              id: 3,
              codigo: "CAM-003",
              descripcion: "Cámara de Reversa HD",
              tipo: "Seguridad",
              vehiculo_asignado: "IJ-789-KL",
              estado: "Operativo",
              ultima_revision: "2024-03-10",
              proxima_revision: "2024-09-10",
              observaciones: "",
              documentos: [
                { 
                  id: 2, 
                  tipo: "Certificado de Calibración", 
                  vencimiento: "2024-09-10", 
                  estado: "Vigente", 
                  archivo: "certificado_cam_003.pdf" 
                }
              ]
            },
            {
              id: 4,
              codigo: "TAC-004",
              descripcion: "Tacógrafo Digital",
              tipo: "Control",
              vehiculo_asignado: "",
              estado: "Almacenado",
              ultima_revision: "2023-12-01",
              proxima_revision: "2024-06-01",
              observaciones: "Disponible para asignar",
              documentos: []
            },
            {
              id: 5,
              codigo: "EXT-005",
              descripcion: "Extintor 5kg ABC",
              tipo: "Seguridad",
              vehiculo_asignado: "MA-001-AA",
              estado: "Vencido",
              ultima_revision: "2023-06-15",
              proxima_revision: "2024-01-15",
              observaciones: "Requiere recarga urgente",
              documentos: []
            }
          ]
          setEquipamientos(mockData)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    loadEquipamientos()
  }, [])

  const agregarEquipamiento = (nuevoEquipamiento) => {
    const equipamientoConId = {
      ...nuevoEquipamiento,
      id: Date.now(),
      documentos: []
    }
    setEquipamientos(prev => [...prev, equipamientoConId])
  }

  const actualizarEquipamiento = (id, datosActualizados) => {
    setEquipamientos(prev => prev.map(e => e.id === id ? { ...e, ...datosActualizados } : e))
  }

  const eliminarEquipamiento = (id) => {
    setEquipamientos(prev => prev.filter(e => e.id !== id))
  }

  return {
    equipamientos,
    loading,
    error,
    agregarEquipamiento,
    actualizarEquipamiento,
    eliminarEquipamiento
  }
}