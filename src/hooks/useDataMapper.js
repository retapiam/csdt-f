import { useCallback } from 'react';

/**
 * Hook para mapear datos entre frontend y backend
 * Proporciona funciones para convertir datos entre diferentes formatos
 */
export const useDataMapper = () => {
  /**
   * Mapea datos del frontend al formato del backend
   * @param {Object} frontendData - Datos en formato frontend
   * @param {string} entityType - Tipo de entidad (usuario, veeduria, etc.)
   * @returns {Object} Datos en formato backend
   */
  const mapToBackend = useCallback((frontendData, entityType = 'general') => {
    if (!frontendData || typeof frontendData !== 'object') {
      return frontendData;
    }

    const mappers = {
      usuario: (data) => ({
        nom: data.nombre || data.nombres || '',
        ape: data.apellido || data.apellidos || '',
        cor: data.email || data.correo || '',
        tel: data.telefono || '',
        doc: data.documento || data.numeroDocumento || '',
        tip_doc: data.tipoDocumento || data.tipo_documento || 'cc',
        rol: data.rol || 'cli',
        ciu: data.ciudad || '',
        dep: data.departamento || '',
        dir: data.direccion || '',
        gen: data.genero || 'n',
        fec_nac: data.fechaNacimiento || data.fecha_nacimiento || null,
        con: data.password || data.contrasena || '',
        con_confirmation: data.confirmarPassword || data.confirmar_contrasena || ''
      }),
      
      veeduria: (data) => ({
        tit: data.titulo || '',
        des: data.descripcion || '',
        tip: data.tipo || '',
        est: data.estado || 'act',
        pri: data.prioridad || 'med',
        fec_ini: data.fechaInicio || data.fecha_inicio || null,
        fec_fin: data.fechaFin || data.fecha_fin || null,
        cli_id: data.clienteId || data.cliente_id || null,
        ope_id: data.operadorId || data.operador_id || null
      }),
      
      tarea: (data) => ({
        tit: data.titulo || '',
        des: data.descripcion || '',
        tip: data.tipo || '',
        est: data.estado || 'pen',
        pri: data.prioridad || 'med',
        fec_ven: data.fechaVencimiento || data.fecha_vencimiento || null,
        veed_id: data.veeduriaId || data.veeduria_id || null,
        ope_id: data.operadorId || data.operador_id || null
      }),
      
      donacion: (data) => ({
        mon: data.monto || 0,
        tip: data.tipo || '',
        est: data.estado || 'pen',
        fec: data.fecha || new Date().toISOString(),
        cli_id: data.clienteId || data.cliente_id || null,
        obs: data.observaciones || ''
      }),
      
      general: (data) => data
    };

    const mapper = mappers[entityType] || mappers.general;
    return mapper(frontendData);
  }, []);

  /**
   * Mapea datos del backend al formato del frontend
   * @param {Object} backendData - Datos en formato backend
   * @param {string} entityType - Tipo de entidad
   * @returns {Object} Datos en formato frontend
   */
  const mapToFrontend = useCallback((backendData, entityType = 'general') => {
    if (!backendData || typeof backendData !== 'object') {
      return backendData;
    }

    const mappers = {
      usuario: (data) => ({
        id: data.id || null,
        nombre: data.nom || '',
        apellido: data.ape || '',
        email: data.cor || '',
        telefono: data.tel || '',
        documento: data.doc || '',
        tipoDocumento: data.tip_doc || 'cc',
        rol: data.rol || 'cli',
        ciudad: data.ciu || '',
        departamento: data.dep || '',
        direccion: data.dir || '',
        genero: data.gen || 'n',
        fechaNacimiento: data.fec_nac || null,
        estado: data.est || 'act',
        fechaCreacion: data.created_at || null,
        fechaActualizacion: data.updated_at || null
      }),
      
      veeduria: (data) => ({
        id: data.id || null,
        titulo: data.tit || '',
        descripcion: data.des || '',
        tipo: data.tip || '',
        estado: data.est || 'act',
        prioridad: data.pri || 'med',
        fechaInicio: data.fec_ini || null,
        fechaFin: data.fec_fin || null,
        clienteId: data.cli_id || null,
        operadorId: data.ope_id || null,
        fechaCreacion: data.created_at || null,
        fechaActualizacion: data.updated_at || null
      }),
      
      tarea: (data) => ({
        id: data.id || null,
        titulo: data.tit || '',
        descripcion: data.des || '',
        tipo: data.tip || '',
        estado: data.est || 'pen',
        prioridad: data.pri || 'med',
        fechaVencimiento: data.fec_ven || null,
        veeduriaId: data.veed_id || null,
        operadorId: data.ope_id || null,
        fechaCreacion: data.created_at || null,
        fechaActualizacion: data.updated_at || null
      }),
      
      donacion: (data) => ({
        id: data.id || null,
        monto: data.mon || 0,
        tipo: data.tip || '',
        estado: data.est || 'pen',
        fecha: data.fec || null,
        clienteId: data.cli_id || null,
        observaciones: data.obs || '',
        fechaCreacion: data.created_at || null,
        fechaActualizacion: data.updated_at || null
      }),
      
      general: (data) => data
    };

    const mapper = mappers[entityType] || mappers.general;
    return mapper(backendData);
  }, []);

  /**
   * Mapea un array de datos del backend al formato del frontend
   * @param {Array} backendArray - Array de datos en formato backend
   * @param {string} entityType - Tipo de entidad
   * @returns {Array} Array de datos en formato frontend
   */
  const mapArrayToFrontend = useCallback((backendArray, entityType = 'general') => {
    if (!Array.isArray(backendArray)) {
      return [];
    }

    return backendArray.map(item => mapToFrontend(item, entityType));
  }, [mapToFrontend]);

  /**
   * Mapea un array de datos del frontend al formato del backend
   * @param {Array} frontendArray - Array de datos en formato frontend
   * @param {string} entityType - Tipo de entidad
   * @returns {Array} Array de datos en formato backend
   */
  const mapArrayToBackend = useCallback((frontendArray, entityType = 'general') => {
    if (!Array.isArray(frontendArray)) {
      return [];
    }

    return frontendArray.map(item => mapToBackend(item, entityType));
  }, [mapToBackend]);

  /**
   * Mapea estados entre frontend y backend
   * @param {string} estado - Estado a mapear
   * @param {string} direction - Dirección del mapeo ('toBackend' o 'toFrontend')
   * @returns {string} Estado mapeado
   */
  const mapEstado = useCallback((estado, direction = 'toFrontend') => {
    const estadoMap = {
      toBackend: {
        'activo': 'act',
        'inactivo': 'ina',
        'pendiente': 'pen',
        'suspendido': 'sus',
        'completado': 'com',
        'cancelado': 'can'
      },
      toFrontend: {
        'act': 'activo',
        'ina': 'inactivo',
        'pen': 'pendiente',
        'sus': 'suspendido',
        'com': 'completado',
        'can': 'cancelado'
      }
    };

    return estadoMap[direction]?.[estado] || estado;
  }, []);

  /**
   * Mapea roles entre frontend y backend
   * @param {string} rol - Rol a mapear
   * @param {string} direction - Dirección del mapeo
   * @returns {string} Rol mapeado
   */
  const mapRol = useCallback((rol, direction = 'toFrontend') => {
    const rolMap = {
      toBackend: {
        'cliente': 'cli',
        'operador': 'ope',
        'administrador': 'adm',
        'administrador_general': 'adm_gen'
      },
      toFrontend: {
        'cli': 'cliente',
        'ope': 'operador',
        'adm': 'administrador',
        'adm_gen': 'administrador_general'
      }
    };

    return rolMap[direction]?.[rol] || rol;
  }, []);

  return {
    mapToBackend,
    mapToFrontend,
    mapArrayToFrontend,
    mapArrayToBackend,
    mapEstado,
    mapRol
  };
};