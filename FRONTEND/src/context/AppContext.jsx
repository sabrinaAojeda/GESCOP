import React, { createContext, useContext, useState, useEffect } from 'react';
import { vehiculosData, personalData, alertasData } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado idéntico al prototipo
  const [vehiculos, setVehiculos] = useState(vehiculosData);
  const [personal, setPersonal] = useState(personalData);
  const [alertas, setAlertas] = useState(alertasData);
  const [paginaActual, setPaginaActual] = useState('dashboard');
  const [menuFlotaExpandido, setMenuFlotaExpandido] = useState(false);
  
  // Columnas visibles - idéntico al prototipo
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
  });

  // Modales
  const [modalNuevoVehiculo, setModalNuevoVehiculo] = useState(false);
  const [modalVerVehiculo, setModalVerVehiculo] = useState(false);
  const [modalEditarVehiculo, setModalEditarVehiculo] = useState(false);
  const [modalDocumentacion, setModalDocumentacion] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  // Funciones idénticas al prototipo
  const agregarVehiculo = (nuevoVehiculo) => {
    const vehiculoConId = {
      ...nuevoVehiculo,
      id: Math.max(...vehiculos.map(v => v.id)) + 1,
      documentos: []
    };
    setVehiculos([...vehiculos, vehiculoConId]);
  };

  const editarVehiculo = (id, datosActualizados) => {
    setVehiculos(vehiculos.map(vehiculo => 
      vehiculo.id === id ? { ...vehiculo, ...datosActualizados } : vehiculo
    ));
  };

  const eliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id));
  };

  const toggleColumna = (columna) => {
    setColumnasVisibles(prev => ({
      ...prev,
      [columna]: !prev[columna]
    }));
  };

  const abrirModalNuevoVehiculo = () => {
    setModalNuevoVehiculo(true);
    setVehiculoSeleccionado(null);
  };

  const abrirModalVerVehiculo = (vehiculo) => {
    setModalVerVehiculo(true);
    setVehiculoSeleccionado(vehiculo);
  };

  const abrirModalEditarVehiculo = (vehiculo) => {
    setModalEditarVehiculo(true);
    setVehiculoSeleccionado(vehiculo);
  };

  const abrirModalDocumentacion = (vehiculo) => {
    setModalDocumentacion(true);
    setVehiculoSeleccionado(vehiculo);
  };

  const cerrarModales = () => {
    setModalNuevoVehiculo(false);
    setModalVerVehiculo(false);
    setModalEditarVehiculo(false);
    setModalDocumentacion(false);
    setVehiculoSeleccionado(null);
  };

  const value = {
    // Estado
    vehiculos,
    personal,
    alertas,
    paginaActual,
    menuFlotaExpandido,
    columnasVisibles,
    modalNuevoVehiculo,
    modalVerVehiculo,
    modalEditarVehiculo,
    modalDocumentacion,
    vehiculoSeleccionado,
    
    // Setters
    setPaginaActual,
    setMenuFlotaExpandido,
    setColumnasVisibles,
    
    // Funciones
    agregarVehiculo,
    editarVehiculo,
    eliminarVehiculo,
    toggleColumna,
    abrirModalNuevoVehiculo,
    abrirModalVerVehiculo,
    abrirModalEditarVehiculo,
    abrirModalDocumentacion,
    cerrarModales
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};