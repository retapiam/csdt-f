/**
 * Utilidad para mapear datos de usuario entre Backend y Frontend
 * Asegura consistencia en los nombres de campos en todo el proyecto
 * 
 * Mapeo Backend (Laravel) → Frontend (React):
 * - name → nombreCompleto
 * - email → correo
 * - rol → rol (sin cambios)
 * - documento → numeroDocumento
 * - tipo_documento → tipoDocumento
 * - telefono → telefono (sin cambios)
 * - estado → estado (sin cambios)
 * - avatar → avatar (sin cambios)
 * - created_at → fechaCreacion
 * - updated_at → fechaActualizacion
 */

/**
 * Mapea el objeto User del backend al formato del frontend
 * @param {Object} backendUser - Objeto usuario del backend
 * @returns {Object} Objeto usuario mapeado para el frontend
 */
export const mapBackendUserToFrontend = (backendUser) => {
  if (!backendUser) return null;

  return {
    id: backendUser.id,
    nombreCompleto: backendUser.name || '',
    nombre: obtenerPrimerNombre(backendUser.name),
    apellido: obtenerPrimerApellido(backendUser.name),
    correo: backendUser.email || '',
    rol: mapearRol(backendUser.rol),
    rolOriginal: backendUser.rol,
    numeroDocumento: backendUser.documento || '',
    tipoDocumento: backendUser.tipo_documento || 'CC',
    telefono: backendUser.telefono || '',
    estado: backendUser.estado || 'activo',
    avatar: backendUser.avatar || null,
    fechaCreacion: backendUser.created_at || null,
    fechaActualizacion: backendUser.updated_at || null,
    
    // Mantener compatibilidad con código legacy
    name: backendUser.name,
    email: backendUser.email,
    nom: backendUser.name, // Para compatibilidad
    ape: obtenerPrimerApellido(backendUser.name),
    cor: backendUser.email,
    doc: backendUser.documento,
    tip_doc: backendUser.tipo_documento,
    tel: backendUser.telefono
  };
};

/**
 * Mapea el objeto User del frontend al formato del backend
 * @param {Object} frontendUser - Objeto usuario del frontend
 * @returns {Object} Objeto usuario mapeado para el backend
 */
export const mapFrontendUserToBackend = (frontendUser) => {
  if (!frontendUser) return null;

  return {
    name: frontendUser.nombreCompleto || frontendUser.name || `${frontendUser.nombre || ''} ${frontendUser.apellido || ''}`.trim(),
    email: frontendUser.correo || frontendUser.email,
    rol: frontendUser.rolOriginal || frontendUser.rol,
    documento: frontendUser.numeroDocumento || frontendUser.documento,
    tipo_documento: frontendUser.tipoDocumento || frontendUser.tipo_documento,
    telefono: frontendUser.telefono,
    avatar: frontendUser.avatar
  };
};

/**
 * Obtiene el primer nombre de un nombre completo
 * @param {String} nombreCompleto - Nombre completo del usuario
 * @returns {String} Primer nombre
 */
export const obtenerPrimerNombre = (nombreCompleto) => {
  if (!nombreCompleto) return '';
  const partes = nombreCompleto.trim().split(' ');
  return partes[0] || '';
};

/**
 * Obtiene el primer apellido de un nombre completo
 * @param {String} nombreCompleto - Nombre completo del usuario
 * @returns {String} Primer apellido
 */
export const obtenerPrimerApellido = (nombreCompleto) => {
  if (!nombreCompleto) return '';
  const partes = nombreCompleto.trim().split(' ');
  // Asumiendo que el apellido comienza después del primer espacio
  // y que puede haber dos nombres antes del apellido
  if (partes.length > 2) {
    return partes[2] || '';
  } else if (partes.length > 1) {
    return partes[1] || '';
  }
  return '';
};

/**
 * Obtiene el nombre completo formateado
 * @param {Object} usuario - Objeto usuario
 * @returns {String} Nombre completo formateado
 */
export const obtenerNombreCompleto = (usuario) => {
  if (!usuario) return 'Usuario';
  
  if (usuario.nombreCompleto) return usuario.nombreCompleto;
  if (usuario.name) return usuario.name;
  if (usuario.nom) return usuario.nom;
  if (usuario.nombre && usuario.apellido) return `${usuario.nombre} ${usuario.apellido}`;
  if (usuario.nombre) return usuario.nombre;
  
  return 'Usuario';
};

/**
 * Obtiene solo el primer nombre del usuario
 * @param {Object} usuario - Objeto usuario
 * @returns {String} Primer nombre del usuario
 */
