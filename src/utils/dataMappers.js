/**
 * MAPPERS DE DATOS - CSDT
 * Funciones para convertir entre nombres abreviados (backend) y nombres completos (frontend)
 */

// ==================== MAPPER DE USUARIO ====================

/**
 * Convierte datos de usuario de frontend (nombres completos) a backend (abreviados)
 * @param {Object} usuarioFrontend - Datos del usuario con nombres completos
 * @returns {Object} Datos del usuario con nombres abreviados para backend
 */
export const mapUsuarioToBackend = (usuarioFrontend) => {
  return {
    id: usuarioFrontend.id,
    nom: usuarioFrontend.nombres,
    ape: usuarioFrontend.apellidos,
    cor: usuarioFrontend.correo,
    tel: usuarioFrontend.telefono,
    doc: usuarioFrontend.documento,
    tip_doc: usuarioFrontend.tipo_documento,
    fec_nac: usuarioFrontend.fecha_nacimiento,
    dir: usuarioFrontend.direccion,
    ciu: usuarioFrontend.ciudad,
    dep: usuarioFrontend.departamento,
    gen: usuarioFrontend.genero,
    rol: usuarioFrontend.rol,
    est: usuarioFrontend.estado,
    cor_ver: usuarioFrontend.correo_verificado,
    cor_ver_en: usuarioFrontend.correo_verificado_en,
    ult_acc: usuarioFrontend.ultimo_acceso,
    not: usuarioFrontend.notas,
    created_at: usuarioFrontend.created_at,
    updated_at: usuarioFrontend.updated_at,
    deleted_at: usuarioFrontend.deleted_at
  };
};

/**
 * Convierte datos de usuario de backend (abreviados) a frontend (nombres completos)
 * @param {Object} usuarioBackend - Datos del usuario con nombres abreviados
 * @returns {Object} Datos del usuario con nombres completos para frontend
 */
export const mapUsuarioToFrontend = (usuarioBackend) => {
  return {
    id: usuarioBackend.id,
    nombres: usuarioBackend.nom,
    apellidos: usuarioBackend.ape,
    correo: usuarioBackend.cor,
    telefono: usuarioBackend.tel,
    documento: usuarioBackend.doc,
    tipo_documento: usuarioBackend.tip_doc,
    fecha_nacimiento: usuarioBackend.fec_nac,
    direccion: usuarioBackend.dir,
    ciudad: usuarioBackend.ciu,
    departamento: usuarioBackend.dep,
    genero: usuarioBackend.gen,
    rol: usuarioBackend.rol,
    estado: usuarioBackend.est,
    correo_verificado: usuarioBackend.cor_ver,
    correo_verificado_en: usuarioBackend.cor_ver_en,
    ultimo_acceso: usuarioBackend.ult_acc,
    notas: usuarioBackend.not,
    created_at: usuarioBackend.created_at,
    updated_at: usuarioBackend.updated_at,
    deleted_at: usuarioBackend.deleted_at
  };
};

// ==================== MAPPER DE VEEDURÍA ====================

/**
 * Convierte datos de veeduría de frontend a backend
 * @param {Object} veeduriaFrontend - Datos de veeduría con nombres completos
 * @returns {Object} Datos de veeduría con nombres abreviados para backend
 */
export const mapVeeduriaToBackend = (veeduriaFrontend) => {
  return {
    id: veeduriaFrontend.id,
    usu_id: veeduriaFrontend.usuario_id,
    ope_id: veeduriaFrontend.operador_id,
    tit: veeduriaFrontend.titulo,
    des: veeduriaFrontend.descripcion,
    tip: veeduriaFrontend.tipo,
    est: veeduriaFrontend.estado,
    pri: veeduriaFrontend.prioridad,
    cat: veeduriaFrontend.categoria,
    ubi: veeduriaFrontend.ubicacion,
    pre: veeduriaFrontend.presupuesto,
    fec_reg: veeduriaFrontend.fecha_registro,
    fec_rad: veeduriaFrontend.fecha_radicacion,
    fec_cer: veeduriaFrontend.fecha_cierre,
    num_rad: veeduriaFrontend.numero_radicacion,
    not_ope: veeduriaFrontend.notas_operador,
    rec_ia: veeduriaFrontend.recomendaciones_ia,
    arc: veeduriaFrontend.archivos,
    created_at: veeduriaFrontend.created_at,
    updated_at: veeduriaFrontend.updated_at,
    deleted_at: veeduriaFrontend.deleted_at
  };
};

