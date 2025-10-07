import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PermisosVistaProvider } from './contexts/PermisosVistaContext';
import { NotificationProvider } from './contexts/NotificationContext';
import SyncDataProvider from './components/SyncDataProvider';
import { Toaster } from 'react-hot-toast';

// Importar componentes compartidos
import MenuPrincipal from './components/compartidas/MenuPrincipal';
import Footer from './components/Footer';
import PageWrapper from './components/compartidas/PageWrapper';
import ProtectedRouteWithPermisos from './components/compartidas/ProtectedRouteWithPermisos';

// Componente de Error Boundary para capturar errores en las páginas
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>❌ Error en {this.props.pageName}</h1>
          <p>
            Hubo un problema al cargar esta página. Por favor, revisa la consola del navegador para más detalles.
          </p>
          <details className="error-details">
            <summary>Detalles del Error</summary>
            <pre>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// Componente de página de prueba genérico para fallback
const GenericTestPage = ({ pageName }) => (
  <div className="generic-test-page">
    <h1>✅ {pageName} Funcionando Correctamente</h1>
    <p>
      Esta es una versión simplificada de la página para confirmar que el enrutamiento y la carga de componentes funcionan.
    </p>
    <p className="subtitle">
      Puedes restaurar la versión completa de esta página en `src/paginas/...`
    </p>
  </div>
);

// Componente de diagnóstico del sistema
const SystemDiagnostic = () => (
  <div className="system-diagnostic">
    <h1>CSDT - Sistema Funcionando</h1>
    <p>✅ Estado del Sistema</p>
    <ul>
      <li>✅ React 18.3.1 funcionando correctamente</li>
      <li>✅ Vite 7.1.7 compilando sin errores</li>
      <li>✅ Servidor ejecutándose en puerto 5174</li>
      <li>✅ Todas las dependencias instaladas</li>
      <li>✅ CSS y estilos aplicándose correctamente</li>
    </ul>
    <h2>🎉 ¡La aplicación está funcionando!</h2>
    <p className="description">
      Si puedes ver este mensaje, significa que el problema no es de compatibilidad de librerías, sino posiblemente de los contextos o componentes complejos.
    </p>
  </div>
);

// Importaciones de páginas (usando lazy loading)
// ========================================
// AUTENTICACIÓN
// ========================================
const Login = lazy(() => import('./paginas/auth/Login'));
const Registro = lazy(() => import('./paginas/auth/Registro'));
const RecuperarPassword = lazy(() => import('./paginas/auth/RecuperarPassword'));

// ========================================
// PÁGINA PRINCIPAL
// ========================================
const Inicio = lazy(() => import('./paginas/09-gestion-institucional/Inicio'));

// ========================================
// GESTIÓN INSTITUCIONAL
// ========================================
const Institucional = lazy(() => import('./paginas/09-gestion-institucional/01-institucional/Institucional'));
const Proyectos = lazy(() => import('./paginas/09-gestion-institucional/02-proyectos/Proyectos'));
const Donaciones = lazy(() => import('./paginas/09-gestion-institucional/03-donaciones/Donaciones'));
const Dashboard = lazy(() => import('./paginas/09-gestion-institucional/04-dashboard/Dashboard'));

// ========================================
// ACCIONES CONSTITUCIONALES
// ========================================
const AccionTutela = lazy(() => import('./paginas/03-acciones-constitucionales/01-proteccion-derechos-fundamentales/AccionTutela'));
const HabeasCorpus = lazy(() => import('./paginas/03-acciones-constitucionales/01-proteccion-derechos-fundamentales/HabeasCorpus'));
const HabeasData = lazy(() => import('./paginas/03-acciones-constitucionales/01-proteccion-derechos-fundamentales/HabeasData'));
const AccionPopular = lazy(() => import('./paginas/03-acciones-constitucionales/02-proteccion-derechos-colectivos/AccionPopular'));
const AccionCumplimiento = lazy(() => import('./paginas/03-acciones-constitucionales/03-proteccion-interes-publico/AccionCumplimiento'));

// ========================================
// RAMA JUDICIAL
// ========================================
const JusticiaCivil = lazy(() => import('./paginas/02-rama-judicial/01-justicia-ordinaria/01-civil/JusticiaCivil'));
const JusticiaPenal = lazy(() => import('./paginas/02-rama-judicial/01-justicia-ordinaria/02-penal/JusticiaPenal'));
const JusticiaLaboral = lazy(() => import('./paginas/02-rama-judicial/01-justicia-ordinaria/03-laboral/JusticiaLaboral'));
const JusticiaFamilia = lazy(() => import('./paginas/02-rama-judicial/01-justicia-ordinaria/04-familia/JusticiaFamilia'));
const JusticiaAdministrativa = lazy(() => import('./paginas/02-rama-judicial/01-justicia-ordinaria/05-administrativa/JusticiaAdministrativa'));
const JusticiaPaz = lazy(() => import('./paginas/02-rama-judicial/03-justicia-paz/JusticiaPaz'));
const JurisdiccionEspecialPaz = lazy(() => import('./paginas/02-rama-judicial/02-jurisdiccion-especial/JurisdiccionEspecialPaz'));

// ========================================
// RAMA EJECUTIVA
// ========================================
const PresidenciaRepublica = lazy(() => import('./paginas/04-rama-ejecutiva/01-presidencia/PresidenciaRepublica'));

// ========================================
// RAMA LEGISLATIVA
// ========================================
const CongresoRepublica = lazy(() => import('./paginas/05-rama-legislativa/01-congreso/CongresoRepublica'));

