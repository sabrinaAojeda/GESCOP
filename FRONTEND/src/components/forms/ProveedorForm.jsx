// FRONTEND/src/components/forms/ProveedorForm.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ProveedorForm = ({ initialData, onSubmit, isEdit = false, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    razon_social: '',
    tipo_proveedor: 'monotributista', // monotributista o razon_social
    cuit: '',
    contacto: '',
    telefono: '',
    email: '',
    sector_servicio: '',
    servicios: [], // array de servicios ofrecidos
    localidad: '',
    provincia: '',
    direccion: '',
    seguro_RT: false,
    habilitacion_personal: '',
    habilitacion_vehiculo: '',
    observaciones: '',
    ...initialData
  });

  const [nuevoServicio, setNuevoServicio] = useState({
    tipo: '',
    descripcion: '',
    personal_requerido: 0,
    vehiculos_requeridos: 0
  });

  // Opciones para los selects
  const tiposProveedor = [
    { value: 'monotributista', label: 'Monotributista' },
    { value: 'razon_social', label: 'Razón Social' }
  ];

  const sectoresServicio = [
    'vigilancia',
    'transporte',
    'limpieza',
    'mantenimiento',
    'logística',
    'seguridad',
    'consultoría',
    'incineración',
    'tratamiento_residuos'
  ];

  const tiposServicio = [
    'vigilancia_armada',
    'vigilancia_no_armada',
    'transporte_peligrosos',
    'transporte_general',
    'limpieza_industrial',
    'mantenimiento_preventivo',
    'mantenimiento_correctivo',
    'disposición_final',
    'tratamiento_especial'
  ];

  const provincias = [
    'Buenos Aires',
    'Capital Federal',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServicioChange = (e) => {
    const { name, value } = e.target;
    setNuevoServicio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarServicio = () => {
    if (nuevoServicio.tipo && nuevoServicio.descripcion) {
      setFormData(prev => ({
        ...prev,
        servicios: [...prev.servicios, { ...nuevoServicio, id: Date.now() }]
      }));
      setNuevoServicio({
        tipo: '',
        descripcion: '',
        personal_requerido: 0,
        vehiculos_requeridos: 0
      });
    }
  };

  const eliminarServicio = (id) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.filter(serv => serv.id !== id)
    }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file.name
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        📋 Información Básica del Proveedor
      </Typography>
      
      <Grid container spacing={3}>
        {/* Información Básica */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Razón Social"
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Tipo de Proveedor</InputLabel>
            <Select
              name="tipo_proveedor"
              value={formData.tipo_proveedor}
              onChange={handleChange}
              label="Tipo de Proveedor"
              disabled={readOnly}
            >
              {tiposProveedor.map(tipo => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="CUIT"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            required
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Persona de Contacto"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Sector y Servicios */}
      <Typography variant="h6" gutterBottom>
        🛠️ Sector y Servicios
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sector de Servicio</InputLabel>
            <Select
              name="sector_servicio"
              value={formData.sector_servicio}
              onChange={handleChange}
              label="Sector de Servicio"
              disabled={readOnly}
            >
              {sectoresServicio.map(sector => (
                <MenuItem key={sector} value={sector}>
                  {sector.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Gestión de Servicios */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>➕ Agregar Servicios Específicos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Servicio</InputLabel>
                <Select
                  name="tipo"
                  value={nuevoServicio.tipo}
                  onChange={handleServicioChange}
                  label="Tipo de Servicio"
                  disabled={readOnly}
                >
                  {tiposServicio.map(tipo => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={nuevoServicio.descripcion}
                onChange={handleServicioChange}
                disabled={readOnly}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Personal"
                name="personal_requerido"
                type="number"
                value={nuevoServicio.personal_requerido}
                onChange={handleServicioChange}
                disabled={readOnly}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Vehículos"
                name="vehiculos_requeridos"
                type="number"
                value={nuevoServicio.vehiculos_requeridos}
                onChange={handleServicioChange}
                disabled={readOnly}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={agregarServicio}
                disabled={readOnly}
              >
                Agregar Servicio
              </Button>
            </Grid>
          </Grid>

          {/* Lista de servicios agregados */}
          {formData.servicios.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Servicios Agregados:
              </Typography>
              {formData.servicios.map((servicio) => (
                <Box key={servicio.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={`${servicio.tipo.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - ${servicio.descripcion} (Pers: ${servicio.personal_requerido}, Veh: ${servicio.vehiculos_requeridos})`}
                    onDelete={readOnly ? undefined : () => eliminarServicio(servicio.id)}
                  />
                </Box>
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 3 }} />

      {/* Ubicación */}
      <Typography variant="h6" gutterBottom>
        📍 Ubicación
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Localidad"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Provincia</InputLabel>
            <Select
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              label="Provincia"
              disabled={readOnly}
            >
              {provincias.map(provincia => (
                <MenuItem key={provincia} value={provincia}>
                  {provincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Seguros y Habilitaciones */}
      <Typography variant="h6" gutterBottom>
        🛡️ Seguros y Habilitaciones
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="seguro_RT"
                checked={formData.seguro_RT}
                onChange={handleChange}
                color="primary"
                disabled={readOnly}
              />
            }
            label="Seguro de Riesgos del Trabajo (RT)"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            disabled={readOnly}
          >
            📄 Habilitación del Personal
            <input
              type="file"
              hidden
              onChange={(e) => handleFileUpload('habilitacion_personal', e)}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </Button>
          {formData.habilitacion_personal && (
            <Chip 
              label={formData.habilitacion_personal} 
              onDelete={readOnly ? undefined : () => setFormData(prev => ({ ...prev, habilitacion_personal: '' }))}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            disabled={readOnly}
          >
            🚗 Habilitación de Vehículos
            <input
              type="file"
              hidden
              onChange={(e) => handleFileUpload('habilitacion_vehiculo', e)}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </Button>
          {formData.habilitacion_vehiculo && (
            <Chip 
              label={formData.habilitacion_vehiculo} 
              onDelete={readOnly ? undefined : () => setFormData(prev => ({ ...prev, habilitacion_vehiculo: '' }))}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            multiline
            rows={3}
            disabled={readOnly}
          />
        </Grid>
      </Grid>

      {/* Acciones del formulario */}
      {!readOnly && (
        <Grid item xs={12} sx={{ mt: 3 }}>
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
              {isEdit ? 'Actualizar Proveedor' : 'Crear Proveedor'}
            </Button>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default ProveedorForm;