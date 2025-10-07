import React, { useState } from 'react';

// Importaciones de Lucide React
import { 
  Home, User, Settings, Search, Check, X, AlertCircle, 
  Plus, Minus, Edit, Delete, Save, Download, Upload,
  Mail, Phone, MessageCircle, Send, Reply,
  File, FileText, Image, Video, Music, Archive,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Facebook, Twitter, Instagram, Linkedin, Github,
  Star, Heart, Bookmark, Calendar, Clock, MapPin, Globe,
  Lock, Unlock, Eye, EyeOff, Loading
} from 'lucide-react';

// Importaciones de Heroicons
import { 
  HomeIcon, UserIcon, CogIcon, SearchIcon,
  CheckIcon, XMarkIcon, ExclamationTriangleIcon,
  PlusIcon, MinusIcon, PencilIcon, TrashIcon,
  ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon
} from '@heroicons/react/24/outline';

// Importaciones de React Icons
import { 
  MdHome, MdPerson, MdSettings, MdSearch,
  FaHome, FaUser, FaCog, FaSearch,
  FiHome, FiUser, FiSettings, FiSearch,
  AiOutlineHome, AiOutlineUser, AiOutlineSetting
} from 'react-icons/md';

// Importaciones de Tabler Icons
import { 
  IconHome, IconUser, IconSettings, IconSearch,
  IconCheck, IconX, IconAlertCircle, IconPlus,
  IconMinus, IconEdit, IconTrash, IconDownload
} from '@tabler/icons-react';

// Importaciones de Iconify
import { Icon } from '@iconify/react';