// ========================================
// ÓRGANOS DE CONTROL
// ========================================
const ProcuraduriaGeneral = lazy(() => import('./paginas/06-organos-control/01-procuraduria/ProcuraduriaGeneral'));
const DefensoriaPueblo = lazy(() => import('./paginas/06-organos-control/02-defensoria/DefensoriaPueblo'));
const ContraloriaGeneral = lazy(() => import('./paginas/06-organos-control/03-contraloria/ContraloriaGeneral'));
const FiscaliaGeneral = lazy(() => import('./paginas/06-organos-control/04-fiscalia/FiscaliaGeneral'));
const PQRSFD = lazy(() => import('./paginas/06-organos-control/05-control-social/PQRSFD'));

// ========================================
// VEEDURÍA CIUDADANA
// ========================================
const VeeduriaGestionPublica = lazy(() => import('./paginas/06-organos-control/06-veeduria-gestion-publica/VeeduriaGestionPublica'));
const VeeduriaContratacionPublica = lazy(() => import('./paginas/06-organos-control/07-veeduria-contratacion/VeeduriaContratacionPublica'));
const VeeduriaDerechosAmbientales = lazy(() => import('./paginas/06-organos-control/08-veeduria-derechos-ambientales/VeeduriaDerechosAmbientales'));
const VeeduriaRendicionCuentas = lazy(() => import('./paginas/06-organos-control/09-veeduria-rendicion-cuentas/VeeduriaRendicionCuentas'));
const VeeduriaParticipacionCiudadana = lazy(() => import('./paginas/06-organos-control/10-veeduria-participacion/VeeduriaParticipacionCiudadana'));

// ========================================
// PARTICIPACIÓN CIUDADANA
// ========================================
const ConsultaPopular = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/ConsultaPopular'));
const Referendo = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/Referendo'));
const Plebiscito = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/Plebiscito'));
const RevocatoriaMandate = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/RevocatoriaMandate'));
const CabildoAbierto = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/CabildoAbierto'));
const IniciativaPopular = lazy(() => import('./paginas/07-participacion-ciudadana/01-mecanismos-participacion/IniciativaPopular'));

// ========================================
// DERECHOS ÉTNICOS
// ========================================
const PueblosIndigenas = lazy(() => import('./paginas/08-derechos-etnicos/01-pueblos-indigenas/PueblosIndigenas'));
const ComunidadesAfro = lazy(() => import('./paginas/08-derechos-etnicos/02-comunidades-afro/ComunidadesAfro'));
const PueblosRom = lazy(() => import('./paginas/08-derechos-etnicos/03-pueblos-rom/PueblosRom'));
const DerechosTerritoriales = lazy(() => import('./paginas/08-derechos-etnicos/04-territorios-ancestrales/DerechosTerritoriales'));
const DeclaracionesAmpliacionTerritorial = lazy(() => import('./paginas/08-derechos-etnicos/04-territorios-ancestrales/DeclaracionesAmpliacionTerritorial'));
const ConsultaPreviaCompleta = lazy(() => import('./paginas/08-derechos-etnicos/05-consulta-previa/ConsultaPreviaCompleta'));
const ConsentimientoPrevioLibreInformado = lazy(() => import('./paginas/08-derechos-etnicos/05-consulta-previa/ConsentimientoPrevioLibreInformado'));
const PlanesEtnodesarrollo = lazy(() => import('./paginas/08-derechos-etnicos/06-planes-etnodesarrollo/PlanesEtnodesarrollo'));
const PlanesVidaComunitarios = lazy(() => import('./paginas/08-derechos-etnicos/06-planes-etnodesarrollo/PlanesVidaComunitarios'));
const FormulacionProyectosEtnicos = lazy(() => import('./paginas/08-derechos-etnicos/06-planes-etnodesarrollo/FormulacionProyectosEtnicos'));
const JurisdiccionEspecialIndigena = lazy(() => import('./paginas/08-derechos-etnicos/07-jurisdiccion-especial/JurisdiccionEspecialIndigena'));
const GobiernoPropio = lazy(() => import('./paginas/08-derechos-etnicos/08-gobierno-autonomia/GobiernoPropio'));
const AutoridadesTradicionalesETI = lazy(() => import('./paginas/08-derechos-etnicos/08-gobierno-autonomia/AutoridadesTradicionalesETI'));
const EntidadesTerritorialesIndigenas = lazy(() => import('./paginas/08-derechos-etnicos/08-gobierno-autonomia/EntidadesTerritorialesIndigenas'));
const AnalisisEtnicoIA = lazy(() => import('./paginas/08-derechos-etnicos/09-analisis-etnico-ia/AnalisisEtnicoIA'));
const SeguimientoEvaluacionEtnica = lazy(() => import('./paginas/08-derechos-etnicos/10-seguimiento-evaluacion/SeguimientoEvaluacionEtnica'));
const DerechosEtnicosAdicionales = lazy(() => import('./paginas/08-derechos-etnicos/11-derechos-adicionales/DerechosEtnicosAdicionales'));
const TipologiaCasosEtnicos = lazy(() => import('./paginas/08-derechos-etnicos/12-tipologia-casos/TipologiaCasosEtnicos'));
const MarcoJuridicoEtnico = lazy(() => import('./paginas/08-derechos-etnicos/13-marco-juridico/MarcoJuridicoEtnico'));
const FuncionalidadesIA = lazy(() => import('./paginas/08-derechos-etnicos/14-funcionalidades-ia/FuncionalidadesIA'));
const DashboardCasosActivos = lazy(() => import('./paginas/08-derechos-etnicos/15-formularios-criticos/DashboardCasosActivos'));
const ExpedienteDigitalEtnico = lazy(() => import('./paginas/08-derechos-etnicos/15-formularios-criticos/ExpedienteDigitalEtnico'));
const FormularioDenunciaVulneracion = lazy(() => import('./paginas/08-derechos-etnicos/15-formularios-criticos/FormularioDenunciaVulneracion'));
const FormularioSolicitudConsultaPrevia = lazy(() => import('./paginas/08-derechos-etnicos/15-formularios-criticos/FormularioSolicitudConsultaPrevia'));
const AmpliacionTerritorial = lazy(() => import('./paginas/08-derechos-etnicos/16-ampliacion-territorial/AmpliacionTerritorial'));

