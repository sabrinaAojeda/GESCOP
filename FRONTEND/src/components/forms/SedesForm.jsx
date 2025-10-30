// FRONTEND/src/pages/Sedes/Sedes.jsx
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
import { useCrudOperations } from '../../hooks/useCrudOperations';
import { useTableActions } from '../../hooks/useTableActions';
import GenericModal from '../../components/modals/GenericModal';
import DocumentModal from '../../components/modals/DocumentModal';
import SedeForm from '../../components/forms/SedeForm';

const Sedes = () => {
  const {
    data: sedes,
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
      nombre: 'Sede Central',
      direccion: 'Av. Principal 1234',
      telefono: '011-4567-8901',
      empresa_id: 1,
      tipo_predio: 'planta',
      servicio_principal: 'incineración',
      habilitada: true,
      localidad: 'Capital',
      provincia: 'Buenos Aires'
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

  const empresas = [
    { id: 1, nombre: 'Empresa Principal' },
    { id: 2, nombre: 'Empresa Secundaria' }
  ];

  const handleSaveSede = (sedeData) => {
    saveItem(sedeData);
  };

  const handleExport = () => {
    exportData(sedes, 'sedes');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          🏢 Gestión de Sedes
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
            Nueva Sede
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Tipo Predio</TableCell>
              <TableCell>Servicio Principal</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sedes.map((sede) => (
              <TableRow key={sede.id}>
                <TableCell>{sede.nombre}</TableCell>
                <TableCell>{sede.direccion}</TableCell>
                <TableCell>{sede.telefono}</TableCell>
                <TableCell>{sede.tipo_predio}</TableCell>
                <TableCell>{sede.servicio_principal}</TableCell>
                <TableCell>
                  <Chip
                    label={sede.habilitada ? 'Habilitada' : 'No Habilitada'}
                    color={sede.habilitada ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => openViewModal(sede.id)}
                      title="Ver detalles"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(sede.id)}
                      title="Editar sede"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openDocumentModal(sede)}
                      title="Gestionar documentos"
                    >
                      <DocumentIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openDeleteModal(sede.id)}
                      title="Eliminar sede"
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

      {/* Modal para Crear/Editar/Ver Sede */}
      <GenericModal
        open={isModalOpen}
        onClose={closeModals}
        title={
          isViewMode 
            ? `👁️ Ver Sede: ${selectedItem?.nombre || ''}`
            : selectedItem 
            ? `✏️ Editar Sede: ${selectedItem.nombre}`
            : '➕ Nueva Sede'
        }
        actions={
          !isViewMode ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={closeModals}>Cancelar</Button>
              <Button 
                type="submit" 
                form="sede-form" 
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
        <SedeForm
          initialData={selectedItem}
          onSubmit={handleSaveSede}
          isEdit={!!selectedItem && !isViewMode}
          onCancel={closeModals}
          empresas={empresas}
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
          ¿Está seguro de eliminar la sede "{selectedItem?.nombre}"? 
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

export default Sedes;