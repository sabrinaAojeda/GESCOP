import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado para vehículos (Rodado y Maquinarias)
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
      documentos: []
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
    }
  ]);

  // Estado para personal
  const [personal, setPersonal] = useState([
    {
      id: 1,
      legajo: "1001",
      nombre: "Juan Pérez",
      dni: "30.123.456",
      sector: "Logística",
      cargo: "Chofer",
      estado: "Activo",
      licenciaVencimiento: "2024-08-15",
      telefono: "011-1234-5678",
      email: "juan.perez@empresa.com",
      documentos: []
    },
    {
      id: 2,
      legajo: "1002",
      nombre: "María García",
      dni: "29.987.654",
      sector: "Producción",
      cargo: "Operaria",
      estado: "Licencia",
      licenciaVencimiento: "2024-05-20",
      telefono: "011-8765-4321",
      email: "maria.garcia@empresa.com",
      documentos: []
    }
  ]);

  // Estado para sedes
  const [sedes, setSedes] = useState([
    {
      id: 1,
      codigo: "SED-001",
      nombre: "Sede Central",
      direccion: "Av. Principal 1234",
      localidad: "Capital",
      provincia: "Buenos Aires",
      telefono: "011-4567-8901",
      vehiculos: 8,
      estado: "Activa",
      contacto: "Carlos López",
      email: "sede.central@empresa.com",
      documentos: []
    },
    {
      id: 2,
      codigo: "SED-002",
      nombre: "Planta Industrial",
      direccion: "Ruta 8 Km 45",
      localidad: "Pilar",
      provincia: "Buenos Aires",
      telefono: "0230-456-789",
      vehiculos: 15,
      estado: "Activa",
      contacto: "Ana Martínez",
      email: "planta.pilar@empresa.com",
      documentos: []
    }
  ]);

  // Estado para proveedores
  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      codigo: "PROV-001",
      razonSocial: "YPF S.A.",
      cuit: "30-12345678-9",
      rubro: "Combustible",
      contacto: "Carlos Rodríguez",
      telefono: "011-4789-1234",
      email: "crodriguez@ypf.com",
      direccion: "Av. Energía 123",
      localidad: "Capital",
      provincia: "Buenos Aires",
      estado: "Activo",
      documentos: []
    },
    {
      id: 2,
      codigo: "PROV-002",
      razonSocial: "Neumáticos SRL",
      cuit: "30-98765432-1",
      rubro: "Neumáticos",
      contacto: "Ana López",
      telefono: "011-4123-4567",
      email: "alopez@neumaticos.com",
      direccion: "Calle Ruedas 456",
      localidad: "Avellaneda",
      provincia: "Buenos Aires",
      estado: "Activo",
      documentos: []
    }
  ]);

  // Estado para equipamiento
  const [equipamiento, setEquipamiento] = useState([
    {
      id: 1,
      codigo: "GPS-001",
      descripcion: "Sistema de Rastreo GPS",
      tipo: "GPS",
      vehiculoAsignado: "AB-123-CD",
      estado: "Operativo",
      ultimaRevision: "2024-02-15",
      proximaRevision: "2024-05-15",
      observaciones: "Funcionando correctamente"
    }
  ]);

  // Estado para vehículos vendidos
  const [vehiculosVendidos, setVehiculosVendidos] = useState([
    {
      id: 1,
      interno: "045",
      dominio: "MN-789-PQ",
      modelo: "Volkswagen Amarok",
      fechaVenta: "2024-01-15",
      comprador: "Empresa XYZ",
      precio: 25000000,
      estadoDocumentacion: "Completa"
    }
  ]);

  // Estados para modales
  const [modalAbierto, setModalAbierto] = useState(null);
  const [elementoEditando, setElementoEditando] = useState(null);
  const [tipoElemento, setTipoElemento] = useState('');

  // Funciones CRUD para vehículos
  const agregarVehiculo = (nuevoVehiculo) => {
    const id = Math.max(...vehiculos.map(v => v.id), 0) + 1;
    setVehiculos([...vehiculos, { ...nuevoVehiculo, id }]);
  };

  const editarVehiculo = (id, datosActualizados) => {
    setVehiculos(vehiculos.map(v => v.id === id ? { ...v, ...datosActualizados } : v));
  };

  const eliminarVehiculo = (id) => {
    setVehiculos(vehiculos.filter(v => v.id !== id));
  };

  // Funciones CRUD para personal
  const agregarPersonal = (nuevoPersonal) => {
    const id = Math.max(...personal.map(p => p.id), 0) + 1;
    setPersonal([...personal, { ...nuevoPersonal, id }]);
  };

  const editarPersonal = (id, datosActualizados) => {
    setPersonal(personal.map(p => p.id === id ? { ...p, ...datosActualizados } : p));
  };

  const eliminarPersonal = (id) => {
    setPersonal(personal.filter(p => p.id !== id));
  };

  // Funciones CRUD para sedes
  const agregarSede = (nuevaSede) => {
    const id = Math.max(...sedes.map(s => s.id), 0) + 1;
    setSedes([...sedes, { ...nuevaSede, id }]);
  };

  const editarSede = (id, datosActualizados) => {
    setSedes(sedes.map(s => s.id === id ? { ...s, ...datosActualizados } : s));
  };

  const eliminarSede = (id) => {
    setSedes(sedes.filter(s => s.id !== id));
  };

  // Funciones CRUD para proveedores
  const agregarProveedor = (nuevoProveedor) => {
    const id = Math.max(...proveedores.map(p => p.id), 0) + 1;
    setProveedores([...proveedores, { ...nuevoProveedor, id }]);
  };

  const editarProveedor = (id, datosActualizados) => {
    setProveedores(proveedores.map(p => p.id === id ? { ...p, ...datosActualizados } : p));
  };

  const eliminarProveedor = (id) => {
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  // Funciones para modales
  const abrirModal = (tipo, elemento = null) => {
    setModalAbierto(tipo);
    setElementoEditando(elemento);
    setTipoElemento(tipo.split('-')[1]); // 'editar-vehiculo' -> 'vehiculo'
  };

  const cerrarModal = () => {
    setModalAbierto(null);
    setElementoEditando(null);
    setTipoElemento('');
  };

  const value = {
    // Estados
    vehiculos,
    personal,
    sedes,
    proveedores,
    equipamiento,
    vehiculosVendidos,
    modalAbierto,
    elementoEditando,
    tipoElemento,
    
    // Funciones vehículos
    agregarVehiculo,
    editarVehiculo,
    eliminarVehiculo,
    
    // Funciones personal
    agregarPersonal,
    editarPersonal,
    eliminarPersonal,
    
    // Funciones sedes
    agregarSede,
    editarSede,
    eliminarSede,
    
    // Funciones proveedores
    agregarProveedor,
    editarProveedor,
    eliminarProveedor,
    
    // Funciones modales
    abrirModal,
    cerrarModal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};