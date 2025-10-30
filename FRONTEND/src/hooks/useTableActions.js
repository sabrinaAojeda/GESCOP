// FRONTEND/src/hooks/useTableActions.js
import { useState } from 'react';

export const useTableActions = () => {
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedItemForDocs, setSelectedItemForDocs] = useState(null);

  // Abrir modal de documentos
  const openDocumentModal = (item) => {
    setSelectedItemForDocs(item);
    setDocumentModalOpen(true);
  };

  // Cerrar modal de documentos
  const closeDocumentModal = () => {
    setDocumentModalOpen(false);
    setSelectedItemForDocs(null);
  };

  // Subir documento
  const uploadDocument = (file, documentType) => {
    // En una implementación real, aquí subirías el archivo al servidor
    console.log('Subiendo documento:', file.name, 'Tipo:', documentType, 'Para:', selectedItemForDocs);
    
    // Simular subida exitosa
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          nombre: file.name,
          tipo: documentType,
          fecha_subida: new Date().toISOString(),
          tamaño: file.size
        });
      }, 1000);
    });
  };

  // Eliminar documento
  const deleteDocument = (documentId) => {
    console.log('Eliminando documento:', documentId);
    // Lógica para eliminar documento
  };

  // Exportar datos
  const exportData = (data, filename) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Convertir datos a CSV
  const convertToCSV = (data) => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  };

  return {
    documentModalOpen,
    selectedItemForDocs,
    openDocumentModal,
    closeDocumentModal,
    uploadDocument,
    deleteDocument,
    exportData
  };
};