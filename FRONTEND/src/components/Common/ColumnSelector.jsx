import React from 'react';
import './ColumnSelector.css';

const ColumnSelector = ({ columnasVisibles, onToggleColumna, onClose }) => {
    const gruposColumnas = [
        {
            titulo: 'Información Básica',
            columnas: [
                { key: 'interno', label: 'Interno', disabled: true },
                { key: 'anio', label: 'Año', disabled: true },
                { key: 'dominio', label: 'Dominio', disabled: true },
                { key: 'modelo', label: 'Modelo', disabled: true }
            ]
        },
        {
            titulo: 'Operación',
            columnas: [
                { key: 'eq-incorporado', label: 'Eq. Incorporado' },
                { key: 'sector', label: 'Sector', disabled: true },
                { key: 'chofer', label: 'Chofer' },
                { key: 'estado', label: 'Estado', disabled: true },
                { key: 'observaciones', label: 'Observaciones' }
            ]
        },
        {
            titulo: 'VTV',
            columnas: [
                { key: 'vtv-vencimiento', label: 'VTV Vencimiento' },
                { key: 'vtv-ev', label: 'VTV Estado' }
            ]
        },
        {
            titulo: 'Habilitación',
            columnas: [
                { key: 'habilitacion-vencimiento', label: 'Hab. Vencimiento' },
                { key: 'habilitacion-eh', label: 'Hab. Estado' }
            ]
        },
        {
            titulo: 'Seguros',
            columnas: [
                { key: 'tipo-seguro', label: 'Tipo Seguro' },
                { key: 'seguro-tecnico', label: 'Seg. Técnico' },
                { key: 'seguro-cargas', label: 'Seg. Cargas Pel.' }
            ]
        }
    ];

    return (
        <div className="column-selector-overlay" onClick={onClose}>
            <div className="column-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="column-selector-header">
                    <h3>Seleccionar Columnas</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="column-selector-body">
                    {gruposColumnas.map(grupo => (
                        <div key={grupo.titulo} className="column-group">
                            <h4>{grupo.titulo}</h4>
                            {grupo.columnas.map(columna => (
                                <label key={columna.key} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={columnasVisibles[columna.key]}
                                        onChange={() => onToggleColumna(columna.key)}
                                        disabled={columna.disabled}
                                    />
                                    <span>{columna.label}</span>
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="column-selector-footer">
                    <button className="btn btn-primary" onClick={onClose}>
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColumnSelector;