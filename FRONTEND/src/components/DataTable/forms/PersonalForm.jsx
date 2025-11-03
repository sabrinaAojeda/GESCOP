// FRONTEND/src/pages/Personal/Personal.jsx
import React from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DocumentIcon
} from '@mui/icons-material';
import { useCrudOperations } from '../../../hooks/useCrudOperations';
import { useTableActions } from '../../../hooks/useTableActions';
import GenericModal from '../../modals/GenericModal';
import DocumentModal from '../../components/modals/DocumentModal';
import PersonalForm from './PersonalForm';

const Personal = () => {
  const {
    data: personal,
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
    confirmDelete
  } = useCrudOperations([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '30.123.456',
      telefono: '011-1234-5678',
      email: 'juan.perez@empresa.com',
      cui: 'CUI123456',
      sector: 'Logística',
      seguro_vida: true,
      habilitacion: 'licencia_conducir.pdf',
      activo: true,
      proveedor_id: null
    }
  ]);

  const {
    documentModalOpen,
    selectedItemForDocs,
    openDocumentModal,
    closeDocumentModal,
    uploadDocument,
    deleteDocument,
    exportData
  } = useTableActions();

  const proveedores = [
    { id: 1, nombre: 'Proveedor A' },
    { id: 2, nombre: 'Proveedor B' }
  ];

  const handleSavePersonal = (personalData) => {
    saveItem(personalData);
  };

  const handleExport = () => {
    exportData(personal, 'personal');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          👥 Gestión de Personal
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleExport}
          >
            Exportar CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openCreateModal}
          >
            Nuevo Personal
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>CUI</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Seguro Vida</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personal.map((persona) => (
              <TableRow key={persona.id}>
                <TableCell>{`${persona.nombre} ${persona.apellido}`}</TableCell>
                <TableCell>{persona.dni}</TableCell>
                <TableCell>{persona.cui}</TableCell>
                <TableCell>{persona.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={persona.seguro_vida ? 'Sí' : 'No'}
                    color={persona.seguro_vida ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={persona.activo ? 'Activo' : 'Inactivo'}
                    color={persona.activo ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => openViewModal(persona.id)}
                      title="Ver detalles"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(persona.id)}
                      title="Editar personal"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openDocumentModal(persona)}
                      title="Gestionar documentos"
                    >
                      <DocumentIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openDeleteModal(persona.id)}
                      title="Eliminar personal"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para Crear/Editar/Ver Personal */}
      <GenericModal
        open={isModalOpen}
        onClose={closeModals}
        title={
          isViewMode 
            ? `👁️ Ver Personal: ${selectedItem?.nombre || ''} ${selectedItem?.apellido || ''}`
            : selectedItem 
            ? `✏️ Editar Personal: ${selectedItem.nombre} ${selectedItem.apellido}`
            : '➕ Nuevo Personal'
        }
        actions={
          !isViewMode ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={closeModals}>Cancelar</Button>
              <Button 
                type="submit" 
                form="personal-form" 
                variant="contained"
              >
                {selectedItem ? 'Actualizar' : 'Crear'}
              </Button>
            </Box>
          ) : (
            <Button onClick={closeModals}>Cerrar</Button>
          )
        }
      >
        <PersonalForm
          initialData={selectedItem}
          onSubmit={handleSavePersonal}
          isEdit={!!selectedItem && !isViewMode}
          onCancel={closeModals}
          proveedores={proveedores}
          readOnly={isViewMode}
        />
      </GenericModal>

      {/* Modal de Confirmación de Eliminación */}
      <GenericModal
        open={isDeleteModalOpen}
        onClose={closeModals}
        title="🗑️ Confirmar Eliminación"
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={closeModals}>Cancelar</Button>
            <Button 
              onClick={confirmDelete}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
          </Box>
        }
      >
        <Typography>
          ¿Está seguro de eliminar a "{selectedItem?.nombre} {selectedItem?.apellido}"? 
          Esta acción no se puede deshacer.
        </Typography>
      </GenericModal>

      {/* Modal de Documentos */}
      <DocumentModal
        open={documentModalOpen}
        onClose={closeDocumentModal}
        item={selectedItemForDocs}
        onUploadDocument={uploadDocument}
        onDeleteDocument={deleteDocument}
      />
    </Box>
  );
};

export default Personal;