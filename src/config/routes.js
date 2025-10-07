/**
 * Configuración de rutas del frontend CSDT
 * Centraliza todas las rutas de la aplicación
 */

export const ROUTES = {
    // ========================================
    // RUTAS PÚBLICAS
    // ========================================
    PUBLIC: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        CONTACT: '/contacto',
        ABOUT: '/institucional',
        NEWS: '/noticias',
        DOCUMENTS: '/documentos',
        HELP: '/ayuda',
        TERMS: '/terminos',
        UNAUTHORIZED: '/unauthorized'
    },

    // ========================================
    // RUTAS DE DASHBOARD
    // ========================================
    DASHBOARD: {
        GENERAL: '/dashboard',
        ADMIN_GENERAL: '/admin-general/dashboard',
        ADMIN: '/admin/dashboard',
        OPERATOR: '/operador/dashboard',
        CLIENT: '/cliente/dashboard'
    },

    // ========================================
    // RUTAS DE ACCIONES CONSTITUCIONALES
    // ========================================
    CONSTITUTIONAL_ACTIONS: {
        TUTELA: '/accion-tutela',
        CUMPLIMIENTO: '/accion-cumplimiento',
        POPULAR: '/accion-popular',
        GRUPO: '/accion-grupo',
        JURIDICA: '/demanda-juridica',
        NULIDAD: '/accion-nulidad',
        REPARACION: '/accion-reparacion-directa'
    },

    // ========================================
    // RUTAS DE MECANISMOS DE PARTICIPACIÓN
    // ========================================
    PARTICIPATION: {
        CONSULTA_POPULAR: '/consulta-popular',
        REFERENDO: '/referendo',
        PLEBISCITO: '/plebiscito',
        MANIFIESTO: '/manifiesto'
    },

    // ========================================
    // RUTAS DE CONTROL SOCIAL
    // ========================================
    SOCIAL_CONTROL: {
        PQRSFD: '/pqrsfd',
        CONSEJO_VEEDURIA: '/consejo-veeduria-territorial'
    },

    // ========================================
    // RUTAS DE DERECHOS ÉTNICOS
    // ========================================
    ETHNIC_RIGHTS: {
        DERECHOS_ETNICOS: '/derechos-etnicos',
        DERECHOS_FUNDAMENTALES: '/derechos-fundamentales',
        CONSULTA_PREVIA: '/consulta-previa-etnica',
        TERRITORIOS_ANCESTRALES: '/territorios-ancestrales',
        PATRIMONIO_CULTURAL: '/patrimonio-cultural',
        EDUCACION_PROPRIA: '/educacion-propia',
        PLANES_ETNODESARROLLO: '/planes-etnodesarrollo',
        HISTORIA_TERRITORIO: '/historia-territorio',
        NARRACIONES_ETNICAS: '/narraciones-etnicas',
        MEDIACION_INTERCULTURAL: '/mediacion-intercultural'
    },

    // ========================================
    // RUTAS DE SISTEMAS JURÍDICOS
    // ========================================
    LEGAL_SYSTEMS: {
        JUSTICIA_CIVIL: '/justicia-civil',
        JUSTICIA_PENAL: '/justicia-penal',
        JUSTICIA_CONSTITUCIONAL: '/justicia-constitucional',
        PRIMERA_INSTANCIA: '/primera-instancia',
        SEGUNDA_INSTANCIA: '/segunda-instancia',
        CASACION: '/casacion',
        REVISION: '/revision'
    },

    // ========================================
    // RUTAS DE CONTROL TERRITORIAL
    // ========================================
    TERRITORIAL_CONTROL: {
        CONTROL_MINERIA: '/control-mineria-predios',
        CONTROL_INSTITUCIONES: '/control-instituciones',
        CONTROL_REGIONAL: '/control-regional',
        MEDICINA_NATURAL: '/medicina-natural'
    },

    // ========================================
    // RUTAS DE INTELIGENCIA ARTIFICIAL
    // ========================================
    AI: {
        CONSEJO_IA: '/consejo-ia',
        ESPECIALISTAS_IA: '/ia-especialistas',
        GEO_DASHBOARD: '/geo-dashboard',
        AUDITORIA_FORENSE: '/auditoria-forense',
        MONITOR: '/monitor'
    },

    // ========================================
    // RUTAS DE GESTIÓN (CLIENTE)
    // ========================================
    CLIENT_MANAGEMENT: {
        DASHBOARD: '/cliente/dashboard',
        MIS_CASOS: '/cliente/mis-casos',
        TAREAS: '/cliente/tareas',
        SEGUIMIENTO_CASOS: '/cliente/seguimiento-casos'
    },

    // ========================================
    // RUTAS DE GESTIÓN (OPERADOR)
    // ========================================
    OPERATOR_MANAGEMENT: {
        DASHBOARD: '/operador/dashboard',
        VEEDURIAS: '/operador/veedurias',
        TAREAS_ASIGNADAS: '/operador/tareas-asignadas',
        CENTRO_GESTION_LEGAL: '/operador/centro-gestion-legal',
        PANEL_TAREAS: '/operador/panel-tareas',
        GESTIONAR_VEEDURIAS: '/operador/gestionar-veedurias',
        GESTIONAR_TAREAS: '/operador/gestionar-tareas'
    },

    // ========================================
    // RUTAS DE GESTIÓN (ADMINISTRADOR)
    // ========================================
    ADMIN_MANAGEMENT: {
        DASHBOARD: '/admin/dashboard',
        USUARIOS: '/admin/usuarios',
        VEEDURIAS: '/admin/veedurias',
        DONACIONES: '/admin/donaciones',
        TAREAS: '/admin/tareas',
        ESTADISTICAS: '/admin/estadisticas',
        CONFIGURACION: '/admin/configuracion',
        LOGS: '/admin/logs',
        ROLES: '/admin/roles',
        PERMISOS: '/admin/permisos'
    },

    // ========================================
    // RUTAS DE GESTIÓN (ADMINISTRADOR GENERAL)
    // ========================================
    ADMIN_GENERAL_MANAGEMENT: {
        DASHBOARD: '/admin-general/dashboard',
        USUARIOS: '/admin-general/usuarios',
        ROLES: '/admin-general/roles',
        PERMISOS: '/admin-general/permisos',
        CONFIGURACION: '/admin-general/configuracion',
        LOGS: '/admin-general/logs',
        ESTADISTICAS: '/admin-general/estadisticas',
        BACKUP: '/admin-general/backup',
        MANTENIMIENTO: '/admin-general/mantenimiento'
    }
};

