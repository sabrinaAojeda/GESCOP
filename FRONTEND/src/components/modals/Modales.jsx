import React from 'react';
import { useApp } from '../../context/AppContext';
import ModalVehiculo from '../Common/ModalVehiculo';
import ModalVerVehiculo from '../Common/ModalVerVehiculo';
import ModalDocumentacion from '../Common/ModalDocumentacion';

const Modales = () => {
  const { modalAbierto, cerrarModal, elementoEditando } = useApp();

  const renderModal = () => {
    switch(modalAbierto) {
      case 'ver-vehiculo':
        return <ModalVerVehiculo vehiculo={elementoEditando} onClose={cerrarModal} />;
      case 'editar-vehiculo':
        return <ModalVehiculo vehiculo={elementoEditando} onClose={cerrarModal} />;
      case 'nuevo-vehiculo':
        return <ModalVehiculo onClose={cerrarModal} />;
      case 'documentacion-vehiculo':
        return <ModalDocumentacion vehiculo={elementoEditando} onClose={cerrarModal} />;
      default:
        return null;
    }
  };

  return renderModal();
};

export default Modales;