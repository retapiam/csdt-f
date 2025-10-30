# CSDT Frontend - React + Vite

Frontend del Sistema CSDT (Consejo Social de Veeduría y Desarrollo Territorial)

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js >= 16.0.0
- npm >= 8.0.0

### Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/retapiam/csdt-f.git
cd csdt-f-main

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env

# 4. Configurar .env
# VITE_API_URL=http://localhost:8000/api
# VITE_APP_ENV=development

# 5. Iniciar servidor de desarrollo
npm run dev
```

Aplicación disponible en: `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes React (100+)
│   ├── compartidas/         # Componentes compartidos (38)
│   ├── donaciones/          # Donaciones
│   ├── gestion-proyectos/   # Proyectos MS Project
│   ├── ia/                  # Componentes IA (5)
│   └── ui/                  # Componentes UI base (16)
│
├── config/                  # Configuraciones (9)
│   ├── ai-config.js         # Config IA
│   ├── colors.js
│   ├── config.js
│   └── ...
│
├── constants/               # Constantes
│   └── tiposEntidades.js
│
├── contexts/                # Contextos React (3)
│   ├── AuthContext.jsx
│   ├── NotificationContext.jsx
│   └── PermisosVistaContext.jsx
│
├── hooks/                   # Custom Hooks (27)
│   ├── useAI.js
│   ├── useAuth.js
│   ├── usePermisos.js
│   └── ...
│
├── paginas/                 # Páginas/Vistas (100+)
│   ├── 01-innovacion-ia/    # 16 módulos IA
│   ├── 02-rama-judicial/    # Justicia
│   ├── 03-acciones-constitucionales/
│   ├── 06-organos-control/  # Veedurías
│   ├── 08-derechos-etnicos/ # 16 submódulos
│   ├── 10-distamesnes-peritajes/
│   ├── 12-gestion-proyectos/
│   └── auth/
│
├── services/                # Servicios API (23)
│   ├── AIServiceBackend.js
│   ├── api.js
│   ├── ProyectoService.js
│   └── ...
│
├── styles/                  # Estilos globales
│   ├── GlobalStyles.css
│   └── GlobalStyles.js
│
├── types/                   # Tipos y modelos
│   ├── backend-models.js
│   └── models.js
│
├── utils/                   # Utilidades
│   ├── cacheManager.js
│   ├── dataMappers.js
│   └── ...
│
├── App.jsx                  # Componente principal
├── App.css
├── main.jsx                 # Punto de entrada
└── index.css                # Estilos base
```

---

## 🎨 Stack de UI

### Componentes Base

- **Radix UI**: Componentes accesibles (Dialog, Select, Tabs, etc.)
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animaciones fluidas
- **Lucide React**: Sistema de iconos
- **Styled Components**: CSS-in-JS

### Componentes UI Disponibles

```
ui/
├── alert.jsx
├── badge.jsx
├── button.jsx
├── card.jsx
├── checkbox.jsx
├── dialog.jsx
├── input.jsx
├── label.jsx
├── select.jsx
├── switch.jsx
├── tabs.jsx
└── ... (16 componentes)
```

**Uso:**

```jsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Card>
  <Button variant="primary" size="lg">
    Acción
  </Button>
</Card>
```

---

## 🔌 Conexión con Backend

### Configuración API

**src/services/api.js:**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Servicios Disponibles

```javascript
// Autenticación
import { login, register, logout } from '@/services/AuthService';

// Proyectos
import ProyectoService from '@/services/ProyectoService';
const proyectos = await ProyectoService.obtenerTodos();

// IA
import AIServiceBackend from '@/services/AIServiceBackend';
const analisis = await AIServiceBackend.analizarJuridico(datos);

// Veedurías
import VeeduriaService from '@/services/VeeduriaService';

// Derechos Étnicos
import ConsultaPreviaService from '@/services/ConsultaPreviaService';
```

---

## 🤖 Integración con IA

### Hooks de IA

```jsx
import { useAI } from '@/hooks/useAI';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

function MiComponente() {
  const { 
    analizar, 
    loading, 
    resultado, 
    error 
  } = useAI();

  const handleAnalizar = async () => {
    const result = await analizar({
      tipo: 'juridico',
      datos: { hechos, derechos, pretensiones }
    });
  };

  return (
    <div>
      <button onClick={handleAnalizar} disabled={loading}>
        {loading ? 'Analizando...' : 'Analizar con IA'}
      </button>
      {resultado && <div>{resultado.viabilidad}</div>}
    </div>
  );
}
```

### Configuración IA

**src/config/ai-config.js:**

Configuración de 12 modelos de IA:
- OpenAI (GPT-4, GPT-4 Turbo, GPT-3.5)
- Anthropic (Claude 3 Opus, Sonnet, Haiku)
- Google (Gemini Pro, Gemini Vision)
- ElevenLabs, LexisNexis, HuggingFace

---

## 🗺️ Rutas y Navegación

### React Router v6

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="/login" element={<Login />} />
    
    {/* Protegidas */}
    <Route element={<ProtectedRoute />}>
      <Route path="/proyectos" element={<GestionProyectos />} />
      <Route path="/veedurias" element={<Veedurias />} />
      <Route path="/ia/consejo" element={<ConsejoIA />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Rutas Principales

```
/                          # Inicio
/login                     # Login
/registro                  # Registro

