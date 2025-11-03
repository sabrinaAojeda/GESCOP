export const mockVehiculos = [
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
      { id: 1, tipo: "Seguro", vencimiento: "2024-06-15", estado: "Vigente", archivo: "seguro_001.pdf" },
      { id: 2, tipo: "VTV", vencimiento: "2024-03-01", estado: "Vencido", archivo: "vtv_001.pdf" }
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
    documentos: [
      { id: 3, tipo: "Seguro", vencimiento: "2024-04-10", estado: "Por vencer", archivo: "seguro_002.pdf" }
    ]
  }
]

export const mockPersonal = [
  {
    id: 1,
    legajo: "1001",
    nombre: "Juan",
    apellido: "Pérez",
    dni: "30.123.456",
    sector: "Logística",
    cargo: "Chofer",
    telefono: "011-4567-8901",
    email: "juan.perez@empresa.com",
    licenciaVencimiento: "2024-08-15",
    estado: "Activo"
  },
  {
    id: 2,
    legajo: "1002",
    nombre: "María",
    apellido: "García",
    dni: "29.987.654",
    sector: "Producción",
    cargo: "Operaria",
    telefono: "011-4123-4567",
    email: "maria.garcia@empresa.com",
    licenciaVencimiento: "2024-05-20",
    estado: "Licencia"
  }
]

export const mockSedes = [
  {
    id: 1,
    codigo: "SED-001",
    nombre: "Sede Central",
    direccion: "Av. Principal 1234",
    localidad: "Capital",
    provincia: "Buenos Aires",
    telefono: "011-4567-8901",
    email: "sede.central@empresa.com",
    responsable: "Carlos López",
    estado: "Activa",
    vehiculosAsignados: 8
  },
  {
    id: 2,
    codigo: "SED-002",
    nombre: "Planta Industrial",
    direccion: "Ruta 8 Km 45",
    localidad: "Pilar",
    provincia: "Buenos Aires",
    telefono: "0230-456-789",
    email: "planta@empresa.com",
    responsable: "Ana Martínez",
    estado: "Activa",
    vehiculosAsignados: 15
  }
]

export const mockProveedores = [
  {
    id: 1,
    codigo: "PROV-001",
    razonSocial: "YPF S.A.",
    cuit: "30-12345678-9",
    rubro: "Combustible",
    contacto: "Carlos Rodríguez",
    telefono: "011-4789-1234",
    email: "crodriguez@ypf.com",
    direccion: "Av. Petrolera 123",
    estado: "Activo"
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
    direccion: "Calle Industrial 456",
    estado: "Activo"
  }
]