export const obtenerNombre = (usuario) => {
  if (!usuario) return 'Usuario';
  
  const nombreCompleto = obtenerNombreCompleto(usuario);
  return obtenerPrimerNombre(nombreCompleto);
};

/**
 * Mapea el rol del backend al formato del frontend (abreviado)
 * @param {String} rolBackend - Rol del backend
 * @returns {String} Rol abreviado
 */
export const mapearRol = (rolBackend) => {
  const rolesMap = {
    'cliente': 'cli',
    'operador': 'ope',
    'administrador': 'adm',
    'superadmin': 'adm_gen',
    'admin_general': 'adm_gen',
    
    // Si ya viene abreviado, mantenerlo
    'cli': 'cli',
    'ope': 'ope',
    'adm': 'adm',
    'adm_gen': 'adm_gen',
    'sup': 'adm_gen'
  };

  return rolesMap[rolBackend?.toLowerCase()] || 'cli';
};

/**
 * Obtiene el ícono según el rol del usuario
 * @param {String} rol - Rol del usuario
 * @returns {String} Emoji del ícono
 */
export const obtenerIconoRol = (rol) => {
  const iconosRol = {
    'cli': '👤',
    'cliente': '👤',
    'ope': '⚙️',
    'operador': '⚙️',
    'adm': '👑',
    'administrador': '👑',
    'adm_gen': '🏛️',
    'superadmin': '🏛️',
    'admin_general': '🏛️',
    'sup': '🏛️'
  };

  return iconosRol[rol?.toLowerCase()] || '👤';
};

/**
 * Obtiene el nombre del rol en español
 * @param {String} rol - Rol del usuario
 * @returns {String} Nombre del rol en español
 */
export const obtenerNombreRol = (rol) => {
  const nombresRol = {
    'cli': 'Cliente',
    'cliente': 'Cliente',
    'ope': 'Operador',
    'operador': 'Operador',
    'adm': 'Administrador',
    'administrador': 'Administrador',
    'adm_gen': 'Administrador General',
    'superadmin': 'Administrador General',
    'admin_general': 'Administrador General',
    'sup': 'Administrador General'
  };

  return nombresRol[rol?.toLowerCase()] || 'Usuario';
};

/**
 * Obtiene el color según el rol del usuario
 * @param {String} rol - Rol del usuario
 * @returns {Object} Objeto con gradiente y color de borde
 */
export const obtenerColorRol = (rol) => {
  const coloresRol = {
    'cli': {
      gradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      border: '#3498db',
      hover: 'linear-gradient(135deg, #2980b9 0%, #21618c 100%)'
    },
    'ope': {
      gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      border: '#f39c12',
      hover: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)'
    },
    'adm': {
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      border: '#e74c3c',
      hover: 'linear-gradient(135deg, #c0392b 0%, #a93226 100%)'
    },
    'adm_gen': {
      gradient: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
      border: '#9b59b6',
      hover: 'linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%)'
    }
  };

  const rolAbreviado = mapearRol(rol);
  return coloresRol[rolAbreviado] || coloresRol['cli'];
};

/**
 * Valida si el usuario tiene un rol específico
 * @param {Object} usuario - Objeto usuario
 * @param {String} rolRequerido - Rol a validar
 * @returns {Boolean} True si el usuario tiene el rol
 */
export const tieneRol = (usuario, rolRequerido) => {
  if (!usuario || !usuario.rol) return false;
  const rolUsuario = mapearRol(usuario.rol);
  const rolValidar = mapearRol(rolRequerido);
  return rolUsuario === rolValidar;
};

/**
 * Valida si el usuario tiene uno de los roles especificados
 * @param {Object} usuario - Objeto usuario
 * @param {Array<String>} rolesPermitidos - Array de roles permitidos
 * @returns {Boolean} True si el usuario tiene alguno de los roles
 */
export const tieneAlgunRol = (usuario, rolesPermitidos) => {
  if (!usuario || !usuario.rol || !Array.isArray(rolesPermitidos)) return false;
  return rolesPermitidos.some(rol => tieneRol(usuario, rol));
};

export default {
  mapBackendUserToFrontend,
  mapFrontendUserToBackend,
  obtenerPrimerNombre,
  obtenerPrimerApellido,
  obtenerNombreCompleto,
  obtenerNombre,
  mapearRol,
  obtenerIconoRol,
  obtenerNombreRol,
  obtenerColorRol,
  tieneRol,
  tieneAlgunRol
};

