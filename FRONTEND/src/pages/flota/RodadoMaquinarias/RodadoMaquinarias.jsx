import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTableActions } from '../../../hooks/useTableActions';

const RodadoMaquinarias = () => {
  const { manejarAccion , generarBotonesAcciones} = useTableActions();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos de ejemplo
    const sampleVehicles = [
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
        seguroCargas: "No requiere"
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
        seguroCargas: "No requiere"
      }
    ];

    setVehicles(sampleVehicles);
    setLoading(false);
  }, []);

  const getEstadoClass = (estado) => {
    if (!estado) return '';
    switch(estado.toLowerCase()) {
      case 'activo':
      case 'vigente':
        return 'status-active';
      case 'por vencer':
      case 'mantenimiento':
        return 'status-warning';
      case 'vencido':
      case 'inactivo':
        return 'status-expired';
      default:
        return '';
    }
  };

  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-AR');
    } catch (e) {
      return fechaString;
    }
  };

  if (loading) {
    return <div>Cargando vehículos...</div>;
  }

  return (
    <div id="rodado-maquinarias-page" className="page active">
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link> 
        <Link to="/flota">Flota Vehicular</Link>  
        <span>Rodado y Maquinarias</span>
      </div>

      <section className="data-section">
        <div className="section-header">
          <h2 className="section-title">🚛 Rodado y Maquinarias</h2>
          <div className="table-toolbar">
            <div className="column-selector">
              <button className="btn btn-secondary">
                <span>👁️</span> Columnas
              </button>
              <div className="column-selector-content">
                <div className="column-group">
                  <div className="column-group-title">Información Básica</div>
                  <label className="column-option">
                    <input type="checkbox" defaultChecked disabled /> Interno
                  </label>
                  <label className="column-option">
                    <input type="checkbox" defaultChecked disabled /> Año
                  </label>
                  <label className="column-option">
                    <input type="checkbox" defaultChecked disabled /> Dominio
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-secondary">
              <span>📤</span> Exportar
            </button>
            <button className="btn btn-primary">
              <span>+</span> Nuevo Vehículo
            </button>
          </div>
        </div>

        <div className="filter-bar">
          <input type="text" className="filter-select" placeholder="Buscar..." />
          <select className="filter-select">
            <option value="">Todos los sectores</option>
            <option value="Logística">Logística</option>
            <option value="Producción">Producción</option>
            <option value="Administración">Administración</option>
          </select>
          <select className="filter-select">
            <option value="">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>INT.</th>
              <th>AÑO</th>
              <th>DOMINIO</th>
              <th>MODELO</th>
              <th>EQ. INCORPORADO</th>
              <th>SECTOR</th>
              <th>CHOFER</th>
              <th>ESTADO</th>
              <th>OBSERVACIONES</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.interno}</td>
                <td>{vehicle.anio}</td>
                <td>{vehicle.dominio}</td>
                <td>{vehicle.modelo}</td>
                <td>{vehicle.eqIncorporado}</td>
                <td>{vehicle.sector}</td>
                <td>{vehicle.chofer || 'No asignado'}</td>
                <td>
                  <span className={`status-badge ${getEstadoClass(vehicle.estado)}`}>
                    {vehicle.estado}
                  </span>
                </td>
                <td>{vehicle.observaciones || '-'}</td>
                <td>
                  {generarBotonesAcciones('vehiculo', vehicle.id, vehicle, manejarAccion)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contador">Mostrando {vehicles.length} vehículos</div>
      </section>
    </div>
  );
};

export default RodadoMaquinarias;