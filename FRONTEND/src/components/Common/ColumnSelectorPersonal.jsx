// FRONTEND/src/components/Common/ColumnSelectorPersonal.jsx
import React from 'react';
import './ColumnSelector.css';

const ColumnSelectorPersonal = ({ columnasVisibles, onToggleColumna, onClose }) => {
    const gruposColumnas = [
        {
            titulo: 'Información Básica',
            columnas: [
                { key: 'legajo', label: 'Legajo', disabled: true },
                { key: 'dni', label: 'DNI', disabled: true },
                { key: 'nombre', label: 'Nombre', disabled: true },
                { key: 'apellido', label: 'Apellido', disabled: true }
            ]
        },
        {
            titulo: 'Laboral',
            columnas: [
                { key: 'sector', label: 'Sector', disabled: true },
                { key: 'cargo', label: 'Cargo', disabled: true },
                { key: 'estado', label: 'Estado', disabled: true }
            ]
        },
        {
            titulo: 'Contacto',
            columnas: [
                { key: 'telefono', label: 'Teléfono' },
                { key: 'email', label: 'Email' }
            ]
        },
        {
            titulo: 'Documentación',
            columnas: [
                { key: 'licenciaVencimiento', label: 'Licencia Vencimiento' }
            ]
        }
    ];

    return (
        <div className="column-selector-overlay" onClick={onClose}>
            <div className="column-selector-modal" onClick={e => e.stopPropagation()}>
                <div className="column-selector-header">
                    <h3>Seleccionar Columnas - Personal</h3>
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

export default ColumnSelectorPersonal;