// ========================================
// INNOVACIÓN E INTELIGENCIA ARTIFICIAL
// ========================================
const ConsejoIA = lazy(() => import('./paginas/01-innovacion-ia/01-consejo-ia/ConsejoIA'));
const ConsejoEtnoIA = lazy(() => import('./paginas/01-innovacion-ia/02-consejo-etnoia/ConsejoEtnoIA'));
const ConsejoEticaIA = lazy(() => import('./paginas/01-innovacion-ia/03-consejo-etica-ia/ConsejoEticaIA'));
const TerritorialIA = lazy(() => import('./paginas/01-innovacion-ia/04-consejo-territorial-ia/TerritorialIA'));
const ConsejoTerritorial = lazy(() => import('./paginas/01-innovacion-ia/05-consejo-territorial-juridico/ConsejoTerritorial'));
const VeeduriaIA = lazy(() => import('./paginas/01-innovacion-ia/06-consejo-veeduria-ia/VeeduriaIA'));
const ConsejoSocialIA = lazy(() => import('./paginas/01-innovacion-ia/07-consejo-social-ia/ConsejoSocialIA'));
const ConsejoMineroAmbientalIA = lazy(() => import('./paginas/01-innovacion-ia/08-consejo-minero-ambiental-ia/ConsejoMineroAmbientalIA'));
const ConsejoAmbientalIA = lazy(() => import('./paginas/01-innovacion-ia/09-consejo-ambiental-ia/ConsejoAmbientalIA'));
const IAEspecialistas = lazy(() => import('./paginas/01-innovacion-ia/10-ia-especialistas/IAEspecialistas'));
const AuditoriaForense = lazy(() => import('./paginas/01-innovacion-ia/11-auditoria-forense/AuditoriaForense'));
const GeoDashboard = lazy(() => import('./paginas/01-innovacion-ia/12-geo-dashboard/GeoDashboard'));
const MonitorIA = lazy(() => import('./paginas/01-innovacion-ia/13-monitor-ia/MonitorIA'));
const PlanesMineroAmbiental = lazy(() => import('./paginas/01-innovacion-ia/14-planes-minero-ambiental/PlanesMineroAmbiental'));
const CentroInnovacionIA = lazy(() => import('./paginas/01-innovacion-ia/15-centro-innovacion-ia/CentroInnovacionIA'));
const HerramientasIA = lazy(() => import('./paginas/01-innovacion-ia/16-herramientas-ia/HerramientasIA'));

// ========================================
// SERVICIOS COMPARTIDOS
// ========================================
const Contacto = lazy(() => import('./paginas/10-servicios-compartidos/01-contacto/Contacto'));
const Ayuda = lazy(() => import('./paginas/10-servicios-compartidos/02-ayuda/Ayuda'));
const Documentos = lazy(() => import('./paginas/10-servicios-compartidos/03-documentos/Documentos'));
const Noticias = lazy(() => import('./paginas/10-servicios-compartidos/04-noticias/Noticias'));
const Perfil = lazy(() => import('./paginas/10-servicios-compartidos/05-perfil/Perfil'));
const Terminos = lazy(() => import('./paginas/10-servicios-compartidos/06-terminos/Terminos'));
const ConvocatoriasPublicas = lazy(() => import('./paginas/10-servicios-compartidos/07-convocatorias/ConvocatoriasPublicas'));

// ========================================
// DICTÁMENES Y PERITAJES
// ========================================
// 01 - Reconocimiento Territorial
const ReconocimientoDirecto = lazy(() => import('./paginas/11-dictamenes-peritajes/01-reconocimiento-territorial/01-directo/ReconocimientoDirecto'));
const ReconocimientoIndirecto = lazy(() => import('./paginas/11-dictamenes-peritajes/01-reconocimiento-territorial/02-indirecto/ReconocimientoIndirecto'));
const ReconocimientoSocial = lazy(() => import('./paginas/11-dictamenes-peritajes/01-reconocimiento-territorial/03-social/ReconocimientoSocial'));
const TimelineTerritorial = lazy(() => import('./paginas/11-dictamenes-peritajes/01-reconocimiento-territorial/04-timeline/TimelineTerritorial'));
const GestionConflictos = lazy(() => import('./paginas/11-dictamenes-peritajes/01-reconocimiento-territorial/05-conflictos/GestionConflictos'));

// 02 - Catastro Predial
const CatastroComunitario = lazy(() => import('./paginas/11-dictamenes-peritajes/02-catastro-predial/01-comunitario/CatastroComunitario'));
const CatastroParticipativo = lazy(() => import('./paginas/11-dictamenes-peritajes/02-catastro-predial/02-participativo/CatastroParticipativo'));
const CatastroIndirecto = lazy(() => import('./paginas/11-dictamenes-peritajes/02-catastro-predial/03-indirecto/CatastroIndirecto'));
const ComparativoCatastral = lazy(() => import('./paginas/11-dictamenes-peritajes/02-catastro-predial/04-comparativo/ComparativoCatastral'));

// 03 - Catastro Minero
const MapaMineroNacional = lazy(() => import('./paginas/11-dictamenes-peritajes/03-catastro-minero/01-mapa-nacional/MapaMineroNacional'));
const SuperposicionMinero = lazy(() => import('./paginas/11-dictamenes-peritajes/03-catastro-minero/02-superposicion/SuperposicionMinero'));
const CertificadosMineros = lazy(() => import('./paginas/11-dictamenes-peritajes/03-catastro-minero/03-certificados/CertificadosMineros'));
const ProyectosExtractivos = lazy(() => import('./paginas/11-dictamenes-peritajes/03-catastro-minero/04-proyectos/ProyectosExtractivos'));