/**
 * Convierte datos de veeduría de backend a frontend
 * @param {Object} veeduriaBackend - Datos de veeduría con nombres abreviados
 * @returns {Object} Datos de veeduría con nombres completos para frontend
 */
export const mapVeeduriaToFrontend = (veeduriaBackend) => {
  return {
    id: veeduriaBackend.id,
    usuario_id: veeduriaBackend.usu_id,
    operador_id: veeduriaBackend.ope_id,
    titulo: veeduriaBackend.tit,
    descripcion: veeduriaBackend.des,
    tipo: veeduriaBackend.tip,
    estado: veeduriaBackend.est,
    prioridad: veeduriaBackend.pri,
    categoria: veeduriaBackend.cat,
    ubicacion: veeduriaBackend.ubi,
    presupuesto: veeduriaBackend.pre,
    fecha_registro: veeduriaBackend.fec_reg,
    fecha_radicacion: veeduriaBackend.fec_rad,
    fecha_cierre: veeduriaBackend.fec_cer,
    numero_radicacion: veeduriaBackend.num_rad,
    notas_operador: veeduriaBackend.not_ope,
    recomendaciones_ia: veeduriaBackend.rec_ia,
    archivos: veeduriaBackend.arc,
    created_at: veeduriaBackend.created_at,
    updated_at: veeduriaBackend.updated_at,
    deleted_at: veeduriaBackend.deleted_at
  };
};

// ==================== MAPPER DE TAREA ====================

/**
 * Convierte datos de tarea de frontend a backend
 * @param {Object} tareaFrontend - Datos de tarea con nombres completos
 * @returns {Object} Datos de tarea con nombres abreviados para backend
 */
export const mapTareaToBackend = (tareaFrontend) => {
  return {
    id: tareaFrontend.id,
    vee_id: tareaFrontend.veeduria_id,
    asig_por: tareaFrontend.asignado_por,
    asig_a: tareaFrontend.asignado_a,
    tit: tareaFrontend.titulo,
    des: tareaFrontend.descripcion,
    est: tareaFrontend.estado,
    pri: tareaFrontend.prioridad,
    fec_ini: tareaFrontend.fecha_inicio,
    fec_ven: tareaFrontend.fecha_vencimiento,
    fec_com: tareaFrontend.fecha_completado,
    not: tareaFrontend.notas,
    created_at: tareaFrontend.created_at,
    updated_at: tareaFrontend.updated_at,
    deleted_at: tareaFrontend.deleted_at
  };
};

/**
 * Convierte datos de tarea de backend a frontend
 * @param {Object} tareaBackend - Datos de tarea con nombres abreviados
 * @returns {Object} Datos de tarea con nombres completos para frontend
 */
export const mapTareaToFrontend = (tareaBackend) => {
  return {
    id: tareaBackend.id,
    veeduria_id: tareaBackend.vee_id,
    asignado_por: tareaBackend.asig_por,
    asignado_a: tareaBackend.asig_a,
    titulo: tareaBackend.tit,
    descripcion: tareaBackend.des,
    estado: tareaBackend.est,
    prioridad: tareaBackend.pri,
    fecha_inicio: tareaBackend.fec_ini,
    fecha_vencimiento: tareaBackend.fec_ven,
    fecha_completado: tareaBackend.fec_com,
    notas: tareaBackend.not,
    created_at: tareaBackend.created_at,
    updated_at: tareaBackend.updated_at,
    deleted_at: tareaBackend.deleted_at
  };
};

// ==================== MAPPER DE DONACIÓN ====================

/**
 * Convierte datos de donación de frontend a backend
 * @param {Object} donacionFrontend - Datos de donación con nombres completos
 * @returns {Object} Datos de donación con nombres abreviados para backend
 */