// ========================================
// RUTAS POR ROL
// ========================================
export const ROUTES_BY_ROLE = {
    'cli': [
        ROUTES.CLIENT_MANAGEMENT.DASHBOARD,
        ROUTES.CLIENT_MANAGEMENT.MIS_CASOS,
        ROUTES.CLIENT_MANAGEMENT.TAREAS,
        ROUTES.CLIENT_MANAGEMENT.SEGUIMIENTO_CASOS,
        ROUTES.PUBLIC.CONTACT,
        ROUTES.PUBLIC.ABOUT,
        ROUTES.PUBLIC.NEWS,
        ROUTES.PUBLIC.DOCUMENTS,
        ROUTES.PUBLIC.HELP
    ],
    'ope': [
        ROUTES.OPERATOR_MANAGEMENT.DASHBOARD,
        ROUTES.OPERATOR_MANAGEMENT.VEEDURIAS,
        ROUTES.OPERATOR_MANAGEMENT.TAREAS_ASIGNADAS,
        ROUTES.OPERATOR_MANAGEMENT.CENTRO_GESTION_LEGAL,
        ROUTES.OPERATOR_MANAGEMENT.PANEL_TAREAS,
        ROUTES.OPERATOR_MANAGEMENT.GESTIONAR_VEEDURIAS,
        ROUTES.OPERATOR_MANAGEMENT.GESTIONAR_TAREAS,
        ROUTES.PUBLIC.CONTACT,
        ROUTES.PUBLIC.ABOUT,
        ROUTES.PUBLIC.NEWS,
        ROUTES.PUBLIC.DOCUMENTS,
        ROUTES.PUBLIC.HELP
    ],
    'adm': [
        ROUTES.ADMIN_MANAGEMENT.DASHBOARD,
        ROUTES.ADMIN_MANAGEMENT.USUARIOS,
        ROUTES.ADMIN_MANAGEMENT.VEEDURIAS,
        ROUTES.ADMIN_MANAGEMENT.DONACIONES,
        ROUTES.ADMIN_MANAGEMENT.TAREAS,
        ROUTES.ADMIN_MANAGEMENT.ESTADISTICAS,
        ROUTES.ADMIN_MANAGEMENT.CONFIGURACION,
        ROUTES.ADMIN_MANAGEMENT.LOGS,
        ROUTES.PUBLIC.CONTACT,
        ROUTES.PUBLIC.ABOUT,
        ROUTES.PUBLIC.NEWS,
        ROUTES.PUBLIC.DOCUMENTS,
        ROUTES.PUBLIC.HELP
    ],
    'adm_gen': [
        ROUTES.ADMIN_GENERAL_MANAGEMENT.DASHBOARD,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.USUARIOS,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.ROLES,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.PERMISOS,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.CONFIGURACION,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.LOGS,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.ESTADISTICAS,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.BACKUP,
        ROUTES.ADMIN_GENERAL_MANAGEMENT.MANTENIMIENTO,
        ROUTES.PUBLIC.CONTACT,
        ROUTES.PUBLIC.ABOUT,
        ROUTES.PUBLIC.NEWS,
        ROUTES.PUBLIC.DOCUMENTS,
        ROUTES.PUBLIC.HELP
    ]
};