const IconosDemo = () => {
  const [libreriaActiva, setLibreriaActiva] = useState('lucide');

  const librerias = [
    { id: 'lucide', nombre: 'Lucide React', color: 'blue' },
    { id: 'heroicons', nombre: 'Heroicons', color: 'green' },
    { id: 'react-icons', nombre: 'React Icons', color: 'purple' },
    { id: 'tabler', nombre: 'Tabler Icons', color: 'orange' },
    { id: 'iconify', nombre: 'Iconify', color: 'pink' }
  ];

  const iconosPorLibreria = {
    lucide: [
      { nombre: 'Home', componente: Home, descripcion: 'Inicio' },
      { nombre: 'User', componente: User, descripcion: 'Usuario' },
      { nombre: 'Settings', componente: Settings, descripcion: 'Configuración' },
      { nombre: 'Search', componente: Search, descripcion: 'Búsqueda' },
      { nombre: 'Check', componente: Check, descripcion: 'Correcto' },
      { nombre: 'X', componente: X, descripcion: 'Error' },
      { nombre: 'AlertCircle', componente: AlertCircle, descripcion: 'Alerta' },
      { nombre: 'Plus', componente: Plus, descripcion: 'Agregar' },
      { nombre: 'Minus', componente: Minus, descripcion: 'Quitar' },
      { nombre: 'Edit', componente: Edit, descripcion: 'Editar' },
      { nombre: 'Delete', componente: Delete, descripcion: 'Eliminar' },
      { nombre: 'Save', componente: Save, descripcion: 'Guardar' },
      { nombre: 'Download', componente: Download, descripcion: 'Descargar' },
      { nombre: 'Upload', componente: Upload, descripcion: 'Subir' },
      { nombre: 'Mail', componente: Mail, descripcion: 'Correo' },
      { nombre: 'Phone', componente: Phone, descripcion: 'Teléfono' },
      { nombre: 'MessageCircle', componente: MessageCircle, descripcion: 'Mensaje' },
      { nombre: 'Send', componente: Send, descripcion: 'Enviar' },
      { nombre: 'File', componente: File, descripcion: 'Archivo' },
      { nombre: 'Image', componente: Image, descripcion: 'Imagen' },
      { nombre: 'Video', componente: Video, descripcion: 'Video' },
      { nombre: 'Music', componente: Music, descripcion: 'Música' },
      { nombre: 'Star', componente: Star, descripcion: 'Estrella' },
      { nombre: 'Heart', componente: Heart, descripcion: 'Corazón' },
      { nombre: 'Bookmark', componente: Bookmark, descripcion: 'Marcador' },
      { nombre: 'Calendar', componente: Calendar, descripcion: 'Calendario' },
      { nombre: 'Clock', componente: Clock, descripcion: 'Reloj' },
      { nombre: 'MapPin', componente: MapPin, descripcion: 'Ubicación' },
      { nombre: 'Globe', componente: Globe, descripcion: 'Mundo' },
      { nombre: 'Lock', componente: Lock, descripcion: 'Bloqueado' },
      { nombre: 'Unlock', componente: Unlock, descripcion: 'Desbloqueado' },
      { nombre: 'Eye', componente: Eye, descripcion: 'Ver' },
      { nombre: 'EyeOff', componente: EyeOff, descripcion: 'Ocultar' },
      { nombre: 'Loading', componente: Loading, descripcion: 'Cargando' }
    ],
    heroicons: [
      { nombre: 'HomeIcon', componente: HomeIcon, descripcion: 'Inicio' },
      { nombre: 'UserIcon', componente: UserIcon, descripcion: 'Usuario' },
      { nombre: 'CogIcon', componente: CogIcon, descripcion: 'Configuración' },
      { nombre: 'SearchIcon', componente: SearchIcon, descripcion: 'Búsqueda' },
      { nombre: 'CheckIcon', componente: CheckIcon, descripcion: 'Correcto' },
      { nombre: 'XMarkIcon', componente: XMarkIcon, descripcion: 'Error' },
      { nombre: 'ExclamationTriangleIcon', componente: ExclamationTriangleIcon, descripcion: 'Advertencia' },
      { nombre: 'PlusIcon', componente: PlusIcon, descripcion: 'Agregar' },
      { nombre: 'MinusIcon', componente: MinusIcon, descripcion: 'Quitar' },
      { nombre: 'PencilIcon', componente: PencilIcon, descripcion: 'Editar' },
      { nombre: 'TrashIcon', componente: TrashIcon, descripcion: 'Eliminar' },
      { nombre: 'ArrowLeftIcon', componente: ArrowLeftIcon, descripcion: 'Izquierda' },
      { nombre: 'ArrowRightIcon', componente: ArrowRightIcon, descripcion: 'Derecha' },
      { nombre: 'ArrowUpIcon', componente: ArrowUpIcon, descripcion: 'Arriba' },
      { nombre: 'ArrowDownIcon', componente: ArrowDownIcon, descripcion: 'Abajo' }
    ],
    'react-icons': [
      { nombre: 'MdHome', componente: MdHome, descripcion: 'Inicio (Material)' },
      { nombre: 'MdPerson', componente: MdPerson, descripcion: 'Usuario (Material)' },
      { nombre: 'MdSettings', componente: MdSettings, descripcion: 'Configuración (Material)' },
      { nombre: 'MdSearch', componente: MdSearch, descripcion: 'Búsqueda (Material)' },
      { nombre: 'FaHome', componente: FaHome, descripcion: 'Inicio (Font Awesome)' },
      { nombre: 'FaUser', componente: FaUser, descripcion: 'Usuario (Font Awesome)' },
      { nombre: 'FaCog', componente: FaCog, descripcion: 'Configuración (Font Awesome)' },
      { nombre: 'FaSearch', componente: FaSearch, descripcion: 'Búsqueda (Font Awesome)' },
      { nombre: 'FiHome', componente: FiHome, descripcion: 'Inicio (Feather)' },
      { nombre: 'FiUser', componente: FiUser, descripcion: 'Usuario (Feather)' },
      { nombre: 'FiSettings', componente: FiSettings, descripcion: 'Configuración (Feather)' },
      { nombre: 'FiSearch', componente: FiSearch, descripcion: 'Búsqueda (Feather)' },
      { nombre: 'AiOutlineHome', componente: AiOutlineHome, descripcion: 'Inicio (Ant Design)' },
      { nombre: 'AiOutlineUser', componente: AiOutlineUser, descripcion: 'Usuario (Ant Design)' },
      { nombre: 'AiOutlineSetting', componente: AiOutlineSetting, descripcion: 'Configuración (Ant Design)' }
    ],
    tabler: [
      { nombre: 'IconHome', componente: IconHome, descripcion: 'Inicio' },
      { nombre: 'IconUser', componente: IconUser, descripcion: 'Usuario' },
      { nombre: 'IconSettings', componente: IconSettings, descripcion: 'Configuración' },
      { nombre: 'IconSearch', componente: IconSearch, descripcion: 'Búsqueda' },
      { nombre: 'IconCheck', componente: IconCheck, descripcion: 'Correcto' },
      { nombre: 'IconX', componente: IconX, descripcion: 'Error' },
      { nombre: 'IconAlertCircle', componente: IconAlertCircle, descripcion: 'Alerta' },
      { nombre: 'IconPlus', componente: IconPlus, descripcion: 'Agregar' },
      { nombre: 'IconMinus', componente: IconMinus, descripcion: 'Quitar' },
      { nombre: 'IconEdit', componente: IconEdit, descripcion: 'Editar' },
      { nombre: 'IconTrash', componente: IconTrash, descripcion: 'Eliminar' },
      { nombre: 'IconDownload', componente: IconDownload, descripcion: 'Descargar' }
    ],
    iconify: [
      { nombre: 'mdi:home', descripcion: 'Inicio (Material Design)' },
      { nombre: 'mdi:account', descripcion: 'Usuario (Material Design)' },
      { nombre: 'mdi:cog', descripcion: 'Configuración (Material Design)' },
      { nombre: 'mdi:magnify', descripcion: 'Búsqueda (Material Design)' },
      { nombre: 'mdi:check', descripcion: 'Correcto (Material Design)' },
      { nombre: 'mdi:close', descripcion: 'Error (Material Design)' },
      { nombre: 'mdi:alert-circle', descripcion: 'Alerta (Material Design)' },
      { nombre: 'mdi:plus', descripcion: 'Agregar (Material Design)' },
      { nombre: 'mdi:minus', descripcion: 'Quitar (Material Design)' },
      { nombre: 'mdi:pencil', descripcion: 'Editar (Material Design)' },
      { nombre: 'mdi:delete', descripcion: 'Eliminar (Material Design)' },
      { nombre: 'mdi:download', descripcion: 'Descargar (Material Design)' },
      { nombre: 'fa:home', descripcion: 'Inicio (Font Awesome)' },
      { nombre: 'fa:user', descripcion: 'Usuario (Font Awesome)' },
      { nombre: 'fa:cog', descripcion: 'Configuración (Font Awesome)' },
      { nombre: 'fa:search', descripcion: 'Búsqueda (Font Awesome)' },
      { nombre: 'fe:home', descripcion: 'Inicio (Feather)' },
      { nombre: 'fe:user', descripcion: 'Usuario (Feather)' },
      { nombre: 'fe:settings', descripcion: 'Configuración (Feather)' },
      { nombre: 'fe:search', descripcion: 'Búsqueda (Feather)' }
    ]
  };

  const iconosActuales = iconosPorLibreria[libreriaActiva] || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎨 Demo de Librerías de Iconos
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Demostración de todas las librerías de iconos instaladas en el proyecto CSDT
        </p>
        
        {/* Selector de librerías */}
        <div className="flex flex-wrap gap-2 mb-6">
          {librerias.map(lib => (
            <button
              key={lib.id}
              onClick={() => setLibreriaActiva(lib.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                libreriaActiva === lib.id
                  ? `bg-${lib.color}-500 text-white`
                  : `bg-gray-200 text-gray-700 hover:bg-${lib.color}-100`
              }`}
            >
              {lib.nombre}
            </button>
          ))}
        </div>

        {/* Información de la librería activa */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            {librerias.find(lib => lib.id === libreriaActiva)?.nombre}
          </h3>
          <p className="text-blue-700">
            {libreriaActiva === 'lucide' && '1,400+ iconos modernos y consistentes'}
            {libreriaActiva === 'heroicons' && '300+ iconos diseñados por Tailwind UI'}
            {libreriaActiva === 'react-icons' && '10,000+ iconos de múltiples librerías populares'}
            {libreriaActiva === 'tabler' && '4,000+ iconos SVG gratuitos y de código abierto'}
            {libreriaActiva === 'iconify' && '200,000+ iconos universales de múltiples fuentes'}
          </p>
        </div>
      </div>

      {/* Grid de iconos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {iconosActuales.map((icono, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            <div className="mb-2">
              {libreriaActiva === 'iconify' ? (
                <Icon 
                  icon={icono.nombre} 
                  className="w-8 h-8 text-gray-700"
                />
              ) : (
                <icono.componente 
                  className="w-8 h-8 text-gray-700"
                />
              )}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900 mb-1">
                {icono.nombre}
              </p>
              <p className="text-xs text-gray-500">
                {icono.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          📊 Estadísticas de Instalación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Librerías Instaladas</h4>
            <p className="text-2xl font-bold text-blue-600">10</p>
            <p className="text-sm text-gray-600">Paquetes principales</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Iconos Disponibles</h4>
            <p className="text-2xl font-bold text-green-600">200,000+</p>
            <p className="text-sm text-gray-600">Total estimado</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Versiones</h4>
            <p className="text-2xl font-bold text-purple-600">Latest</p>
            <p className="text-sm text-gray-600">Todas actualizadas</p>
          </div>
        </div>
      </div>

      {/* Código de ejemplo */}
      <div className="mt-8 bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          💻 Código de Ejemplo
        </h3>
        <pre className="text-green-400 text-sm overflow-x-auto">
          <code>{`// Importar iconos de Lucide React
import { Home, User, Settings } from 'lucide-react';

// Usar en componentes
function MiComponente() {
  return (
    <div className="flex items-center gap-2">
      <Home size={24} color="blue" />
      <User size={24} color="green" />
      <Settings size={24} color="red" />
    </div>
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
};

export default IconosDemo;
