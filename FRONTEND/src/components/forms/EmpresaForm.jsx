// FRONTEND/src/components/forms/EmpresaForm.jsx
import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Chip
} from '@mui/material';

const EmpresaForm = ({ initialData, onSubmit, isEdit = false, onCancel }) => {
  const [formData, setFormData] = React.useState({
    nombre: '',
    rut: '',
    direccion: '',
    telefono: '',
    email: '',
    tipo_habilitacion: '',
    certificados: '',
    ...initialData
  });

  const tiposHabilitacion = [
    'ambiental',
    'sanitaria',
    'operativa',
    'comercial',
    'municipal'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        certificados: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="RUT"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Habilitación</InputLabel>
            <Select
              name="tipo_habilitacion"
              value={formData.tipo_habilitacion}
              onChange={handleChange}
              label="Tipo de Habilitación"
            >
              {tiposHabilitacion.map(tipo => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
          >
            Subir Certificados
            <input
              type="file"
              hidden
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </Button>
          {formData.certificados && (
            <Chip 
              label={formData.certificados} 
              onDelete={() => setFormData(prev => ({ ...prev, certificados: '' }))}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button 
              type="button" 
              variant="outlined"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              {isEdit ? 'Actualizar Empresa' : 'Crear Empresa'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmpresaForm;