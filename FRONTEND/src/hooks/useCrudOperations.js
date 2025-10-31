// FRONTEND/src/hooks/useCrudOperations.js
import { useState } from 'react';

export const useCrudOperations = (initialData = []) => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Crear nuevo elemento
  const createItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: Date.now(), // ID temporal, en producción vendría del backend
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setData(prev => [...prev, itemWithId]);
    return itemWithId;
  };

  // Leer elemento
  const readItem = (id) => {
    return data.find(item => item.id === id);
  };

  // Actualizar elemento
  const updateItem = (id, updatedItem) => {
    setData(prev => prev.map(item => 
      item.id === id 
        ? { ...updatedItem, id, updated_at: new Date().toISOString() }
        : item
    ));
  };

  // Eliminar elemento
  const deleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Abrir modal para crear
  const openCreateModal = () => {
    setSelectedItem(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  // Abrir modal para ver
  const openViewModal = (id) => {
    const item = readItem(id);
    setSelectedItem(item);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const openEditModal = (id) => {
    const item = readItem(id);
    setSelectedItem(item);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  // Abrir modal de confirmación para eliminar
  const openDeleteModal = (id) => {
    const item = readItem(id);
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  // Cerrar modales
  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  // Guardar elemento (crear o actualizar)
  const saveItem = (itemData) => {
    if (selectedItem) {
      // Actualizar
      updateItem(selectedItem.id, itemData);
    } else {
      // Crear
      createItem(itemData);
    }
    closeModals();
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    if (selectedItem) {
      deleteItem(selectedItem.id);
    }
    closeModals();
  };

  return {
    data,
    selectedItem,
    isModalOpen,
    isViewMode,
    isDeleteModalOpen,
    openCreateModal,
    openViewModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    saveItem,
    confirmDelete,
    setData
  };
};