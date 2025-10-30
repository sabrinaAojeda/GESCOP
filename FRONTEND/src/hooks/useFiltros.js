import { useState, useMemo } from 'react';

export const useFiltros = (datos, columnasConfig) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    filtrosEspecificos: {}
  });

  const [columnasVisibles, setColumnasVisibles] = useState(
    columnasConfig.reduce((acc, col) => {
      acc[col.key] = col.visible !== false;
      return acc;
    }, {})
  );

  // Aplicar filtros a los datos
  const datosFiltrados = useMemo(() => {
    return datos.filter(item => {
      // Filtro de búsqueda general
      const coincideBusqueda = !filtros.busqueda || 
        Object.values(item).some(valor => 
          String(valor).toLowerCase().includes(filtros.busqueda.toLowerCase())
        );

      // Filtros específicos por columna
      const coincideFiltrosEspecificos = Object.entries(filtros.filtrosEspecificos).every(([key, valor]) => {
        if (!valor) return true;
        return String(item[key]).toLowerCase().includes(String(valor).toLowerCase());
      });

      return coincideBusqueda && coincideFiltrosEspecificos;
    });
  }, [datos, filtros]);

  // Manejar cambio en búsqueda general
  const manejarBusqueda = (valor) => {
    setFiltros(prev => ({
      ...prev,
      busqueda: valor
    }));
  };

  // Manejar cambio en filtros específicos
  const manejarFiltroEspecifico = (columna, valor) => {
    setFiltros(prev => ({
      ...prev,
      filtrosEspecificos: {
        ...prev.filtrosEspecificos,
        [columna]: valor
      }
    }));
  };

  // Manejar visibilidad de columnas
  const toggleColumna = (columnaKey) => {
    setColumnasVisibles(prev => ({
      ...prev,
      [columnaKey]: !prev[columnaKey]
    }));
  };

  return {
    datosFiltrados,
    filtros,
    columnasVisibles,
    manejarBusqueda,
    manejarFiltroEspecifico,
    toggleColumna,
    cantidadFiltrados: datosFiltrados.length,
    cantidadTotal: datos.length
  };
};