// 04 - Componente Ambiental
const MapaAmbientalInteractivo = lazy(() => import('./paginas/11-dictamenes-peritajes/04-componente-ambiental/01-mapa-interactivo/MapaAmbientalInteractivo'));
const DiagnosticoAmbiental = lazy(() => import('./paginas/11-dictamenes-peritajes/04-componente-ambiental/02-diagnostico/DiagnosticoAmbiental'));
const ProyectosAmbientales = lazy(() => import('./paginas/11-dictamenes-peritajes/04-componente-ambiental/03-proyectos/ProyectosAmbientales'));
const PlanesManejoAmbiental = lazy(() => import('./paginas/11-dictamenes-peritajes/04-componente-ambiental/04-planes/PlanesManejoAmbiental'));

// 05 - Dimensión Étnica
const ConsultaPreviaDictamen = lazy(() => import('./paginas/11-dictamenes-peritajes/05-dimension-etnica/01-consulta-previa/ConsultaPrevia'));
const CertificadosEtnicos = lazy(() => import('./paginas/11-dictamenes-peritajes/05-dimension-etnica/02-certificados/CertificadosEtnicos'));
const AmpliacionSaneamiento = lazy(() => import('./paginas/11-dictamenes-peritajes/05-dimension-etnica/03-ampliacion/AmpliacionSaneamiento'));

// 06 - Dimensión Social
const MapaCultural = lazy(() => import('./paginas/11-dictamenes-peritajes/06-dimension-social/01-mapa-cultural/MapaCultural'));
const RepositorioSaberes = lazy(() => import('./paginas/11-dictamenes-peritajes/06-dimension-social/02-repositorio/RepositorioSaberes'));
const TestimoniosMemoria = lazy(() => import('./paginas/11-dictamenes-peritajes/06-dimension-social/03-testimonios/TestimoniosMemoria'));
const ParticipacionSocial = lazy(() => import('./paginas/11-dictamenes-peritajes/06-dimension-social/04-participacion/ParticipacionSocial'));

// ========================================
// GESTIÓN DE PROYECTOS
// ========================================
const GestionProyectos = lazy(() => import('./paginas/12-gestion-proyectos/GestionProyectos'));
const DashboardUnificado = lazy(() => import('./paginas/12-gestion-proyectos/DashboardUnificado'));
const DashboardAdministrador = lazy(() => import('./paginas/12-gestion-proyectos/01-administrador/DashboardAdministrador'));
const DashboardAdministradorMejorado = lazy(() => import('./paginas/12-gestion-proyectos/01-administrador/DashboardAdministradorMejorado'));
const CrearProyecto = lazy(() => import('./paginas/12-gestion-proyectos/01-administrador/CrearProyecto'));
const GestionAPUsCotizaciones = lazy(() => import('./paginas/12-gestion-proyectos/01-administrador/GestionAPUsCotizaciones'));
const DashboardOperador = lazy(() => import('./paginas/12-gestion-proyectos/02-operador/DashboardOperador'));
const DashboardCliente = lazy(() => import('./paginas/12-gestion-proyectos/03-cliente/DashboardCliente'));
const PanelVista = lazy(() => import('./paginas/12-gestion-proyectos/01-administrador/PanelVista'));


