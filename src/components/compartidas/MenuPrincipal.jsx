import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import NotificacionesUsuario from './NotificacionesUsuario';
import UserDebug from './UserDebug';
import { 
  obtenerNombreCompleto, 
  obtenerIconoRol, 
  obtenerColorRol,
  obtenerNombreRol 
} from '@/utils/userMapper';

const MenuPrincipal = () => {
  const { user, login, register, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroMode, setIsRegistroMode] = useState(false);
  const [mostrarSeleccionRol, setMostrarSeleccionRol] = useState(false);
  const [loginData, setLoginData] = useState({ 
    usuario: '', 
    contrasena: '',
    email: '',
    confirmarContrasena: '',
    nombre: '',
    rol: 'cliente',
    tipoDocumento: 'cc',
    numeroDocumento: '',
    telefono: ''
  });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const location = useLocation();
  const menuRef = useRef(null);

  // Función para cerrar el menú
  const cerrarMenu = () => {
    setIsMenuOpen(false);
  };

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        cerrarMenu();
      }
    };

    // Efecto para cerrar el menú al presionar Escape
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        cerrarMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Páginas públicas - Organizadas según estructura de carpeta @paginas/
  const paginasPublicas = [
    // 01 - INNOVACIÓN E INTELIGENCIA ARTIFICIAL
    { name: 'Centro Innovación IA', href: '/centro-innovacion-ia', icon: '🧠', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo IA', href: '/consejo-ia', icon: '🤖', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo EtnoIA', href: '/consejo-etnoia', icon: '🌍', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'IA Especialistas', href: '/ia-especialistas', icon: '🔬', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Auditoría Forense', href: '/auditoria-forense', icon: '🔍', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Territorial IA', href: '/territorial-ia', icon: '🗺️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Geo Dashboard', href: '/geo-dashboard', icon: '🗺️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Monitor IA', href: '/monitor-ia', icon: '📊', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo Ética IA', href: '/consejo-etica-ia', icon: '🛡️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Planes Minero Ambiental', href: '/planes-minero-ambiental', icon: '⛏️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo Territorial', href: '/consejo-territorial', icon: '🏛️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Veeduría IA', href: '/veeduria-ia', icon: '👁️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo Social IA', href: '/consejo-social-ia', icon: '👥', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo Minero Ambiental IA', href: '/consejo-minero-ambiental-ia', icon: '⛰️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Herramientas IA', href: '/herramientas-ia', icon: '🛠️', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    { name: 'Consejo Ambiental IA', href: '/consejo-ambiental-ia', icon: '🌳', category: '01 - INNOVACIÓN E IA', color: 'purple' },
    
    // 02 - RAMA JUDICIAL
    { name: 'Justicia Civil', href: '/justicia-civil', icon: '⚖️', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Justicia Penal', href: '/justicia-penal', icon: '🔨', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Justicia Laboral', href: '/justicia-laboral', icon: '👷', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Justicia Familia', href: '/justicia-familia', icon: '👨‍👩‍👧', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Justicia Administrativa', href: '/justicia-administrativa', icon: '🏛️', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Justicia de Paz', href: '/justicia-paz', icon: '🕊️', category: '02 - RAMA JUDICIAL', color: 'red' },
    { name: 'Jurisdicción Especial Paz', href: '/jurisdiccion-especial-paz', icon: '🕊️', category: '02 - RAMA JUDICIAL', color: 'red' },
    
    // 03 - ACCIONES CONSTITUCIONALES
    { name: 'Acción de Tutela', href: '/accion-tutela', icon: '🛡️', category: '03 - ACCIONES CONSTITUCIONALES', color: 'blue' },
    { name: 'Habeas Corpus', href: '/habeas-corpus', icon: '🔒', category: '03 - ACCIONES CONSTITUCIONALES', color: 'blue' },
    { name: 'Habeas Data', href: '/habeas-data', icon: '📊', category: '03 - ACCIONES CONSTITUCIONALES', color: 'blue' },
    { name: 'Acción Popular', href: '/accion-popular', icon: '👥', category: '03 - ACCIONES CONSTITUCIONALES', color: 'blue' },
    { name: 'Acción de Cumplimiento', href: '/accion-cumplimiento', icon: '📋', category: '03 - ACCIONES CONSTITUCIONALES', color: 'blue' },
    
    // 04 - RAMA EJECUTIVA
    { name: 'Presidencia República', href: '/presidencia', icon: '🏛️', category: '04 - RAMA EJECUTIVA', color: 'orange' },
    
    // 05 - RAMA LEGISLATIVA
    { name: 'Congreso República', href: '/congreso', icon: '🏛️', category: '05 - RAMA LEGISLATIVA', color: 'green' },
    
    // 06 - ÓRGANOS DE CONTROL
    { name: 'Procuraduría General', href: '/procuraduria', icon: '⚖️', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Defensoría del Pueblo', href: '/defensoria', icon: '🛡️', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Contraloría General', href: '/contraloria', icon: '📊', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Fiscalía General', href: '/fiscalia', icon: '🔍', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'PQRSFD', href: '/pqrsfd', icon: '📝', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Vigilancia de la Gestión Pública', href: '/veeduria-gestion-publica', icon: '👁️', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Control Social de Contratación', href: '/veeduria-contratacion-publica', icon: '🔍', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Defensa de Derechos Ambientales', href: '/veeduria-derechos-ambientales', icon: '🛡️', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Rendición de Cuentas', href: '/veeduria-rendicion-cuentas', icon: '📋', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    { name: 'Promoción de Participación', href: '/veeduria-participacion-ciudadana', icon: '📣', category: '06 - ÓRGANOS DE CONTROL', color: 'indigo' },
    
    // 07 - PARTICIPACIÓN CIUDADANA
    { name: 'Consulta Popular', href: '/consulta-popular', icon: '🗳️', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    { name: 'Referendo', href: '/referendo', icon: '📊', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    { name: 'Plebiscito', href: '/plebiscito', icon: '🗳️', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    { name: 'Revocatoria de Mandato', href: '/revocatoria-mandato', icon: '🔄', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    { name: 'Cabildo Abierto', href: '/cabildo-abierto', icon: '👥', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    { name: 'Iniciativa Popular', href: '/iniciativa-popular', icon: '✍️', category: '07 - PARTICIPACIÓN CIUDADANA', color: 'green' },
    
    // 08 - DERECHOS ÉTNICOS
    { name: 'Pueblos Indígenas', href: '/pueblos-indigenas', icon: '🏛️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Comunidades Afro', href: '/comunidades-afro', icon: '🌍', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Pueblos Rom', href: '/pueblos-rom', icon: '🎪', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Derechos Territoriales', href: '/derechos-territoriales', icon: '🗺️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Declaraciones Ampliación Territorial', href: '/declaraciones-ampliacion-territorial', icon: '📜', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Consulta Previa Completa', href: '/consulta-previa', icon: '🤝', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Consentimiento Previo Libre Informado', href: '/consentimiento-previo-libre-informado', icon: '📋', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Planes Etnodesarrollo', href: '/planes-etnodesarrollo', icon: '🌿', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Planes Vida Comunitarios', href: '/planes-vida-comunitarios', icon: '👥', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Formulación Proyectos Étnicos', href: '/formulacion-proyectos-etnicos', icon: '📝', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Jurisdicción Especial Indígena', href: '/jurisdiccion-indigena', icon: '⚖️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Gobierno Propio', href: '/gobierno-propio', icon: '🏛️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Autoridades Tradicionales ETI', href: '/autoridades-tradicionales-eti', icon: '👑', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Entidades Territoriales Indígenas', href: '/entidades-territoriales-indigenas', icon: '🏢', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Análisis Étnico IA', href: '/analisis-etnico-ia', icon: '🤖', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Seguimiento Evaluación Étnica', href: '/seguimiento-evaluacion-etnica', icon: '📊', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Derechos Étnicos Adicionales', href: '/derechos-etnicos-adicionales', icon: '📋', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Tipología Casos Étnicos', href: '/tipologia-casos-etnicos', icon: '📂', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Marco Jurídico Étnico', href: '/marco-juridico-etnico', icon: '⚖️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Funcionalidades IA Étnicas', href: '/funcionalidades-ia-etnicas', icon: '🤖', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Dashboard Casos Activos', href: '/dashboard-casos-activos', icon: '📊', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Expediente Digital Étnico', href: '/expediente-digital-etnico', icon: '📁', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Formulario Denuncia Vulneración', href: '/formulario-denuncia-vulneracion', icon: '📝', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Formulario Solicitud Consulta Previa', href: '/formulario-solicitud-consulta-previa', icon: '📄', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    { name: 'Ampliación Territorial Étnica', href: '/ampliacion-territorial-etnica', icon: '🗺️', category: '08 - DERECHOS ÉTNICOS', color: 'purple' },
    
    // 09 - GESTIÓN INSTITUCIONAL
    { name: 'Inicio', href: '/', icon: '🏠', category: '09 - GESTIÓN INSTITUCIONAL', color: 'blue' },
    { name: 'Institucional', href: '/institucional', icon: '🏛️', category: '09 - GESTIÓN INSTITUCIONAL', color: 'blue' },
    { name: 'Proyectos', href: '/proyectos', icon: '🏗️', category: '09 - GESTIÓN INSTITUCIONAL', color: 'blue' },
    { name: 'Donaciones', href: '/donaciones', icon: '💰', category: '09 - GESTIÓN INSTITUCIONAL', color: 'blue' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊', category: '09 - GESTIÓN INSTITUCIONAL', color: 'blue' },
    
    // 10 - SERVICIOS COMPARTIDOS (se muestra en otra sección)
    
    // 11 - DICTÁMENES Y PERITAJES
    // 11.1 - Reconocimiento Territorial
    { name: 'Reconocimiento Directo', href: '/reconocimiento-directo', icon: '📍', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Reconocimiento Indirecto', href: '/reconocimiento-indirecto', icon: '🔍', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Reconocimiento Social', href: '/reconocimiento-social', icon: '👥', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Timeline Territorial', href: '/timeline-territorial', icon: '⏱️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Gestión Conflictos', href: '/gestion-conflictos', icon: '⚖️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 11.2 - Catastro Predial
    { name: 'Catastro Comunitario', href: '/catastro-comunitario', icon: '🏘️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Catastro Participativo', href: '/catastro-participativo', icon: '🤝', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Catastro Indirecto', href: '/catastro-indirecto', icon: '📋', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Comparativo Catastral', href: '/comparativo-catastral', icon: '📊', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 11.3 - Catastro Minero
    { name: 'Mapa Minero Nacional', href: '/mapa-minero-nacional', icon: '🗺️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Superposición Minero', href: '/superposicion-minero', icon: '⛏️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Certificados Mineros', href: '/certificados-mineros', icon: '📜', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Proyectos Extractivos', href: '/proyectos-extractivos', icon: '🏗️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 11.4 - Componente Ambiental
    { name: 'Mapa Ambiental Interactivo', href: '/mapa-ambiental-interactivo', icon: '🗺️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Diagnóstico Ambiental', href: '/diagnostico-ambiental', icon: '🔬', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Proyectos Ambientales', href: '/proyectos-ambientales', icon: '🌳', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Planes Manejo Ambiental', href: '/planes-manejo-ambiental', icon: '📋', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 11.5 - Dimensión Étnica
    { name: 'Consulta Previa Dictamen', href: '/consulta-previa-dictamen', icon: '🤝', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Certificados Étnicos', href: '/certificados-etnicos', icon: '📜', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Ampliación Saneamiento', href: '/ampliacion-saneamiento', icon: '🏘️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 11.6 - Dimensión Social
    { name: 'Mapa Cultural', href: '/mapa-cultural', icon: '🗺️', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Repositorio Saberes', href: '/repositorio-saberes', icon: '📚', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Testimonios Memoria', href: '/testimonios-memoria', icon: '🎤', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    { name: 'Participación Social', href: '/participacion-social', icon: '👥', category: '11 - DICTÁMENES Y PERITAJES', color: 'teal' },
    
    // 12 - GESTIÓN DE PROYECTOS - ⚠️ REQUIERE AUTENTICACIÓN ⚠️
    // NOTA: Estas opciones NO se mostrarán en el menú público
    // Solo aparecen en la navegación por rol cuando el usuario está autenticado
  ];

  // Páginas compartidas - Activadas según carpeta 10-servicios-compartidos
  const paginasCompartidas = [
    { name: 'Ayuda', href: '/ayuda', icon: '❓' },
    { name: 'Contacto', href: '/contacto', icon: '📞' },
    { name: 'Documentos', href: '/documentos', icon: '📄' },
    { name: 'Noticias', href: '/noticias', icon: '📰' },
    { name: 'Perfil', href: '/perfil', icon: '👤' },
    { name: 'Términos', href: '/terminos', icon: '📋' },
    { name: 'Convocatorias Públicas', href: '/convocatorias', icon: '📢' }
  ];

  // Obtener navegación según el rol del usuario (JERARQUÍA DE PERMISOS)
  const getNavegacionPorRol = () => {
    if (!user) return [];

    const navegacion = [];

    // Solo mostrar opciones si el usuario está autenticado
    if (user) {
      // Navegación para todos los roles autenticados
      navegacion.push(
        { name: 'Gestión de Proyectos', href: '/gestion-proyectos', icon: '🎯', level: 1 },
        { name: 'Dashboard Unificado', href: '/dashboard-unificado', icon: '📈', level: 1 }
      );
    }

    // Navegación específica por rol
    switch (user.rol) {
      case 'cli': // Cliente
        navegacion.push(
          { name: '--- ÁREA CLIENTE ---', href: '#', icon: '', level: 1, esSeparador: true },
          { name: 'Mis Proyectos', href: '/cliente-proyectos', icon: '👤', level: 1 }
        );
        break;
        
      case 'ope': // Operador
        navegacion.push(
          { name: '--- ÁREA OPERADOR ---', href: '#', icon: '', level: 2, esSeparador: true },
          { name: 'Mis Tareas', href: '/operador-proyectos', icon: '⚙️', level: 2 },
          { name: '--- ÁREA CLIENTE ---', href: '#', icon: '', level: 1, esSeparador: true },
          { name: 'Mis Proyectos', href: '/cliente-proyectos', icon: '👤', level: 1 }
        );
        break;
        
      case 'adm': // Administrador
        navegacion.push(
          { name: '--- ÁREA ADMINISTRADOR ---', href: '#', icon: '', level: 3, esSeparador: true },
          { name: 'Dashboard Admin', href: '/admin-proyectos', icon: '👑', level: 3 },
          { name: 'Crear Proyecto', href: '/crear-proyecto', icon: '➕', level: 3 },
          { name: 'APUs y Cotizaciones', href: '/gestion-apus-cotizaciones', icon: '💰', level: 3 },
          { name: '--- ÁREA OPERADOR ---', href: '#', icon: '', level: 2, esSeparador: true },
          { name: 'Mis Tareas', href: '/operador-proyectos', icon: '⚙️', level: 2 },
          { name: '--- ÁREA CLIENTE ---', href: '#', icon: '', level: 1, esSeparador: true },
          { name: 'Mis Proyectos', href: '/cliente-proyectos', icon: '👤', level: 1 }
        );
        break;
        
      case 'adm_gen': // Administrador General
        navegacion.push(
          { name: '--- ÁREA ADMIN GENERAL ---', href: '#', icon: '', level: 4, esSeparador: true },
          { name: 'Dashboard Admin', href: '/admin-proyectos', icon: '🏛️', level: 4 },
          { name: 'Crear Proyecto', href: '/crear-proyecto', icon: '➕', level: 4 },
          { name: 'APUs y Cotizaciones', href: '/gestion-apus-cotizaciones', icon: '💰', level: 4 },
          { name: '--- ÁREA ADMINISTRADOR ---', href: '#', icon: '', level: 3, esSeparador: true },
          { name: 'Dashboard Admin', href: '/admin-proyectos', icon: '👑', level: 3 },
          { name: '--- ÁREA OPERADOR ---', href: '#', icon: '', level: 2, esSeparador: true },
          { name: 'Mis Tareas', href: '/operador-proyectos', icon: '⚙️', level: 2 },
          { name: '--- ÁREA CLIENTE ---', href: '#', icon: '', level: 1, esSeparador: true },
          { name: 'Mis Proyectos', href: '/cliente-proyectos', icon: '👤', level: 1 }
        );
        break;
        
      default:
        break;
    }

    return navegacion;
  };

  const isActive = (path) => location.pathname === path;

  const handleSeleccionarRol = (rol) => {
    setLoginData({...loginData, rol: rol});
    setMostrarSeleccionRol(false);
    setIsRegistroMode(true);
    setIsLoginOpen(true);
  };

  const handleAbrirRegistro = () => {
    setMostrarSeleccionRol(true);
    setIsLoginOpen(false);
    setLoginError('');
    setLoginSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    
    try {
      if (isRegistroMode) {
        // Modo registro - Validaciones adicionales
        if (loginData.contrasena !== loginData.confirmarContrasena) {
          setLoginError('Las contraseñas no coinciden');
          return;
        }
        
        // Validar que todos los campos estén llenos
        if (!loginData.nombre || !loginData.email || 
            !loginData.contrasena || !loginData.numeroDocumento) {
          setLoginError('Todos los campos son obligatorios');
          return;
        }
        
        // Validar longitud de contraseña
        if (loginData.contrasena.length < 8) {
          setLoginError('La contraseña debe tener al menos 8 caracteres');
          return;
        }
        
        // Mapear rol al formato esperado por el backend
        const rolMap = {
          'cliente': 'cli',
          'operador': 'ope',
          'administrador': 'adm',
          'superadmin': 'sup'
        };
        
        const rolFinal = rolMap[loginData.rol] || loginData.rol;
        
        // Usar el método register del AuthContext con los campos correctos
        const result = await register({
          name: loginData.nombre,
          email: loginData.email,
          password: loginData.contrasena,
          rol: rolFinal,
          tipo_documento: loginData.tipoDocumento,
          documento: loginData.numeroDocumento,
          telefono: loginData.telefono || ''
        });
        
        if (result.success) {
          // Registro exitoso - La sesión se inicia automáticamente
          setLoginSuccess('¡Registro exitoso! Bienvenido a CSDT.');
          
          // Cerrar modal y limpiar formulario después de 1 segundo
          setTimeout(() => {
            setIsLoginOpen(false);
            setIsRegistroMode(false);
            setMostrarSeleccionRol(false);
            setLoginData({ 
              usuario: '', 
              contrasena: '',
              email: '',
              confirmarContrasena: '',
              nombre: '',
              rol: 'cliente',
              tipoDocumento: 'cc',
              numeroDocumento: '',
              telefono: ''
            });
            setLoginSuccess('');
          }, 1500);
        } else {
          setLoginError(result.message || 'Error al registrar usuario');
        }
      } else {
        // Modo login
        if (!loginData.email || !loginData.contrasena) {
          setLoginError('Email y contraseña son obligatorios');
          return;
        }
        
        const result = await login(loginData.email, loginData.contrasena);
        
        if (result.success) {
          setIsLoginOpen(false);
          setLoginData({ 
            usuario: '', 
            contrasena: '',
            email: '',
            confirmarContrasena: '',
            nombre: '',
            rol: 'cliente',
            tipoDocumento: 'cc',
            numeroDocumento: '',
            telefono: ''
          });
          setLoginError('');
        } else {
          setLoginError(result.message || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error en handleLogin:', error);
      
      if (error.message) {
        setLoginError(error.message);
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Manejo de errores de validación de Laravel
        const errores = error.response.data.errors;
        const mensajes = Object.values(errores).flat().join(', ');
        setLoginError(mensajes);
      } else {
        setLoginError('Error de conexión. Verifica tu conexión a internet e intenta nuevamente.');
      }
    }
  };

  const toggleRegistroMode = () => {
    if (!isRegistroMode) {
      // Si no está en modo registro, mostrar selección de rol
      setMostrarSeleccionRol(true);
      setIsLoginOpen(false);
    } else {
      // Si está en modo registro, volver a login
      setIsRegistroMode(false);
      setMostrarSeleccionRol(false);
      setIsLoginOpen(true);
    }
    setLoginError('');
    setLoginSuccess('');
    setLoginData({ 
      usuario: '', 
      contrasena: '',
      email: '',
      confirmarContrasena: '',
      nombre: '',
      rol: 'cliente',
      tipoDocumento: 'cc',
      numeroDocumento: '',
      telefono: ''
    });
  };

  const handleLogout = () => {
    logout();
    cerrarMenu();
  };

  const navegacionPorRol = user ? getNavegacionPorRol() : [];

  // Agrupar páginas públicas por categoría
  const paginasPorCategoria = paginasPublicas.reduce((acc, pagina) => {
    if (!acc[pagina.category]) {
      acc[pagina.category] = [];
    }
    acc[pagina.category].push(pagina);
    return acc;
  }, {});

  return (
    <>
      {/* Estilos CSS para animaciones y responsividad */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
          }

          /* Responsividad para dispositivos móviles */
          @media (max-width: 768px) {
            .menu-dropdown {
              width: 95vw !important;
              max-width: 95vw !important;
              left: 2.5vw !important;
              right: 2.5vw !important;
              padding: 12px !important;
              transform: translateX(-2.5vw) !important;
            }
            
            .menu-button {
              padding: 8px 12px !important;
              font-size: 12px !important;
              min-width: 130px !important;
              max-width: 200px !important;
            }
            
            .logo-container {
              gap: 8px !important;
            }
            
            .logo-icon {
              width: 45px !important;
              height: 45px !important;
              font-size: 16px !important;
            }
            
            .logo-text h1 {
              font-size: 16px !important;
            }
            
            .logo-text p {
              font-size: 12px !important;
            }
          }

          @media (max-width: 480px) {
            .menu-dropdown {
              width: 98vw !important;
              max-width: 98vw !important;
              left: 1vw !important;
              right: 1vw !important;
              padding: 10px !important;
              transform: translateX(-1vw) !important;
            }
            
            .menu-button {
              padding: 6px 10px !important;
              font-size: 11px !important;
              min-width: 110px !important;
              max-width: 180px !important;
            }
            
            .logo-container {
              gap: 6px !important;
            }
            
            .logo-icon {
              width: 40px !important;
              height: 40px !important;
              font-size: 14px !important;
            }
            
            .logo-text h1 {
              font-size: 14px !important;
            }
            
            .logo-text p {
              font-size: 10px !important;
            }
          }
        `}
      </style>
      
      <header style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
        color: 'white',
        padding: '15px 0',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderBottom: '3px solid #3498db'
      }}>
        <div style={{ 
          maxWidth: '100%', 
          margin: '0 auto', 
          padding: '0 15px',
          width: '100%'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            
            {/* Botón de Usuario/Menú */}
            <div style={{ 
              position: 'relative',
              zIndex: 1001,
              minWidth: 'fit-content'
            }} ref={menuRef}>
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-button"
                  style={{
                  background: user ? 
                    obtenerColorRol(user.rol).gradient : 
                    'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    border: isMenuOpen ? '2px solid #f39c12' : '2px solid rgba(255,255,255,0.3)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    boxShadow: isMenuOpen ? 
                      '0 6px 20px rgba(243, 156, 18, 0.4)' : 
                      '0 4px 15px rgba(52, 152, 219, 0.3)',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'translateY(-2px)' : 'translateY(0)',
                    whiteSpace: 'nowrap',
                    minWidth: '150px',
                    maxWidth: '280px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  title={user ? `${obtenerNombreRol(user.rol)} - ${obtenerNombreCompleto(user)}\n${user.email || user.correo || ''}` : 'Menú Principal'}
                >
                {user ? (
                  <>
                    <span>{obtenerIconoRol(user.rol)}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                      {obtenerNombreCompleto(user)}
                    </span>
                    <span>{isMenuOpen ? '▲' : '▼'}</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Menú</span>
                    <span>{isMenuOpen ? '▲' : '▼'}</span>
                  </>
                )}
                </button>

              {/* Dropdown del Menú - Directamente debajo del botón */}
              {isMenuOpen && (
            <div 
              className="menu-dropdown"
              style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '8px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              padding: '15px',
              width: 'max(300px, 100%)',
              minWidth: '280px',
              maxWidth: '90vw',
              zIndex: 1000,
              maxHeight: '75vh',
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              animation: 'slideDown 0.3s ease-out',
              transformOrigin: 'top'
            }}>
                  
                  {/* Botones de Login y Registro (si no está logueado) */}
              {!user && (
                    <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                          cerrarMenu();
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                      color: 'white',
                          border: 'none',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                      boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
                      transition: 'all 0.3s ease',
                      marginBottom: '6px'
                    }}
                  >
                    🔐 Iniciar Sesión
                  </button>
                  
                  <button
                    onClick={() => {
                      handleAbrirRegistro();
                          cerrarMenu();
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                      color: 'white',
                          border: 'none',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                      boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📝 Registrarse
                  </button>
                  
                </div>
              )}

              {/* Información del Usuario (si está logueado) */}
              {user && (
                <div style={{
                      textAlign: 'center',
                      borderBottom: '2px solid #e5e7eb',
                      paddingBottom: '12px',
                      marginBottom: '15px',
                      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      borderRadius: '10px',
                      padding: '15px'
                    }}>
                      <div style={{
                        width: '55px',
                        height: '55px',
                        background: obtenerColorRol(user.rol).gradient,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        margin: '0 auto 12px',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: '3px solid white'
                      }}>
                        {obtenerIconoRol(user.rol)}
                      </div>
                      <h3 style={{
                        margin: '0 0 5px 0',
                        color: '#1f2937',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                    {obtenerNombreCompleto(user)}
                      </h3>
                      <p style={{
                        margin: '0 0 8px 0',
                        color: '#3b82f6',
                        fontSize: 'clamp(10px, 2.2vw, 12px)',
                        fontWeight: '600',
                        background: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        border: '1px solid #e5e7eb'
                      }}>
                        📧 {user.email || user.correo || 'Sin correo'}
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        marginTop: '8px'
                      }}>
                        <span style={{
                          color: '#6b7280',
                          fontSize: 'clamp(11px, 2.5vw, 13px)',
                          fontWeight: '600',
                          background: 'white',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          {obtenerNombreRol(user.rol)}
                        </span>
                        <span style={{
                          color: '#9ca3af',
                          fontSize: 'clamp(9px, 2vw, 10px)',
                          background: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb'
                        }}>
                          {user.rol === 'cli' && 'Nivel 1'}
                          {user.rol === 'ope' && 'Nivel 2'}
                          {user.rol === 'adm' && 'Nivel 3'}
                          {user.rol === 'adm_gen' && 'Nivel 4'}
                        </span>
                      </div>
                </div>
              )}

              {/* Botón de Logout - Movido arriba */}
              {user && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <NotificacionesUsuario />
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    color: 'white',
                          border: 'none',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                    boxShadow: '0 3px 12px rgba(231, 76, 60, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🚪 Cerrar Sesión
                </button>
                    </div>
                  )}

                  {/* Páginas Públicas por Categorías - Excluyendo Gestión de Proyectos */}
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #3498db',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '5px'
                }}>
                  🌐 Páginas Públicas
                    </h4>
                    
                    {Object.entries(paginasPorCategoria)
                      .filter(([categoria]) => categoria !== '12 - GESTIÓN DE PROYECTOS')
                      .map(([categoria, paginas]) => (
                      <div key={categoria} style={{ marginBottom: '10px' }}>
                        <h5 style={{
                          fontSize: 'clamp(9px, 2vw, 11px)',
                          fontWeight: 'bold',
                          color: '#6b7280',
                          marginBottom: '5px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {categoria}
                        </h5>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                          gap: '4px',
                          marginBottom: '6px'
                        }}>
                          {paginas.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                              onClick={cerrarMenu}
                        style={{
                          display: 'flex',
                                flexDirection: 'column',
                          alignItems: 'center',
                                padding: '6px 3px',
                                borderRadius: '5px',
                          textDecoration: 'none',
                          color: isActive(item.href) ? '#ffffff' : '#374151',
                          backgroundColor: isActive(item.href) ? '#3b82f6' : '#f8fafc',
                                fontSize: 'clamp(8px, 1.8vw, 10px)',
                                fontWeight: '500',
                                border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease',
                                textAlign: 'center',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(item.href)) {
                            e.target.style.backgroundColor = '#e5e7eb';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.href)) {
                            e.target.style.backgroundColor = '#f8fafc';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                              <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                              <span>{item.name}</span>
                      </Link>
                          ))}
                </div>
                      </div>
                    ))}
              </div>

              {/* Páginas Compartidas - Activadas */}
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #9b59b6',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '5px'
                }}>
                  🤝 Páginas Compartidas
                    </h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
                      gap: '4px' 
                    }}>
                      {paginasCompartidas.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                          onClick={cerrarMenu}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                            alignItems: 'center',
                            padding: '6px 4px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        color: '#374151',
                        backgroundColor: '#f8fafc',
                            fontSize: 'clamp(8px, 1.8vw, 10px)',
                            fontWeight: '500',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                            textAlign: 'center',
                        cursor: 'pointer'
                          }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#e5e7eb';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                        >
                          <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                          <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

                  {/* Navegación por Rol (Solo si está logueado y tiene permisos) */}
                  {user && navegacionPorRol.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '10px',
                    paddingBottom: '5px',
                    borderBottom: '2px solid #e67e22',
                    display: 'flex',
                    alignItems: 'center',
                        gap: '5px'
                      }}>
                        {user.rol === 'cli' && '👤 Área Cliente (N1)'}
                        {user.rol === 'ope' && '⚙️ Área Operador (N2)'}
                        {user.rol === 'adm' && '👑 Área Admin (N3)'}
                        {user.rol === 'adm_gen' && '🏛️ Área Admin General (N4)'}
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', 
                        gap: '4px' 
                      }}>
                        {navegacionPorRol.map((item, index) => {
                      if (item.esSeparador) {
                        return (
                          <div
                                key={index}
                            style={{
                              gridColumn: '1 / -1',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 6px 6px 6px',
                              margin: '6px 0 3px 0',
                                  borderTop: '2px solid #e5e7eb'
                                }}
                              >
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db', marginRight: '8px' }}></div>
                            <span style={{
                              fontWeight: 'bold',
                                  fontSize: 'clamp(8px, 1.8vw, 10px)',
                              color: '#6b7280',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              backgroundColor: '#f8fafc',
                              padding: '3px 8px',
                              borderRadius: '10px',
                                  border: '1px solid #e5e7eb'
                            }}>
                              {item.name.replace('--- ', '').replace(' ---', '')}
                            </span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db', marginLeft: '8px' }}></div>
                          </div>
                        );
                      }

                      return (
                        <Link
                              key={index}
                          to={item.href}
                              onClick={cerrarMenu}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                                alignItems: 'center',
                                padding: '6px 4px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            color: '#374151',
                                backgroundColor: item.level === 4 ? '#fce7f3' : item.level === 3 ? '#fef3c7' : item.level === 2 ? '#dbeafe' : '#f8fafc',
                                fontSize: 'clamp(8px, 1.8vw, 10px)',
                                fontWeight: '500',
                                border: `1px solid ${item.level === 4 ? '#f9a8d4' : item.level === 3 ? '#fcd34d' : item.level === 2 ? '#93c5fd' : '#e5e7eb'}`,
                            transition: 'all 0.2s ease',
                                textAlign: 'center',
                            cursor: 'pointer'
                              }}
                            onMouseEnter={(e) => {
                              const baseColor = item.level === 4 ? '#fbcfe8' : item.level === 3 ? '#fde68a' : item.level === 2 ? '#bfdbfe' : '#e5e7eb';
                              e.target.style.backgroundColor = baseColor;
                              e.target.style.transform = 'translateY(-1px)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                              const originalColor = item.level === 4 ? '#fce7f3' : item.level === 3 ? '#fef3c7' : item.level === 2 ? '#dbeafe' : '#f8fafc';
                              e.target.style.backgroundColor = originalColor;
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = 'none';
                            }}
                            >
                              <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                              <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

                </div>
              )}
            </div>

            {/* Logo */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 15px)' }}>
            <div className="logo-icon" style={{
                    width: 'clamp(50px, 8vw, 70px)',
                    height: 'clamp(50px, 8vw, 70px)',
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    borderRadius: 'clamp(10px, 2vw, 15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(18px, 4vw, 28px)',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    CSDT
                  </div>
                  <div className="logo-text">
                    <h1 style={{ 
                      margin: 0, 
                      fontSize: 'clamp(14px, 3vw, 22px)', 
                      fontWeight: 'bold',
                      lineHeight: '1.2'
                    }}>
                      CONSEJO SOCIAL DE VEEDURÍA
                    </h1>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 'clamp(10px, 2vw, 15px)', 
                      opacity: 0.9,
                      lineHeight: '1.2'
                    }}>
                      Y DESARROLLO TERRITORIAL
                    </p>
                  </div>
                </div>
                    </Link>
            </div>

            {/* Espacio vacío para balance */}
            <div style={{ width: 'clamp(80px, 15vw, 120px)' }}></div>
          </div>
        </div>
      </header>

      {/* Modal de Selección de Rol */}
      {mostrarSeleccionRol && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 15px 50px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
                Selecciona tu Tipo de Usuario
              </h2>
              <button
                onClick={() => {
                  setMostrarSeleccionRol(false);
                  setIsLoginOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Botón Cliente */}
              <button
                onClick={() => handleSeleccionarRol('cli')}
                  style={{
                  padding: '20px',
                  border: '2px solid #3498db',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>👤</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Cliente</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Acceso básico para consultas y solicitudes
              </div>
                  </div>
                </div>
              </button>

              {/* Botón Operador */}
              <button
                onClick={() => handleSeleccionarRol('ope')}
                  style={{
                  padding: '20px',
                  border: '2px solid #e67e22',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(230, 126, 34, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(230, 126, 34, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>⚙️</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Operador</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Gestión de procesos y atención al cliente
              </div>
                </div>
                </div>
              </button>

              {/* Botón Administrador */}
                <button
                onClick={() => handleSeleccionarRol('adm')}
                  style={{
                  padding: '20px',
                  border: '2px solid #8e44ad',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
                  color: 'white',
                    cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(142, 68, 173, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(142, 68, 173, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(142, 68, 173, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>👑</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Administrador</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Control total del sistema y gestión de usuarios
                    </div>
                  </div>
                </div>
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                onClick={() => {
                  setMostrarSeleccionRol(false);
                  setIsLoginOpen(false);
                }}
                  style={{
                  background: 'none',
                    border: 'none',
                  color: '#6b7280',
                    cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline'
                  }}
                >
                Cancelar
                </button>
              </div>
          </div>
        </div>
      )}




      {/* Modal de Login */}
      {isLoginOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
                {isRegistroMode ? `Registrarse como ${loginData.rol.charAt(0).toUpperCase() + loginData.rol.slice(1)}` : 'Iniciar Sesión'}
              </h2>
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegistroMode(false);
                  setMostrarSeleccionRol(false);
                  setLoginError('');
                  setLoginSuccess('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Campos de registro (solo en modo registro) */}
              {isRegistroMode && (
                <>
                  {/* Rol seleccionado - solo mostrar información */}
                  <div style={{
                    padding: '12px 15px',
                    backgroundColor: loginData.rol === 'cliente' ? '#e3f2fd' : 
                                   loginData.rol === 'operador' ? '#fff3e0' : '#f3e5f5',
                    border: `2px solid ${loginData.rol === 'cliente' ? '#3498db' : 
                                       loginData.rol === 'operador' ? '#e67e22' : '#8e44ad'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ marginRight: '10px' }}>
                        {loginData.rol === 'cliente' ? '👤' : 
                         loginData.rol === 'operador' ? '⚙️' : '👑'}
                      </span>
                      Registrándose como: {loginData.rol.charAt(0).toUpperCase() + loginData.rol.slice(1)}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistroMode(false);
                        setMostrarSeleccionRol(true);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontSize: '12px',
                        textDecoration: 'underline',
                        padding: '5px'
                      }}
                    >
                      Cambiar
                    </button>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Nombre Completo *
                    </label>
                  <input
                    type="text"
                      value={loginData.nombre}
                      onChange={(e) => setLoginData({...loginData, nombre: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Ingresa tu nombre completo"
                      required={isRegistroMode}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Ingresa tu email"
                      required={isRegistroMode}
                  />
                </div>


                  {/* Documento de Identidad */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                        Tipo Doc. *
                  </label>
                  <select
                        value={loginData.tipoDocumento}
                        onChange={(e) => setLoginData({...loginData, tipoDocumento: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                        required={isRegistroMode}
                      >
                        <option value="cc">Cédula de Ciudadanía</option>
                        <option value="ce">Cédula de Extranjería</option>
                        <option value="ti">Tarjeta de Identidad</option>
                        <option value="pp">Pasaporte</option>
                        <option value="nit">NIT</option>
                  </select>
                </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Número Doc. *
                    </label>
                  <input
                    type="text"
                        value={loginData.numeroDocumento}
                        onChange={(e) => setLoginData({...loginData, numeroDocumento: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Número de documento"
                        required={isRegistroMode}
                  />
                </div>
                  </div>
                </>
              )}

              {!isRegistroMode && (
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                  Email *
                  </label>
                  <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                  placeholder="Ingresa tu email"
                  required
                />
              </div>
              )}

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  Contraseña *
                </label>
                <input
                  type="password"
                  value={loginData.contrasena}
                  onChange={(e) => setLoginData({...loginData, contrasena: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #bdc3c7',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#f8f9fa'
                  }}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              {/* Confirmar contraseña (solo en modo registro) */}
              {isRegistroMode && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                    Confirmar Contraseña *
                    </label>
                  <input
                    type="password"
                    value={loginData.confirmarContrasena}
                    onChange={(e) => setLoginData({...loginData, confirmarContrasena: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #bdc3c7',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                      backgroundColor: '#f8f9fa'
                      }}
                    placeholder="Confirma tu contraseña"
                    required={isRegistroMode}
                    />
                  </div>
              )}

              {loginError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  {loginError}
                </div>
              )}

              {loginSuccess && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  {loginSuccess}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegistroMode(false);
                    setLoginError('');
                    setLoginSuccess('');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    border: '2px solid #bdc3c7',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#2c3e50',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    border: 'none',
                    borderRadius: '10px',
                    background: isRegistroMode ? 
                      'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' : 
                      'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: isRegistroMode ? 
                      '0 4px 15px rgba(39, 174, 96, 0.3)' : 
                      '0 4px 15px rgba(52, 152, 219, 0.3)'
                  }}
                >
                  {isRegistroMode ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
              </div>

              {/* Enlace para cambiar modo */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {isRegistroMode ? (
                  <>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      ¿Ya tienes cuenta?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={toggleRegistroMode}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textDecoration: 'underline'
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      ¿No tienes cuenta?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={handleAbrirRegistro}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textDecoration: 'underline'
                  }}
                >
                  Registrarse
                </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Componente de Debug - TEMPORAL */}
      <UserDebug />
    </>
  );
};

export default MenuPrincipal;