/proyectos                 # Gestión de proyectos
/proyectos/:id             # Detalle proyecto

/veedurias                 # Veedurías
/veedurias/:id             # Detalle veeduría

/casos-legales             # Casos legales
/accion-tutela             # Acción de tutela

/pueblos-indigenas         # Pueblos indígenas
/comunidades-afro          # Comunidades afro
/consulta-previa           # Consulta previa

/ia/consejo                # Consejo IA
/ia/analisis-juridico      # Análisis jurídico IA
/ia/centro-innovacion      # Centro de innovación IA

// Dictámenes y Peritajes (rutas actuales)
/reconocimiento-directo
/reconocimiento-indirecto
/reconocimiento-social
/timeline-territorial
/gestion-conflictos
/catastro-comunitario
/catastro-participativo
/catastro-indirecto
/comparativo-catastral
/mapa-minero-nacional
/superposicion-minero
/certificados-mineros
/proyectos-extractivos
/mapa-ambiental-interactivo
/diagnostico-ambiental
/proyectos-ambientales
/planes-manejo-ambiental
/consulta-previa-dictamen
/certificados-etnicos
/ampliacion-saneamiento
/mapa-cultural
/repositorio-saberes
/testimonios-memoria
/participacion-social

/perfil                    # Perfil de usuario
/dashboard                 # Dashboard
```

---

## 🎨 Tailwind CSS

### Configuración

**tailwind.config.js:**

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...},
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
```

### Clases Útiles

```jsx
// Layout
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flexbox
<div className="flex items-center justify-between">

// Colores
<div className="bg-blue-500 text-white">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Animaciones
<div className="transition-all duration-300 hover:scale-105">
```

---

## 📊 Visualizaciones

### Recharts

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

<LineChart width={600} height={300} data={datos}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="nombre" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="valor" stroke="#8884d8" />
</LineChart>
```

### Leaflet (Mapas)

```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

<MapContainer center={[4.5709, -74.2973]} zoom={6}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[4.5709, -74.2973]}>
    <Popup>Bogotá, Colombia</Popup>
  </Marker>
</MapContainer>
```

---

## 📄 Generación de PDFs

### jsPDF

```jsx
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generarPDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text('Título del Documento', 20, 20);
  
  doc.autoTable({
    head: [['Columna 1', 'Columna 2']],
    body: [
      ['Dato 1', 'Dato 2'],
      ['Dato 3', 'Dato 4'],
    ],
  });
  
  doc.save('documento.pdf');
};
```

---

## 🔐 Autenticación

### AuthContext

```jsx
import { useAuth } from '@/contexts/AuthContext';

function MiComponente() {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenido, {user.name}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <button onClick={() => login(credentials)}>
          Iniciar Sesión
        </button>
      )}
    </div>
  );
}
```

### Rutas Protegidas

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

**Ejemplo de test:**

```jsx
import { render, screen } from '@testing-library/react';
import MiComponente from './MiComponente';

test('renderiza correctamente', () => {
  render(<MiComponente />);
  expect(screen.getByText(/texto esperado/i)).toBeInTheDocument();
});
```

---

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor dev (Vite)

# Build
npm run build            # Build producción
npm run preview          # Preview build

# Linting
npm run lint             # ESLint
npm run lint:fix         # ESLint con fix

# Formateo
npm run format           # Prettier
npm run format:check     # Prettier check

# Testing
npm test                 # Jest
npm run test:watch       # Jest watch
npm run test:coverage    # Coverage

# Limpieza
npm run clean            # Limpiar dist y cache
```

---

## 🏗️ Build para Producción

```bash
# 1. Build
npm run build

# 2. Los archivos estarán en dist/
ls dist/

# 3. Probar build localmente
npm run preview

# 4. Deploy (copiar dist/ al servidor)
scp -r dist/* usuario@servidor:/var/www/csdt-frontend/
```

### Optimizaciones Build

- ✅ Tree shaking automático
- ✅ Code splitting
- ✅ Minificación
- ✅ Compresión Gzip
- ✅ Cache busting
- ✅ Lazy loading de componentes

---

## 🔧 Configuración Vite

**vite.config.js:**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        },
      },
    },
  },
});
```

---

## 📚 Documentación

- **Documentación técnica completa**: `../DOCUMENTACION-TECNICA-CSDT.md`
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Radix UI**: https://www.radix-ui.com

---

## 🔧 Troubleshooting

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Puerto 5173 en uso
```bash
# Cambiar puerto en vite.config.js
server: {
  port: 3000,
}
```

### Error: CORS
Verificar `VITE_API_URL` en `.env`

### Build falla
```bash
npm run clean
npm install
npm run build
```

### Hot reload no funciona
Reiniciar servidor dev:
```bash
Ctrl+C
npm run dev
```

---

## 📞 Contacto

**Desarrollador**: Esteban Restrepo  
**Email**: esteban.41m@gmail.com  
**GitHub**: @retapiam  
**Repositorio**: https://github.com/retapiam/csdt-f.git

---

## 📄 Licencia

Privado - Todos los derechos reservados © 2024-2025 CSDT

---

**Desarrollado con ❤️ para CSDT**

