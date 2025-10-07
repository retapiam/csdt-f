/**
 * Archivo de exportación centralizada para componentes compartidos
 * Facilita las importaciones y mantiene la organización del código
 */

// Componentes de autenticación
export { default as BotonAuth } from './BotonAuth';
export { default as BotonRegistro } from './BotonRegistro';
export { default as SistemaAuthCompleto } from './SistemaAuthCompleto';
export { default as CambiarContrasenaModal } from './CambiarContrasenaModal';
export { default as LoginMejorado } from './LoginMejorado';
export { default as LoginSimple } from './LoginSimple';
export { default as RegistroMejorado } from './RegistroMejorado';
export { default as RegistroSimple } from './RegistroSimple';
export { default as SistemaAuth } from './SistemaAuth';
export { default as DiagnosticoAuth } from './DiagnosticoAuth';
export { default as DiagnosticoConexion } from './DiagnosticoConexion';

// Componentes de navegación y layout
export { default as MenuPrincipal } from './MenuPrincipal';
export { default as PageContainer } from './PageContainer';
export { default as PageTemplate } from './PageTemplate';
export { default as PageWrapper } from './PageWrapper';
export { default as Section } from './Section';

// Componentes de rutas protegidas
export { default as ProtectedRoute } from './ProtectedRoute';
export { default as ProtectedRouteWithPermisos } from './ProtectedRouteWithPermisos';

// Componentes de UI y formularios
export { default as Card } from './Card';
export { default as DataTable } from './DataTable';
export { default as FormModal } from './FormModal';
export { default as FormularioBase } from './FormularioBase';

// Componentes de perfil y notificaciones
export { default as PerfilUsuario } from './PerfilUsuario';
export { default as NotificacionesUsuario } from './NotificacionesUsuario';

// Componentes de utilidades
export { default as ConfiguracionAPI } from './ConfiguracionAPI';
export { default as MapaInteractivo } from './MapaInteractivo';
export { default as PruebaAuth } from './PruebaAuth';

// Componentes de errores y estados especiales
export { default as Unauthorized } from './Unauthorized';

// Re-exportaciones para compatibilidad
export { default } from './PageWrapper';
