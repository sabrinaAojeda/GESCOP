import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const ColumnSelector = () => {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const gruposColumnas = {
    basica: {
      titulo: "Información Básica",
      columnas: [
        { id: 'interno', label: 'Interno', required: true },
        { id: 'anio', label: 'Año', required: true },
        { id: 'dominio', label: 'Dominio', required: true },
        { id: 'modelo', label: 'Modelo' },
        { id: 'eq-incorporado', label: 'EQ. Incorporado' }
      ]
    },
    operacion: {
      titulo: "Operación",
      columnas: [
        { id: 'sector', label: 'Sector' },
        { id: 'chofer', label: 'Chofer' },
        { id: 'estado', label: 'Estado' },
        { id: 'observaciones', label: 'Observaciones' }
      ]
    },
    documentacion: {
      titulo: "Documentación", 
      columnas: [
        { id: 'vtv-vencimiento', label: 'VTV Vto.' },
        { id: 'vtv-ev', label: 'VTV EV' },
        { id: 'habilitacion-vencimiento', label: 'Hab. Vto.' },
        { id: 'habilitacion-eh', label: 'Hab. EH' }
      ]
    },
    seguros: {
      titulo: "Seguros",
      columnas: [
        { id: 'tipo-seguro', label: 'Tipo Seguro' },
        { id: 'seguro-tecnico', label: 'Seg. Técnico' },
        { id: 'seguro-cargas', label: 'Seg. Cargas Pel.' }
      ]
    }
  };

  const handleColumnToggle = (columnaId, visible) => {
    dispatch({
      type: 'SET_COLUMNAS_VISIBLES',
      payload: { [columnaId]: visible }
    });
  };

  return (
    <div className="column-selector">
      <button 
        className="btn btn-secondary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>👁️</span> Columnas
      </button>
      
      {isOpen && (
        <div className="column-selector-content">
          {Object.entries(gruposColumnas).map(([key, grupo]) => (
            <div key={key} className="column-group">
              <div className="column-group-title">{grupo.titulo}</div>
              {grupo.columnas.map(columna => (
                <label key={columna.id} className="column-option">
                  <input
                    type="checkbox"
                    checked={state.columnasVisibles[columna.id]}
                    onChange={(e) => handleColumnToggle(columna.id, e.target.checked)}
                    disabled={columna.required}
                  />
                  {columna.label}
                </label>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;