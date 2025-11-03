import { useState, useMemo } from 'react'

export const useFiltros = (datos) => {
  const [filtros, setFiltros] = useState({
    buscar: '',
    sector: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  })

  const datosFiltrados = useMemo(() => {
    let resultado = datos

    // Filtro de búsqueda general
    if (filtros.buscar) {
      const busqueda = filtros.buscar.toLowerCase()
      resultado = resultado.filter(item =>
        Object.values(item).some(valor =>
          String(valor).toLowerCase().includes(busqueda)
        )
      )
    }

    // Filtro por sector
    if (filtros.sector) {
      resultado = resultado.filter(item => item.sector === filtros.sector)
    }

    // Filtro por estado
    if (filtros.estado) {
      resultado = resultado.filter(item => item.estado === filtros.estado)
    }

    // Filtro por fechas
    if (filtros.fechaDesde) {
      resultado = resultado.filter(item => 
        !item.fechaVencimiento || item.fechaVencimiento >= filtros.fechaDesde
      )
    }

    if (filtros.fechaHasta) {
      resultado = resultado.filter(item => 
        !item.fechaVencimiento || item.fechaVencimiento <= filtros.fechaHasta
      )
    }

    return resultado
  }, [datos, filtros])

  const actualizarFiltro = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }))
  }

  const limpiarFiltros = () => {
    setFiltros({
      buscar: '',
      sector: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: ''
    })
  }

  return {
    filtros,
    datosFiltrados,
    actualizarFiltro,
    limpiarFiltros
  }
}