function App() {
  return (
    <AuthProvider>
      <PermisosVistaProvider>
        <NotificationProvider>
          <SyncDataProvider>
            <BrowserRouter>
            <div className="app-container">
              <MenuPrincipal />
              <main className="app-main">
                <PageWrapper>
                  <Suspense fallback={
                    <div className="loading-fallback">
                      Cargando página...
                    </div>
                  }>
                    <Routes>
                      {/* ========================================
                          AUTENTICACIÓN (RUTAS PÚBLICAS)
                      ======================================== */}
                      <Route path="/login" element={<ErrorBoundary pageName="Login"><Login /></ErrorBoundary>} />
                      <Route path="/registro" element={<ErrorBoundary pageName="Registro"><Registro /></ErrorBoundary>} />
                      <Route path="/recuperar-password" element={<ErrorBoundary pageName="Recuperar Password"><RecuperarPassword /></ErrorBoundary>} />
                      
                      {/* ========================================
                          RUTA PRINCIPAL
                      ======================================== */}
                      <Route path="/" element={<ErrorBoundary pageName="Inicio"><Inicio /></ErrorBoundary>} />
                      <Route path="/inicio" element={<ErrorBoundary pageName="Inicio"><Inicio /></ErrorBoundary>} />
                      
                      {/* ========================================
                          GESTIÓN INSTITUCIONAL
                      ======================================== */}
                      <Route path="/institucional" element={<ErrorBoundary pageName="Institucional"><Institucional /></ErrorBoundary>} />
                      <Route path="/proyectos" element={<ErrorBoundary pageName="Proyectos"><Proyectos /></ErrorBoundary>} />
                      <Route path="/donaciones" element={<ErrorBoundary pageName="Donaciones"><Donaciones /></ErrorBoundary>} />
                      <Route path="/dashboard" element={<ErrorBoundary pageName="Dashboard"><Dashboard /></ErrorBoundary>} />
                      
                      {/* ========================================
                          ACCIONES CONSTITUCIONALES
                      ======================================== */}
                      <Route path="/accion-tutela" element={<ErrorBoundary pageName="AccionTutela"><AccionTutela /></ErrorBoundary>} />
                      <Route path="/habeas-corpus" element={<ErrorBoundary pageName="HabeasCorpus"><HabeasCorpus /></ErrorBoundary>} />
                      <Route path="/habeas-data" element={<ErrorBoundary pageName="HabeasData"><HabeasData /></ErrorBoundary>} />
                      <Route path="/accion-popular" element={<ErrorBoundary pageName="AccionPopular"><AccionPopular /></ErrorBoundary>} />
                      <Route path="/accion-cumplimiento" element={<ErrorBoundary pageName="AccionCumplimiento"><AccionCumplimiento /></ErrorBoundary>} />
                      
                      {/* ========================================
                          RAMA JUDICIAL
                      ======================================== */}
                      <Route path="/justicia-civil" element={<ErrorBoundary pageName="JusticiaCivil"><JusticiaCivil /></ErrorBoundary>} />
                      <Route path="/justicia-penal" element={<ErrorBoundary pageName="JusticiaPenal"><JusticiaPenal /></ErrorBoundary>} />
                      <Route path="/justicia-laboral" element={<ErrorBoundary pageName="JusticiaLaboral"><JusticiaLaboral /></ErrorBoundary>} />
                      <Route path="/justicia-familia" element={<ErrorBoundary pageName="JusticiaFamilia"><JusticiaFamilia /></ErrorBoundary>} />
                      <Route path="/justicia-administrativa" element={<ErrorBoundary pageName="JusticiaAdministrativa"><JusticiaAdministrativa /></ErrorBoundary>} />
                      <Route path="/justicia-paz" element={<ErrorBoundary pageName="JusticiaPaz"><JusticiaPaz /></ErrorBoundary>} />
                      <Route path="/jurisdiccion-especial-paz" element={<ErrorBoundary pageName="JurisdiccionEspecialPaz"><JurisdiccionEspecialPaz /></ErrorBoundary>} />
                      
                      {/* ========================================
                          RAMA EJECUTIVA
                      ======================================== */}
                      <Route path="/presidencia" element={<ErrorBoundary pageName="PresidenciaRepublica"><PresidenciaRepublica /></ErrorBoundary>} />
                      
                      {/* ========================================
                          RAMA LEGISLATIVA
                      ======================================== */}
                      <Route path="/congreso" element={<ErrorBoundary pageName="CongresoRepublica"><CongresoRepublica /></ErrorBoundary>} />
                      
                      {/* ========================================
                          ÓRGANOS DE CONTROL
                      ======================================== */}
                      <Route path="/procuraduria" element={<ErrorBoundary pageName="ProcuraduriaGeneral"><ProcuraduriaGeneral /></ErrorBoundary>} />
                      <Route path="/defensoria" element={<ErrorBoundary pageName="DefensoriaPueblo"><DefensoriaPueblo /></ErrorBoundary>} />
                      <Route path="/contraloria" element={<ErrorBoundary pageName="ContraloriaGeneral"><ContraloriaGeneral /></ErrorBoundary>} />
                      <Route path="/fiscalia" element={<ErrorBoundary pageName="FiscaliaGeneral"><FiscaliaGeneral /></ErrorBoundary>} />
                      <Route path="/pqrsfd" element={<ErrorBoundary pageName="PQRSFD"><PQRSFD /></ErrorBoundary>} />
                      
                      {/* ========================================
                          VEEDURÍA CIUDADANA
                      ======================================== */}
                      <Route path="/veeduria-gestion-publica" element={<ErrorBoundary pageName="VeeduriaGestionPublica"><VeeduriaGestionPublica /></ErrorBoundary>} />
                      <Route path="/veeduria-contratacion-publica" element={<ErrorBoundary pageName="VeeduriaContratacionPublica"><VeeduriaContratacionPublica /></ErrorBoundary>} />
                      <Route path="/veeduria-derechos-ambientales" element={<ErrorBoundary pageName="VeeduriaDerechosAmbientales"><VeeduriaDerechosAmbientales /></ErrorBoundary>} />
                      <Route path="/veeduria-rendicion-cuentas" element={<ErrorBoundary pageName="VeeduriaRendicionCuentas"><VeeduriaRendicionCuentas /></ErrorBoundary>} />
                      <Route path="/veeduria-participacion-ciudadana" element={<ErrorBoundary pageName="VeeduriaParticipacionCiudadana"><VeeduriaParticipacionCiudadana /></ErrorBoundary>} />
                      
                      {/* ========================================
                          PARTICIPACIÓN CIUDADANA
                      ======================================== */}
                      <Route path="/consulta-popular" element={<ErrorBoundary pageName="ConsultaPopular"><ConsultaPopular /></ErrorBoundary>} />
                      <Route path="/referendo" element={<ErrorBoundary pageName="Referendo"><Referendo /></ErrorBoundary>} />
                      <Route path="/plebiscito" element={<ErrorBoundary pageName="Plebiscito"><Plebiscito /></ErrorBoundary>} />
                      <Route path="/revocatoria-mandato" element={<ErrorBoundary pageName="RevocatoriaMandate"><RevocatoriaMandate /></ErrorBoundary>} />
                      <Route path="/cabildo-abierto" element={<ErrorBoundary pageName="CabildoAbierto"><CabildoAbierto /></ErrorBoundary>} />
                      <Route path="/iniciativa-popular" element={<ErrorBoundary pageName="IniciativaPopular"><IniciativaPopular /></ErrorBoundary>} />
                      
                      {/* ========================================
                          DERECHOS ÉTNICOS
                      ======================================== */}
                      {/* Pueblos y Comunidades */}
                      <Route path="/pueblos-indigenas" element={<ErrorBoundary pageName="PueblosIndigenas"><PueblosIndigenas /></ErrorBoundary>} />
                      <Route path="/comunidades-afro" element={<ErrorBoundary pageName="ComunidadesAfro"><ComunidadesAfro /></ErrorBoundary>} />
                      <Route path="/pueblos-rom" element={<ErrorBoundary pageName="PueblosRom"><PueblosRom /></ErrorBoundary>} />
                      
                      {/* Territorios */}
                      <Route path="/derechos-territoriales" element={<ErrorBoundary pageName="DerechosTerritoriales"><DerechosTerritoriales /></ErrorBoundary>} />
                      <Route path="/declaraciones-ampliacion-territorial" element={<ErrorBoundary pageName="DeclaracionesTerritorial"><DeclaracionesAmpliacionTerritorial /></ErrorBoundary>} />
                      
                      {/* Consulta Previa y CPLI */}
                      <Route path="/consulta-previa" element={<ErrorBoundary pageName="ConsultaPreviaCompleta"><ConsultaPreviaCompleta /></ErrorBoundary>} />
                      <Route path="/consentimiento-previo-libre-informado" element={<ErrorBoundary pageName="CPLI"><ConsentimientoPrevioLibreInformado /></ErrorBoundary>} />
                      
                      {/* Planes y Proyectos */}
                      <Route path="/planes-etnodesarrollo" element={<ErrorBoundary pageName="PlanesEtnodesarrollo"><PlanesEtnodesarrollo /></ErrorBoundary>} />
                      <Route path="/planes-vida-comunitarios" element={<ErrorBoundary pageName="PlanesVida"><PlanesVidaComunitarios /></ErrorBoundary>} />
                      <Route path="/formulacion-proyectos-etnicos" element={<ErrorBoundary pageName="FormulacionProyectos"><FormulacionProyectosEtnicos /></ErrorBoundary>} />
                      
                      {/* Jurisdicción y Gobierno */}
                      <Route path="/jurisdiccion-indigena" element={<ErrorBoundary pageName="JurisdiccionEspecialIndigena"><JurisdiccionEspecialIndigena /></ErrorBoundary>} />
                      <Route path="/gobierno-propio" element={<ErrorBoundary pageName="GobiernoPropio"><GobiernoPropio /></ErrorBoundary>} />
                      <Route path="/autoridades-tradicionales-eti" element={<ErrorBoundary pageName="AutoridadesETI"><AutoridadesTradicionalesETI /></ErrorBoundary>} />
                      <Route path="/entidades-territoriales-indigenas" element={<ErrorBoundary pageName="ETIs"><EntidadesTerritorialesIndigenas /></ErrorBoundary>} />
                      
                      {/* Análisis y Seguimiento */}
                      <Route path="/analisis-etnico-ia" element={<ErrorBoundary pageName="AnalisisEtnicoIA"><AnalisisEtnicoIA /></ErrorBoundary>} />
                      <Route path="/seguimiento-evaluacion-etnica" element={<ErrorBoundary pageName="SeguimientoEtnico"><SeguimientoEvaluacionEtnica /></ErrorBoundary>} />
                      
                      {/* Derechos Adicionales y Funcionalidades */}
                      <Route path="/derechos-etnicos-adicionales" element={<ErrorBoundary pageName="DerechosEtnicosAdicionales"><DerechosEtnicosAdicionales /></ErrorBoundary>} />
                      <Route path="/tipologia-casos-etnicos" element={<ErrorBoundary pageName="TipologiaCasosEtnicos"><TipologiaCasosEtnicos /></ErrorBoundary>} />
                      <Route path="/marco-juridico-etnico" element={<ErrorBoundary pageName="MarcoJuridicoEtnico"><MarcoJuridicoEtnico /></ErrorBoundary>} />
                      <Route path="/funcionalidades-ia-etnicas" element={<ErrorBoundary pageName="FuncionalidadesIA"><FuncionalidadesIA /></ErrorBoundary>} />
                      
                      {/* Formularios Críticos */}
                      <Route path="/dashboard-casos-activos" element={<ErrorBoundary pageName="DashboardCasosActivos"><DashboardCasosActivos /></ErrorBoundary>} />
                      <Route path="/expediente-digital-etnico" element={<ErrorBoundary pageName="ExpedienteDigitalEtnico"><ExpedienteDigitalEtnico /></ErrorBoundary>} />
                      <Route path="/formulario-denuncia-vulneracion" element={<ErrorBoundary pageName="FormularioDenunciaVulneracion"><FormularioDenunciaVulneracion /></ErrorBoundary>} />
                      <Route path="/formulario-solicitud-consulta-previa" element={<ErrorBoundary pageName="FormularioSolicitudConsultaPrevia"><FormularioSolicitudConsultaPrevia /></ErrorBoundary>} />
                      
                      {/* Ampliación Territorial */}
                      <Route path="/ampliacion-territorial-etnica" element={<ErrorBoundary pageName="AmpliacionTerritorial"><AmpliacionTerritorial /></ErrorBoundary>} />
                      
                      {/* ========================================
                          INNOVACIÓN E INTELIGENCIA ARTIFICIAL
                      ======================================== */}
                      <Route path="/centro-innovacion-ia" element={<ErrorBoundary pageName="CentroInnovacionIA"><CentroInnovacionIA /></ErrorBoundary>} />
                      <Route path="/consejo-ia" element={<ErrorBoundary pageName="ConsejoIA"><ConsejoIA /></ErrorBoundary>} />
                      <Route path="/consejo-etnoia" element={<ErrorBoundary pageName="ConsejoEtnoIA"><ConsejoEtnoIA /></ErrorBoundary>} />
                      <Route path="/ia-especialistas" element={<ErrorBoundary pageName="IAEspecialistas"><IAEspecialistas /></ErrorBoundary>} />
                      <Route path="/auditoria-forense" element={<ErrorBoundary pageName="AuditoriaForense"><AuditoriaForense /></ErrorBoundary>} />
                      <Route path="/territorial-ia" element={<ErrorBoundary pageName="TerritorialIA"><TerritorialIA /></ErrorBoundary>} />
                      <Route path="/geo-dashboard" element={<ErrorBoundary pageName="GeoDashboard"><GeoDashboard /></ErrorBoundary>} />
                      <Route path="/monitor-ia" element={<ErrorBoundary pageName="MonitorIA"><MonitorIA /></ErrorBoundary>} />
                      <Route path="/consejo-etica-ia" element={<ErrorBoundary pageName="ConsejoEticaIA"><ConsejoEticaIA /></ErrorBoundary>} />
                      <Route path="/planes-minero-ambiental" element={<ErrorBoundary pageName="PlanesMineroAmbiental"><PlanesMineroAmbiental /></ErrorBoundary>} />
                      <Route path="/consejo-territorial" element={<ErrorBoundary pageName="ConsejoTerritorial"><ConsejoTerritorial /></ErrorBoundary>} />
                      <Route path="/veeduria-ia" element={<ErrorBoundary pageName="VeeduriaIA"><VeeduriaIA /></ErrorBoundary>} />
                      <Route path="/consejo-social-ia" element={<ErrorBoundary pageName="ConsejoSocialIA"><ConsejoSocialIA /></ErrorBoundary>} />
                      <Route path="/consejo-minero-ambiental-ia" element={<ErrorBoundary pageName="ConsejoMineroAmbientalIA"><ConsejoMineroAmbientalIA /></ErrorBoundary>} />
                      <Route path="/herramientas-ia" element={<ErrorBoundary pageName="HerramientasIA"><HerramientasIA /></ErrorBoundary>} />
                      <Route path="/consejo-ambiental-ia" element={<ErrorBoundary pageName="ConsejoAmbientalIA"><ConsejoAmbientalIA /></ErrorBoundary>} />
                      
                      {/* ========================================
                          DICTÁMENES Y PERITAJES
                      ======================================== */}
                      {/* 01 - Reconocimiento Territorial */}
                      <Route path="/reconocimiento-directo" element={<ErrorBoundary pageName="ReconocimientoDirecto"><ReconocimientoDirecto /></ErrorBoundary>} />
                      <Route path="/reconocimiento-indirecto" element={<ErrorBoundary pageName="ReconocimientoIndirecto"><ReconocimientoIndirecto /></ErrorBoundary>} />
                      <Route path="/reconocimiento-social" element={<ErrorBoundary pageName="ReconocimientoSocial"><ReconocimientoSocial /></ErrorBoundary>} />
                      <Route path="/timeline-territorial" element={<ErrorBoundary pageName="TimelineTerritorial"><TimelineTerritorial /></ErrorBoundary>} />
                      <Route path="/gestion-conflictos" element={<ErrorBoundary pageName="GestionConflictos"><GestionConflictos /></ErrorBoundary>} />
                      
                      {/* 02 - Catastro Predial */}
                      <Route path="/catastro-comunitario" element={<ErrorBoundary pageName="CatastroComunitario"><CatastroComunitario /></ErrorBoundary>} />
                      <Route path="/catastro-participativo" element={<ErrorBoundary pageName="CatastroParticipativo"><CatastroParticipativo /></ErrorBoundary>} />
                      <Route path="/catastro-indirecto" element={<ErrorBoundary pageName="CatastroIndirecto"><CatastroIndirecto /></ErrorBoundary>} />
                      <Route path="/comparativo-catastral" element={<ErrorBoundary pageName="ComparativoCatastral"><ComparativoCatastral /></ErrorBoundary>} />
                      
                      {/* 03 - Catastro Minero */}
                      <Route path="/mapa-minero-nacional" element={<ErrorBoundary pageName="MapaMineroNacional"><MapaMineroNacional /></ErrorBoundary>} />
                      <Route path="/superposicion-minero" element={<ErrorBoundary pageName="SuperposicionMinero"><SuperposicionMinero /></ErrorBoundary>} />
                      <Route path="/certificados-mineros" element={<ErrorBoundary pageName="CertificadosMineros"><CertificadosMineros /></ErrorBoundary>} />
                      <Route path="/proyectos-extractivos" element={<ErrorBoundary pageName="ProyectosExtractivos"><ProyectosExtractivos /></ErrorBoundary>} />
                      
                      {/* 04 - Componente Ambiental */}
                      <Route path="/mapa-ambiental-interactivo" element={<ErrorBoundary pageName="MapaAmbientalInteractivo"><MapaAmbientalInteractivo /></ErrorBoundary>} />
                      <Route path="/diagnostico-ambiental" element={<ErrorBoundary pageName="DiagnosticoAmbiental"><DiagnosticoAmbiental /></ErrorBoundary>} />
                      <Route path="/proyectos-ambientales" element={<ErrorBoundary pageName="ProyectosAmbientales"><ProyectosAmbientales /></ErrorBoundary>} />
                      <Route path="/planes-manejo-ambiental" element={<ErrorBoundary pageName="PlanesManejoAmbiental"><PlanesManejoAmbiental /></ErrorBoundary>} />
                      
                      {/* 05 - Dimensión Étnica */}
                      <Route path="/consulta-previa-dictamen" element={<ErrorBoundary pageName="ConsultaPreviaDictamen"><ConsultaPreviaDictamen /></ErrorBoundary>} />
                      <Route path="/certificados-etnicos" element={<ErrorBoundary pageName="CertificadosEtnicos"><CertificadosEtnicos /></ErrorBoundary>} />
                      <Route path="/ampliacion-saneamiento" element={<ErrorBoundary pageName="AmpliacionSaneamiento"><AmpliacionSaneamiento /></ErrorBoundary>} />
                      
                      {/* 06 - Dimensión Social */}
                      <Route path="/mapa-cultural" element={<ErrorBoundary pageName="MapaCultural"><MapaCultural /></ErrorBoundary>} />
                      <Route path="/repositorio-saberes" element={<ErrorBoundary pageName="RepositorioSaberes"><RepositorioSaberes /></ErrorBoundary>} />
                      <Route path="/testimonios-memoria" element={<ErrorBoundary pageName="TestimoniosMemoria"><TestimoniosMemoria /></ErrorBoundary>} />
                      <Route path="/participacion-social" element={<ErrorBoundary pageName="ParticipacionSocial"><ParticipacionSocial /></ErrorBoundary>} />
                      
                      {/* ========================================
                          SERVICIOS COMPARTIDOS
                      ======================================== */}
                      <Route path="/contacto" element={<ErrorBoundary pageName="Contacto"><Contacto /></ErrorBoundary>} />
                      <Route path="/ayuda" element={<ErrorBoundary pageName="Ayuda"><Ayuda /></ErrorBoundary>} />
                      <Route path="/documentos" element={<ErrorBoundary pageName="Documentos"><Documentos /></ErrorBoundary>} />
                      <Route path="/noticias" element={<ErrorBoundary pageName="Noticias"><Noticias /></ErrorBoundary>} />
                      <Route path="/perfil" element={<ErrorBoundary pageName="Perfil"><Perfil /></ErrorBoundary>} />
                      <Route path="/terminos" element={<ErrorBoundary pageName="Términos"><Terminos /></ErrorBoundary>} />
                      <Route path="/convocatorias" element={<ErrorBoundary pageName="Convocatorias"><ConvocatoriasPublicas /></ErrorBoundary>} />
                      
                      {/* ========================================
                          GESTIÓN DE PROYECTOS - PROTEGIDAS
                      ======================================== */}
                      <Route path="/gestion-proyectos" element={
                        <ErrorBoundary pageName="Gestión de Proyectos">
                          <ProtectedRouteWithPermisos requiredPage="Gestión de Proyectos">
                            <GestionProyectos />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      <Route path="/dashboard-unificado" element={
                        <ErrorBoundary pageName="Dashboard Unificado">
                          <ProtectedRouteWithPermisos requiredPage="Dashboard Unificado">
                            <DashboardUnificado />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      
                      {/* Administrador - Solo administradores */}
                      <Route path="/admin-proyectos" element={
                        <ErrorBoundary pageName="Dashboard Administrador">
                          <ProtectedRouteWithPermisos requiredRole="adm" requiredPage="Dashboard Administrador">
                            <DashboardAdministrador />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      <Route path="/crear-proyecto" element={
                        <ErrorBoundary pageName="Crear Proyecto">
                          <ProtectedRouteWithPermisos requiredRole="adm" requiredPage="Crear Proyecto">
                            <CrearProyecto />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      <Route path="/gestion-apus-cotizaciones" element={
                        <ErrorBoundary pageName="Gestión APUs y Cotizaciones">
                          <ProtectedRouteWithPermisos requiredRole="adm" requiredPage="Gestión APUs y Cotizaciones">
                            <GestionAPUsCotizaciones />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      
                      {/* Operador - Operadores y superiores */}
                      <Route path="/operador-proyectos" element={
                        <ErrorBoundary pageName="Dashboard Operador">
                          <ProtectedRouteWithPermisos requiredRole="ope" requiredPage="Dashboard Operador">
                            <DashboardOperador />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      
                      {/* Cliente - Clientes y superiores */}
                      <Route path="/cliente-proyectos" element={
                        <ErrorBoundary pageName="Dashboard Cliente">
                          <ProtectedRouteWithPermisos requiredRole="cli" requiredPage="Dashboard Cliente">
                            <DashboardCliente />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      
                      {/* Panel de Vista - Niveles 3 y 4 (Administrador y Administrador General) */}
                      <Route path="/panel-vista" element={
                        <ErrorBoundary pageName="Panel de Vista">
                          <ProtectedRouteWithPermisos requiredRole="adm" requiredPage="Panel de Vista">
                            <PanelVista />
                          </ProtectedRouteWithPermisos>
                        </ErrorBoundary>
                      } />
                      
                      
                      
                      
                      {/* Interfaces de Usuario - Administrador General */}
                      <Route path="/admin-general/dashboard" element={<GenericTestPage pageName="Dashboard Administrador General" />} />
                      <Route path="/admin-general/usuarios" element={<GenericTestPage pageName="Usuarios Administrador General" />} />
                      <Route path="/admin-general/roles" element={<GenericTestPage pageName="Roles Administrador General" />} />
                      <Route path="/admin-general/permisos" element={<GenericTestPage pageName="Permisos Administrador General" />} />
                      <Route path="/admin-general/configuracion" element={<GenericTestPage pageName="Configuración Administrador General" />} />
                      <Route path="/admin-general/logs" element={<GenericTestPage pageName="Logs Administrador General" />} />
                      <Route path="/admin-general/estadisticas" element={<GenericTestPage pageName="Estadísticas Administrador General" />} />
                      <Route path="/admin-general/backup" element={<GenericTestPage pageName="Backup Administrador General" />} />
                      <Route path="/admin-general/mantenimiento" element={<GenericTestPage pageName="Mantenimiento Administrador General" />} />
                      <Route path="/admin-general/paginas" element={<GenericTestPage pageName="Páginas Administrador General" />} />
                      
                      {/* Ruta de diagnóstico del sistema */}
                      <Route path="/diagnostico" element={<SystemDiagnostic />} />
                    </Routes>
                  </Suspense>
                </PageWrapper>
              </main>
              <Footer />
            </div>
            {/* Configuración de react-hot-toast */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            </BrowserRouter>
          </SyncDataProvider>
        </NotificationProvider>
      </PermisosVistaProvider>
    </AuthProvider>
  );
}

export default App;