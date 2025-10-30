// Datos idénticos al prototipo ALINGRESARPAGINA.txt
export const vehiculosData = [
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
      { 
        id: 1, 
        tipo: "Seguro", 
        vencimiento: "2024-06-15", 
        estado: "Vigente", 
        archivo: "seguro_001.pdf" 
      },
      { 
        id: 2, 
        tipo: "VTV", 
        vencimiento: "2024-03-01", 
        estado: "Vencido", 
        archivo: "vtv_001.pdf" 
      }
    ]
  }
  // ... más vehículos idénticos al prototipo
];

export const personalData = [
  {
    id: 1,
    legajo: "1001",
    nombre: "Juan Pérez",
    dni: "30.123.456",
    sector: "Logística",
    cargo: "Chofer",
    estado: "Activo",
    licenciaVencimiento: "2024-08-15"
  }
  // ... más personal
];

export const alertasData = [
  {
    id: 1,
    tipo: "Vencimiento",
    mensaje: "Seguro del vehículo AB-123-CD vence en 3 días",
    elemento: "AB-123-CD",
    fecha: "2024-03-12",
    nivel: "Alto"
  }
  // ... más alertas
];