export const mapDonacionToBackend = (donacionFrontend) => {
  return {
    id: donacionFrontend.id,
    usu_id: donacionFrontend.usuario_id,
    mon: donacionFrontend.monto,
    tip: donacionFrontend.tipo,
    est: donacionFrontend.estado,
    ref: donacionFrontend.referencia,
    des: donacionFrontend.descripcion,
    fec_don: donacionFrontend.fecha_donacion,
    fec_con: donacionFrontend.fecha_confirmacion,
    not: donacionFrontend.notas,
    created_at: donacionFrontend.created_at,
    updated_at: donacionFrontend.updated_at,
    deleted_at: donacionFrontend.deleted_at
  };
};

/**
 * Convierte datos de donación de backend a frontend
 * @param {Object} donacionBackend - Datos de donación con nombres abreviados
 * @returns {Object} Datos de donación con nombres completos para frontend
 */
export const mapDonacionToFrontend = (donacionBackend) => {
  return {
    id: donacionBackend.id,
    usuario_id: donacionBackend.usu_id,
    monto: donacionBackend.mon,
    tipo: donacionBackend.tip,
    estado: donacionBackend.est,
    referencia: donacionBackend.ref,
    descripcion: donacionBackend.des,
    fecha_donacion: donacionBackend.fec_don,
    fecha_confirmacion: donacionBackend.fec_con,
    notas: donacionBackend.not,
    created_at: donacionBackend.created_at,
    updated_at: donacionBackend.updated_at,
    deleted_at: donacionBackend.deleted_at
  };
};

// ==================== MAPPER DE ROL ====================

/**
 * Convierte datos de rol de frontend a backend
 * @param {Object} rolFrontend - Datos de rol con nombres completos
 * @returns {Object} Datos de rol con nombres abreviados para backend
 */
export const mapRolToBackend = (rolFrontend) => {
  return {
    id: rolFrontend.id,
    nom: rolFrontend.nombre,
    des: rolFrontend.descripcion,
    est: rolFrontend.estado,
    perm: rolFrontend.permisos,
    created_at: rolFrontend.created_at,
    updated_at: rolFrontend.updated_at,
    deleted_at: rolFrontend.deleted_at
  };
};

/**
 * Convierte datos de rol de backend a frontend
 * @param {Object} rolBackend - Datos de rol con nombres abreviados
 * @returns {Object} Datos de rol con nombres completos para frontend
 */
export const mapRolToFrontend = (rolBackend) => {
  return {
    id: rolBackend.id,
    nombre: rolBackend.nom,
    descripcion: rolBackend.des,
    estado: rolBackend.est,
    permisos: rolBackend.perm,
    created_at: rolBackend.created_at,
    updated_at: rolBackend.updated_at,
    deleted_at: rolBackend.deleted_at
  };
};

// ==================== MAPPER DE FORMULARIOS DE ACCIONES CONSTITUCIONALES ====================

/**
 * Convierte datos de formulario de acción constitucional de frontend a backend
 * @param {Object} formularioFrontend - Datos del formulario con nombres completos
 * @returns {Object} Datos del formulario con nombres abreviados para backend
 */
export const mapAccionConstitucionalToBackend = (formularioFrontend) => {
  return {
    nombre: formularioFrontend.nombre,
    documento: formularioFrontend.documento,
    email: formularioFrontend.email,
    telefono: formularioFrontend.telefono,
    direccion: formularioFrontend.direccion,
    der_vul: formularioFrontend.derechos_vulnerados,
    hec: formularioFrontend.hechos,
    sol: formularioFrontend.solicitud,
    ent_dem: formularioFrontend.entidad_demandada,
    arc: formularioFrontend.archivos,
    arc_ia: formularioFrontend.archivos_ia,
    evi: formularioFrontend.evidencias,
    hec_ia: formularioFrontend.hechos_ia,
    sol_ia: formularioFrontend.solicitud_ia,
    con_gen: formularioFrontend.concepto_general,
    anon: formularioFrontend.anonimo,
    ana_ia: {
      esp_der: formularioFrontend.analisis_ia?.especialista_derecho,
      // Agregar más campos según sea necesario
    }
  };
};

/**
 * Convierte datos de formulario de acción constitucional de backend a frontend
 * @param {Object} formularioBackend - Datos del formulario con nombres abreviados
 * @returns {Object} Datos del formulario con nombres completos para frontend
 */
