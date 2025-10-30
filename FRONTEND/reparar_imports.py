import os
import glob

# Archivos a reparar
archivos = [
    "src/pages/Reportes/Reportes.jsx",
    "src/pages/Configuracion/Configuracion.jsx",
    "src/pages/RodadoMaquinarias/RodadoMaquinarias.jsx", 
    "src/pages/Sedes/Sedes.jsx",
    "src/pages/Proveedores/Proveedores.jsx",
    "src/pages/Alertas/Alertas.jsx",
    "src/pages/Personal/Personal.jsx",
    "src/components/Header/Header.jsx",
    "src/routes/ProtectedRoute.jsx"
]

for archivo in archivos:
    if os.path.exists(archivo):
        print(f"Reparando: {archivo}")
        with open(archivo, 'r') as f:
            contenido = f.read()
        
        # Reemplazar exactamente lo que necesitamos
        contenido = contenido.replace("from '../../auth'", "from '../../context/AuthContext'")
        contenido = contenido.replace("from '../auth'", "from '../context/AuthContext'")
        contenido = contenido.replace("import { getUser, logout }", "import { useAuth }")
        contenido = contenido.replace("import { isAuthenticated }", "import { useAuth }")
        
        with open(archivo, 'w') as f:
            f.write(contenido)
        
        print(f"✅ {archivo} - REPARADO")

print("🎉 TODOS LOS ARCHIVOS HAN SIDO REPARADOS!")
