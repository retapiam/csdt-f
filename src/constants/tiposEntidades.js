export const TIPOS_ENTIDADES = {
  // Entidades del Estado
  ESTADO: {
    id: 'estado',
    nombre: 'Estado',
    descripcion: 'Entidades del Estado colombiano',
    subcategorias: [
      { id: 'presidencia', nombre: 'Presidencia de la República' },
      { id: 'ministerios', nombre: 'Ministerios' },
      { id: 'departamentos', nombre: 'Departamentos' },
      { id: 'municipios', nombre: 'Municipios' },
      { id: 'distritos', nombre: 'Distritos' },
      { id: 'entidades_descentralizadas', nombre: 'Entidades Descentralizadas' }
    ]
  },
  
  // Entidades de Control
  CONTROL: {
    id: 'control',
    nombre: 'Entidades de Control',
    descripcion: 'Organismos de control y vigilancia',
    subcategorias: [
      { id: 'procuraduria', nombre: 'Procuraduría General de la Nación' },
      { id: 'contraloria', nombre: 'Contraloría General de la República' },
      { id: 'defensoria', nombre: 'Defensoría del Pueblo' },
      { id: 'fiscalia', nombre: 'Fiscalía General de la Nación' },
      { id: 'consejo_estado', nombre: 'Consejo de Estado' },
      { id: 'corte_constitucional', nombre: 'Corte Constitucional' }
    ]
  },
  
  // Entidades Territoriales
  TERRITORIAL: {
    id: 'territorial',
    nombre: 'Entidades Territoriales',
    descripcion: 'Gobiernos departamentales y municipales',
    subcategorias: [
      { id: 'gobernaciones', nombre: 'Gobernaciones' },
      { id: 'alcaldias', nombre: 'Alcaldías' },
      { id: 'asambleas', nombre: 'Asambleas Departamentales' },
      { id: 'concejos', nombre: 'Concejos Municipales' },
      { id: 'juntas', nombre: 'Juntas Administradoras Locales' }
    ]
  },
  
  // Entidades del Sector Privado
  PRIVADO: {
    id: 'privado',
    nombre: 'Sector Privado',
    descripcion: 'Empresas y organizaciones privadas',
    subcategorias: [
      { id: 'empresas', nombre: 'Empresas Privadas' },
      { id: 'ong', nombre: 'Organizaciones No Gubernamentales' },
      { id: 'fundaciones', nombre: 'Fundaciones' },
      { id: 'corporaciones', nombre: 'Corporaciones' },
      { id: 'asociaciones', nombre: 'Asociaciones' }
    ]
  },
  
  // Entidades Internacionales
  INTERNACIONAL: {
    id: 'internacional',
    nombre: 'Entidades Internacionales',
    descripcion: 'Organizaciones internacionales',
    subcategorias: [
      { id: 'onu', nombre: 'Organización de las Naciones Unidas' },
      { id: 'oas', nombre: 'Organización de Estados Americanos' },
      { id: 'bancos', nombre: 'Bancos Internacionales' },
      { id: 'cooperacion', nombre: 'Agencias de Cooperación' }
    ]
  },
  
  // Entidades del Sector Salud
  SALUD: {
    id: 'salud',
    nombre: 'Sector Salud',
    descripcion: 'Entidades del sistema de salud',
    subcategorias: [
      { id: 'ministerio_salud', nombre: 'Ministerio de Salud' },
      { id: 'eps', nombre: 'EPS' },
      { id: 'ips', nombre: 'IPS' },
      { id: 'hospitales', nombre: 'Hospitales' },
      { id: 'clinicas', nombre: 'Clínicas' }
    ]
  },
  
  // Entidades del Sector Educación
  EDUCACION: {
    id: 'educacion',
    nombre: 'Sector Educación',
    descripcion: 'Entidades del sistema educativo',
    subcategorias: [
      { id: 'ministerio_educacion', nombre: 'Ministerio de Educación' },
      { id: 'universidades', nombre: 'Universidades' },
      { id: 'colegios', nombre: 'Colegios' },
      { id: 'institutos', nombre: 'Institutos Técnicos' },
      { id: 'sena', nombre: 'SENA' }
    ]
  },
  
  // Entidades del Sector Minero
  MINERO: {
    id: 'minero',
    nombre: 'Sector Minero',
    descripcion: 'Entidades relacionadas con la minería',
    subcategorias: [
      { id: 'anm', nombre: 'Agencia Nacional de Minería' },
      { id: 'minminas', nombre: 'Ministerio de Minas y Energía' },
      { id: 'empresas_mineras', nombre: 'Empresas Mineras' },
      { id: 'contratistas', nombre: 'Contratistas Mineros' }
    ]
  }
};

// Función para obtener todas las entidades en formato de lista
export const getTodasEntidades = () => {
  return Object.values(TIPOS_ENTIDADES).map(entidad => ({
    id: entidad.id,
    nombre: entidad.nombre,
    descripcion: entidad.descripcion,
    subcategorias: entidad.subcategorias
  }));
};

// Función para buscar entidad por ID
export const getEntidadPorId = (id) => {
  return TIPOS_ENTIDADES[id] || null;
};

// Función para obtener subcategorías de una entidad
export const getSubcategorias = (entidadId) => {
  const entidad = getEntidadPorId(entidadId);
  return entidad ? entidad.subcategorias : [];
};

// Función para validar si una entidad existe
export const validarEntidad = (id) => {
  return id in TIPOS_ENTIDADES;
};

export default TIPOS_ENTIDADES;