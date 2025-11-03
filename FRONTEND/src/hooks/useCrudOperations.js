import { useState } from 'react'

export const useCrudOperations = (initialData = []) => {
  const [datos, setDatos] = useState(initialData)
  const [itemEditando, setItemEditando] = useState(null)

  const crear = (nuevoItem) => {
    const itemConId = {
      ...nuevoItem,
      id: Date.now()
    }
    setDatos(prev => [...prev, itemConId])
    return itemConId
  }

  const leer = (id) => {
    return datos.find(item => item.id === id)
  }

  const actualizar = (id, datosActualizados) => {
    setDatos(prev => prev.map(item => 
      item.id === id ? { ...item, ...datosActualizados } : item
    ))
  }

  const eliminar = (id) => {
    setDatos(prev => prev.filter(item => item.id !== id))
  }

  const comenzarEdicion = (id) => {
    const item = leer(id)
    setItemEditando(item)
    return item
  }

  const cancelarEdicion = () => {
    setItemEditando(null)
  }

  const guardarEdicion = (datosActualizados) => {
    if (itemEditando) {
      actualizar(itemEditando.id, datosActualizados)
      setItemEditando(null)
    }
  }

  return {
    datos,
    itemEditando,
    crear,
    leer,
    actualizar,
    eliminar,
    comenzarEdicion,
    cancelarEdicion,
    guardarEdicion
  }
}