// ========================================
// RUTAS PROTEGIDAS
// ========================================
export const PROTECTED_ROUTES = [
    ...Object.values(ROUTES.DASHBOARD),
    ...Object.values(ROUTES.CLIENT_MANAGEMENT),
    ...Object.values(ROUTES.OPERATOR_MANAGEMENT),
    ...Object.values(ROUTES.ADMIN_MANAGEMENT),
    ...Object.values(ROUTES.ADMIN_GENERAL_MANAGEMENT)
];

// ========================================
// RUTAS PÚBLICAS
// ========================================
export const PUBLIC_ROUTES = [
    ...Object.values(ROUTES.PUBLIC),
    ...Object.values(ROUTES.CONSTITUTIONAL_ACTIONS),
    ...Object.values(ROUTES.PARTICIPATION),
    ...Object.values(ROUTES.SOCIAL_CONTROL),
    ...Object.values(ROUTES.ETHNIC_RIGHTS),
    ...Object.values(ROUTES.LEGAL_SYSTEMS),
    ...Object.values(ROUTES.TERRITORIAL_CONTROL),
    ...Object.values(ROUTES.AI)
];

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Verificar si una ruta es pública
 */
export const isPublicRoute = (path) => {
    return PUBLIC_ROUTES.includes(path);
};

/**
 * Verificar si una ruta es protegida
 */
export const isProtectedRoute = (path) => {
    return PROTECTED_ROUTES.includes(path);
};

/**
 * Obtener rutas permitidas para un rol
 */
export const getRoutesForRole = (role) => {
    return ROUTES_BY_ROLE[role] || [];
};

/**
 * Verificar si un rol puede acceder a una ruta
 */
export const canAccessRoute = (role, path) => {
    const allowedRoutes = getRoutesForRole(role);
    return allowedRoutes.includes(path) || isPublicRoute(path);
};

/**
 * Obtener la ruta de dashboard para un rol
 */
export const getDashboardRoute = (role) => {
    const dashboardRoutes = {
        'cli': ROUTES.CLIENT_MANAGEMENT.DASHBOARD,
        'ope': ROUTES.OPERATOR_MANAGEMENT.DASHBOARD,
        'adm': ROUTES.ADMIN_MANAGEMENT.DASHBOARD,
        'adm_gen': ROUTES.ADMIN_GENERAL_MANAGEMENT.DASHBOARD
    };
    return dashboardRoutes[role] || ROUTES.DASHBOARD.GENERAL;
};

/**
 * Obtener la ruta de redirección después del login
 */
export const getRedirectAfterLogin = (role) => {
    return getDashboardRoute(role);
};

/**
 * Obtener la ruta de redirección después del logout
 */
export const getRedirectAfterLogout = () => {
    return ROUTES.PUBLIC.HOME;
};

export default ROUTES;
