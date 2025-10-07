# CSDT Frontend

Sistema CSDT con IA avanzada, PDF generation y componentes modernos

## 📋 Información del Proyecto

- **Repositorio**: https://github.com/retapiam/csdt-f.git
- **Usuario**: retapiam
- **Correo**: esteban.41m@gmail.com
- **Versión**: 1.0.0

## 🚀 Tecnologías Principales

- **React 18.3.1** - Biblioteca de interfaz de usuario
- **Vite 7.1.8** - Herramienta de construcción y desarrollo
- **React Router 6.30.1** - Enrutamiento
- **Tailwind CSS 3.4.18** - Framework de CSS
- **Axios** - Cliente HTTP
- **Framer Motion** - Animaciones
- **jsPDF** - Generación de PDFs
- **Leaflet** - Mapas interactivos
- **OpenAI** - Integración con IA

## 📦 Requisitos Previos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/retapiam/csdt-f.git
cd csdt-f
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copiar el archivo `.env.example` a `.env` y ajustar los valores según tu entorno:

```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:

```env
# URL del backend Laravel
VITE_API_URL=http://localhost:8000/api

# Timeout de la API (en milisegundos)
VITE_API_TIMEOUT=60000

# Entorno (development, production, staging)
VITE_APP_ENV=development

# Habilitar logs (true/false)
VITE_ENABLE_LOGS=true
```

## 🏃 Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173`

### Construcción
```bash
npm run build
```
Construye la aplicación para producción en el directorio `dist/`

### Vista Previa
```bash
npm run preview
```
Previsualiza la construcción de producción localmente

### Testing
```bash
npm run test          # Ejecutar tests
npm run test:watch    # Ejecutar tests en modo watch
npm run test:coverage # Ejecutar tests con cobertura
```

### Linting y Formateo
```bash
npm run lint          # Verificar código con ESLint
npm run lint:fix      # Corregir problemas de ESLint automáticamente
npm run format        # Formatear código con Prettier
npm run format:check  # Verificar formato de código
```

### Limpieza
```bash
npm run clean
```
Elimina los directorios de construcción y caché

## 📁 Estructura del Proyecto

```
csdt-f-main/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── compartidas/ # Componentes compartidos
│   │   ├── donaciones/  # Componentes de donaciones
│   │   ├── ia/          # Componentes de IA
│   │   └── ui/          # Componentes de UI
│   ├── config/          # Configuraciones
│   ├── constants/       # Constantes
│   ├── contexts/        # Contextos de React
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilidades
│   ├── paginas/         # Páginas/Vistas
│   ├── services/        # Servicios de API
│   ├── styles/          # Estilos globales
│   ├── types/           # Tipos y modelos
│   └── utils/           # Utilidades
├── config/              # Configuraciones adicionales
├── scripts/             # Scripts de utilidad
├── .env                 # Variables de entorno (no incluir en Git)
├── .env.example         # Ejemplo de variables de entorno
├── package.json         # Dependencias y scripts
├── vite.config.js       # Configuración de Vite
└── tailwind.config.js   # Configuración de Tailwind CSS
```

## 🔐 Configuración de API

El proyecto se comunica con un backend Laravel. Asegúrate de que el backend esté corriendo en la URL especificada en `VITE_API_URL`.

### Endpoints Principales

- **Autenticación**: `/api/auth/*`
- **Usuarios**: `/api/users/*`
- **Proyectos**: `/api/proyectos/*`
- **Inteligencia Artificial**: `/api/ia/*`
- **Derechos Étnicos**: `/api/etnicos/*`
- **Veedurías**: `/api/veedurias/*`
- **Donaciones**: `/api/donaciones/*`

## 🎨 Características

- ✅ Sistema de autenticación completo
- ✅ Gestión de proyectos con MS Project
- ✅ Análisis de IA avanzada
- ✅ Generación de PDFs
- ✅ Dashboards interactivos con gráficos
- ✅ Mapas interactivos con Leaflet
- ✅ Sistema de permisos y roles
- ✅ Gestión de derechos étnicos
- ✅ Veedurías y seguimiento
- ✅ Sistema de donaciones
- ✅ Diseño responsive con Tailwind CSS
- ✅ Animaciones con Framer Motion

## 🛠️ Configuración de Git

El repositorio ya está configurado con:
- **Remoto origin**: https://github.com/retapiam/csdt-f.git

Para verificar el remoto:
```bash
git remote -v
```

## 📝 Flujo de Trabajo Git

1. **Crear una rama para tu feature**
```bash
git checkout -b feature/nombre-de-tu-feature
```

2. **Hacer commits de tus cambios**
```bash
git add .
git commit -m "Descripción de los cambios"
```

3. **Subir cambios al repositorio**
```bash
git push origin feature/nombre-de-tu-feature
```

## 🔄 Actualizar desde el Repositorio

```bash
git pull origin main
```

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Limpia caché y reinstala dependencias:
```bash
npm run clean
rm -rf node_modules
npm install
```

### Errores de compilación
- Verifica que todas las variables de entorno estén configuradas
- Revisa el archivo `.env` y asegúrate de que coincida con `.env.example`

### Problemas de conexión con la API
- Verifica que el backend esté corriendo
- Confirma que `VITE_API_URL` esté correctamente configurado
- Revisa la consola del navegador para más detalles

## 📞 Soporte

Para reportar problemas o sugerencias, por favor contactar a:
- **Email**: esteban.41m@gmail.com
- **GitHub**: [@retapiam](https://github.com/retapiam)

## 📄 Licencia

Este proyecto es privado y propiedad de CSDT.

---

**Desarrollado con ❤️ para CSDT**