export const mapAccionConstitucionalToFrontend = (formularioBackend) => {
  return {
    nombre: formularioBackend.nombre,
    documento: formularioBackend.documento,
    email: formularioBackend.email,
    telefono: formularioBackend.telefono,
    direccion: formularioBackend.direccion,
    derechos_vulnerados: formularioBackend.der_vul,
    hechos: formularioBackend.hec,
    solicitud: formularioBackend.sol,
    entidad_demandada: formularioBackend.ent_dem,
    archivos: formularioBackend.arc,
    archivos_ia: formularioBackend.arc_ia,
    evidencias: formularioBackend.evi,
    hechos_ia: formularioBackend.hec_ia,
    solicitud_ia: formularioBackend.sol_ia,
    concepto_general: formularioBackend.con_gen,
    anonimo: formularioBackend.anon,
    analisis_ia: {
      especialista_derecho: formularioBackend.ana_ia?.esp_der,
      // Agregar más campos según sea necesario
    }
  };
};

// ==================== MAPPER GENÉRICO ====================

/**
 * Mapper genérico que aplica conversiones de nombres abreviados a completos
 * @param {Object} objeto - Objeto con atributos abreviados
 * @param {Object} mapeo - Mapeo de atributos abreviados a completos
 * @returns {Object} Objeto con atributos completos
 */
export const mapAtributosToCompletos = (objeto, mapeo) => {
  const resultado = {};
  
  Object.keys(objeto).forEach(clave => {
    const claveCompleta = mapeo[clave] || clave;
    resultado[claveCompleta] = objeto[clave];
  });
  
  return resultado;
};

/**
 * Mapper genérico que aplica conversiones de nombres completos a abreviados
 * @param {Object} objeto - Objeto con atributos completos
 * @param {Object} mapeo - Mapeo de atributos completos a abreviados
 * @returns {Object} Objeto con atributos abreviados
 */
export const mapAtributosToAbreviados = (objeto, mapeo) => {
  const resultado = {};
  
  Object.keys(objeto).forEach(clave => {
    const claveAbreviada = mapeo[clave] || clave;
    resultado[claveAbreviada] = objeto[clave];
  });
  
  return resultado;
};

// ==================== MAPEOS DE CONVERSIÓN ====================

/**
 * Mapeo de atributos de usuario: abreviados -> completos
 */
export const MAPEO_USUARIO_ABREVIADO_A_COMPLETO = {
  nom: 'nombres',
  ape: 'apellidos',
  cor: 'correo',
  tel: 'telefono',
  doc: 'documento',
  tip_doc: 'tipo_documento',
  fec_nac: 'fecha_nacimiento',
  dir: 'direccion',
  ciu: 'ciudad',
  dep: 'departamento',
  gen: 'genero',
  rol: 'rol',
  est: 'estado',
  cor_ver: 'correo_verificado',
  cor_ver_en: 'correo_verificado_en',
  ult_acc: 'ultimo_acceso',
  not: 'notas'
};

/**
 * Mapeo de atributos de usuario: completos -> abreviados
 */
export const MAPEO_USUARIO_COMPLETO_A_ABREVIADO = {
  nombres: 'nom',
  apellidos: 'ape',
  correo: 'cor',
  telefono: 'tel',
  documento: 'doc',
  tipo_documento: 'tip_doc',
  fecha_nacimiento: 'fec_nac',
  direccion: 'dir',
  ciudad: 'ciu',
  departamento: 'dep',
  genero: 'gen',
  rol: 'rol',
  estado: 'est',
  correo_verificado: 'cor_ver',
  correo_verificado_en: 'cor_ver_en',
  ultimo_acceso: 'ult_acc',
  notas: 'not'
};

// ==================== EXPORTACIONES ====================

export default {
  // Mappers específicos
  mapUsuarioToBackend,
  mapUsuarioToFrontend,
  mapVeeduriaToBackend,
  mapVeeduriaToFrontend,
  mapTareaToBackend,
  mapTareaToFrontend,
  mapDonacionToBackend,
  mapDonacionToFrontend,
  mapRolToBackend,
  mapRolToFrontend,
  mapAccionConstitucionalToBackend,
  mapAccionConstitucionalToFrontend,
  
  // Mappers genéricos
  mapAtributosToCompletos,
  mapAtributosToAbreviados,
  
  // Mapeos de conversión
  MAPEO_USUARIO_ABREVIADO_A_COMPLETO,
  MAPEO_USUARIO_COMPLETO_A_ABREVIADO
};
