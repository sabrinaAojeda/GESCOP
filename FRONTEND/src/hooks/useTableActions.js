import { useApp } from '../context/AppContext';

export const useTableActions = () => {
  const { 
    abrirModal, 
    eliminarVehiculo, 
    eliminarPersonal,
    eliminarSede,
    eliminarProveedor,
    vehiculos,
    personal,
    sedes,
    proveedores
  } = useApp();

  // Función para manejar acciones de tablas
  const manejarAccion = (tipo, accion, id, elemento = null) => {
    const elementoCompleto = elemento || obtenerElementoPorId(tipo, id);
    
    switch (accion) {
      case 'ver':
        abrirModal(`ver-${tipo}`, elementoCompleto);
        break;
      case 'editar':
        abrirModal(`editar-${tipo}`, elementoCompleto);
        break;
      case 'documentacion':
        abrirModal(`documentacion-${tipo}`, elementoCompleto);
        break;
      case 'eliminar':
        if (window.confirm('¿Está seguro de eliminar este elemento?')) {
          eliminarElemento(tipo, id);
        }
        break;
      default:
        console.warn('Acción no reconocida:', accion);
    }
  };

  // Obtener elemento por ID según tipo
  const obtenerElementoPorId = (tipo, id) => {
    switch (tipo) {
      case 'vehiculo':
        return vehiculos.find(v => v.id === id);
      case 'personal':
        return personal.find(p => p.id === id);
      case 'sede':
        return sedes.find(s => s.id === id);
      case 'proveedor':
        return proveedores.find(pr => pr.id === id);
      default:
        return null;
    }
  };

  // Eliminar elemento según tipo
  const eliminarElemento = (tipo, id) => {
    switch (tipo) {
      case 'vehiculo':
        eliminarVehiculo(id);
        break;
      case 'personal':
        eliminarPersonal(id);
        break;
      case 'sede':
        eliminarSede(id);
        break;
      case 'proveedor':
        eliminarProveedor(id);
        break;
      default:
        console.warn('Tipo no reconocido para eliminar:', tipo);
    }
  };

  // Generar botones de acciones para tablas
  const generarBotonesAcciones = (tipo, id, elemento = null) => {
    return (
      <div className="action-buttons">
        <button 
          className="icon-btn" 
          title="Ver"
          onClick={() => manejarAccion(tipo, 'ver', id, elemento)}
        >
          👁️
        </button>
        <button 
          className="icon-btn" 
          title="Editar"
          onClick={() => manejarAccion(tipo, 'editar', id, elemento)}
        >
          ✏️
        </button>
        <button 
          className="icon-btn" 
          title="Documentación"
          onClick={() => manejarAccion(tipo, 'documentacion', id, elemento)}
        >
          📄
        </button>
        <button 
          className="icon-btn" 
          title="Eliminar"
          onClick={() => manejarAccion(tipo, 'eliminar', id, elemento)}
        >
          🗑️
        </button>
      </div>
    );
  };

  return {
    manejarAccion,
    generarBotonesAcciones
  };
};