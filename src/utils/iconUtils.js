/**
 * Utilidades para iconos - Colección completa de librerías de iconos
 * Incluye: Lucide React, Heroicons, React Icons, Tabler Icons, Iconify
 */

// Importaciones de Lucide React (más de 1,400 iconos)
export {
  // Iconos básicos
  Check, X, AlertCircle, AlertTriangle, Info, HelpCircle,
  // Navegación
  Home, Menu, Settings, User, Users, Search, Filter,
  // Acciones
  Edit, Delete, Save, Download, Upload, Copy, Share,
  // Estado
  Loading, Success, Error, Warning, Info as InfoIcon,
  // Comunicación
  Mail, Phone, MessageCircle, Send, Reply,
  // Archivos
  File, FileText, Image, Video, Music, Archive,
  // Navegación web
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  // Social
  Facebook, Twitter, Instagram, Linkedin, Github,
  // Utilidades
  Plus, Minus, Star, Heart, Bookmark, Calendar,
  Clock, MapPin, Globe, Lock, Unlock, Eye, EyeOff,
  // Más iconos disponibles...
} from 'lucide-react';

// Importaciones de Heroicons (iconos de Tailwind UI)
export {
  // Heroicons Outline
  HomeIcon, UserIcon, CogIcon, SearchIcon,
  // Heroicons Solid
  HomeIcon as HomeSolid, UserIcon as UserSolid,
  // Más iconos disponibles...
} from '@heroicons/react/24/outline';

// Importaciones de React Icons (más de 10,000 iconos)
export {
  // Material Design
  MdHome, MdPerson, MdSettings, MdSearch,
  // Font Awesome
  FaHome, FaUser, FaCog, FaSearch,
  // Feather
  FiHome, FiUser, FiSettings, FiSearch,
  // Más iconos disponibles...
} from 'react-icons/md';

// Importaciones de Tabler Icons (más de 4,000 iconos)
export {
  IconHome, IconUser, IconSettings, IconSearch,
  IconCheck, IconX, IconAlertCircle,
  // Más iconos disponibles...
} from '@tabler/icons-react';

// Utilidad para obtener iconos dinámicamente
export const getIcon = (iconName, library = 'lucide') => {
  const iconLibraries = {
    lucide: () => import('lucide-react'),
    heroicons: () => import('@heroicons/react/24/outline'),
    reactIcons: () => import('react-icons/md'),
    tabler: () => import('@tabler/icons-react'),
  };

  return iconLibraries[library]?.();
};

// Configuración de iconos por defecto
export const defaultIcons = {
  success: 'Check',
  error: 'X',
  warning: 'AlertTriangle',
  info: 'Info',
  loading: 'Loading',
  home: 'Home',
  user: 'User',
  settings: 'Settings',
  search: 'Search',
  edit: 'Edit',
  delete: 'Delete',
  save: 'Save',
  add: 'Plus',
  remove: 'Minus',
};

// Utilidad para renderizar iconos con props personalizadas
export const IconRenderer = ({ 
  name, 
  library = 'lucide', 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => {
  const IconComponent = getIcon(name, library);
  
  if (!IconComponent) {
    console.warn(`Icono ${name} no encontrado en la librería ${library}`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      {...props}
    />
  );
};

// Exportar todas las librerías para uso directo
export { default as LucideReact } from 'lucide-react';
export { default as Heroicons } from '@heroicons/react/24/outline';
export { default as ReactIcons } from 'react-icons';
export { default as TablerIcons } from '@tabler/icons-react';
export { default as Iconify } from '@iconify/react';

// Información sobre las librerías instaladas
export const iconLibrariesInfo = {
  lucide: {
    name: 'Lucide React',
    version: '0.544.0',
    count: '1,400+ iconos',
    description: 'Iconos modernos y consistentes, fork de Feather Icons'
  },
  heroicons: {
    name: 'Heroicons',
    version: '2.2.0',
    count: '300+ iconos',
    description: 'Iconos de Tailwind UI, diseñados por Steve Schoger'
  },
  reactIcons: {
    name: 'React Icons',
    version: '5.5.0',
    count: '10,000+ iconos',
    description: 'Colección masiva de iconos de múltiples librerías'
  },
  tabler: {
    name: 'Tabler Icons',
    version: '3.35.0',
    count: '4,000+ iconos',
    description: 'Iconos SVG gratuitos y de código abierto'
  },
  iconify: {
    name: 'Iconify',
    version: '6.0.2',
    count: '200,000+ iconos',
    description: 'Plataforma universal de iconos con múltiples formatos'
  }
};

export default {
  getIcon,
  IconRenderer,
  defaultIcons,
  iconLibrariesInfo
};
