// FRONTEND/src/components/modals/DocumentModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const DocumentModal = ({
  open,
  onClose,
  item,
  onUploadDocument,
  onDeleteDocument
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      for (const file of selectedFiles) {
        await onUploadDocument(file, 'general');
      }
      setSelectedFiles([]);
      // Limpiar input de archivo
      const fileInput = document.getElementById('document-upload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error subiendo archivos:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (document) => {
    // Simular descarga
    console.log('Descargando documento:', document);
    alert(`Descargando: ${document.nombre}`);
  };

  const handleView = (document) => {
    // Simular visualización
    console.log('Viendo documento:', document);
    alert(`Viendo: ${document.nombre}`);
  };

  const handleDelete = (document) => {
    if (window.confirm(`¿Está seguro de eliminar el documento "${document.nombre}"?`)) {
      onDeleteDocument(document.id);
    }
  };

  // Documentos de ejemplo (en producción vendrían del backend)
  const sampleDocuments = [
    {
      id: 1,
      nombre: 'contrato_servicio.pdf',
      tipo: 'Contrato',
      fecha_subida: '2024-01-15',
      tamaño: 2456789
    },
    {
      id: 2,
      nombre: 'certificado_habilitacion.jpg',
      tipo: 'Certificado',
      fecha_subida: '2024-02-20',
      tamaño: 1456789
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Typography variant="h6">
          📄 Gestión de Documentos - {item?.nombre || item?.razon_social || 'Elemento'}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Sección de subida de archivos */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h7" gutterBottom>
              Subir Nuevos Documentos
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'grey.50'
                }
              }}
              onClick={() => document.getElementById('document-upload').click()}
            >
              <Typography variant="body2" color="textSecondary">
                📁 Haz clic aquí o arrastra archivos para cargar
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Formatos permitidos: PDF, JPG, PNG, DOC (Máx. 10MB por archivo)
              </Typography>
              <input
                id="document-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </Box>

            {selectedFiles.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Archivos seleccionados:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedFiles.map((file, index) => (
                    <Chip
                      key={index}
                      label={`${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`}
                      onDelete={() => {
                        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={uploading}
                  sx={{ mt: 1 }}
                >
                  {uploading ? 'Subiendo...' : 'Subir Archivos'}
                </Button>
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Lista de documentos existentes */}
          <Typography variant="h7" gutterBottom>
            Documentos Existentes
          </Typography>
          
          {sampleDocuments.length > 0 ? (
            <List>
              {sampleDocuments.map((doc) => (
                <ListItem key={doc.id} divider>
                  <ListItemText
                    primary={doc.nombre}
                    secondary={
                      <Box>
                        <Typography variant="caption" display="block">
                          Tipo: {doc.tipo}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Subido: {new Date(doc.fecha_subida).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption">
                          Tamaño: {(doc.tamaño / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() => handleView(doc)}
                      title="Ver documento"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDownload(doc)}
                      title="Descargar documento"
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(doc)}
                      title="Eliminar documento"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Alert severity="info">
              No hay documentos cargados para este elemento.
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentModal;