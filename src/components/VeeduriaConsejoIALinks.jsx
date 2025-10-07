import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Brain, Globe, Eye, ArrowRight, Lightbulb } from 'lucide-react';

const VeeduriaConsejoIALinks = ({ tipoVeeduria, datosCaso }) => {
  const getTipoVeeduriaTexto = (tipo) => {
    const tipos = {
      'contaminacion_agua': 'Contaminación de Agua',
      'deforestacion': 'Deforestación',
      'mineria_ilegal': 'Minería Ilegal',
      'invasión_territorial': 'Invasión Territorial',
      'contaminacion_aire': 'Contaminación del Aire',
      'destruccion_ecosistema': 'Destrucción de Ecosistema',
      'violacion_consulta_previa': 'Violación Consulta Previa',
      'licitacion_publica': 'Licitación Pública',
      'seleccion_abreviada': 'Selección Abreviada',
      'contratacion_directa': 'Contratación Directa',
      'proyecto': 'Proyecto',
      'programa': 'Programa',
      'plan': 'Plan'
    };
    return tipos[tipo] || 'Caso de Veeduría';
  };

  const getRecomendacionConsejoIA = (tipo) => {
    if (tipo && (tipo.includes('contratacion') || tipo.includes('licitacion'))) {
      return "Obtén asesoría especializada en contratación pública y procedimientos licitatorios.";
    }
    if (tipo && (tipo.includes('ambiental') || tipo.includes('contaminacion'))) {
      return "Consulta con especialistas en derecho ambiental y protección de recursos naturales.";
    }
    if (tipo && (tipo.includes('etnico') || tipo.includes('consulta_previa'))) {
      return "Para casos étnicos, es recomendable consultar primero con Consejo EtnoIA.";
    }
    return "Obtén asesoría legal especializada para fortalecer tu veeduría ciudadana.";
  };

  const getRecomendacionConsejoEtnoIA = (tipo) => {
    if (tipo && (tipo.includes('etnico') || tipo.includes('consulta_previa') || tipo.includes('territorial'))) {
      return "Consulta con especialistas en derechos étnicos, territoriales y consulta previa.";
    }
    if (tipo && (tipo.includes('indigena') || tipo.includes('afro') || tipo.includes('rom'))) {
      return "Obtén asesoría especializada en derechos de pueblos indígenas, afrocolombianos y rom.";
    }
    return "Para casos en territorios étnicos, consulta con especialistas en derechos colectivos.";
  };

  return (
    <Card className="p-6 mt-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
          <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
          Consultar con Especialistas IA
        </h3>
        <p className="text-gray-600">
          Fortalece tu veeduría con asesoría legal especializada y análisis con inteligencia artificial
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Enlace a Consejo IA */}
        <Card className="p-4 border-2 border-blue-200 hover:border-blue-400 transition-all">
          <div className="text-center">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Consejo IA - Asesoría Legal
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {getRecomendacionConsejoIA(tipoVeeduria)}
            </p>
            <Link 
              to="/consejo-ia" 
              state={{ 
                tipoConsulta: 'veeduria', 
                datos: datosCaso,
                contexto: `Veeduría: ${getTipoVeeduriaTexto(tipoVeeduria)}`
              }}
            >
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Brain className="h-4 w-4 mr-2" />
                Consultar con Consejo IA
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
        
        {/* Enlace a Consejo EtnoIA */}
        <Card className="p-4 border-2 border-green-200 hover:border-green-400 transition-all">
          <div className="text-center">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Consejo EtnoIA - Asesoría Étnica
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {getRecomendacionConsejoEtnoIA(tipoVeeduria)}
            </p>
            <Link 
              to="/consejo-etnoia" 
              state={{ 
                tipoConsulta: 'veeduria', 
                datos: datosCaso,
                contexto: `Veeduría Étnica: ${getTipoVeeduriaTexto(tipoVeeduria)}`
              }}
            >
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Globe className="h-4 w-4 mr-2" />
                Consultar con Consejo EtnoIA
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Información adicional */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start">
          <Eye className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h5 className="font-semibold text-blue-800 mb-1">💡 Consejo de Especialista</h5>
            <p className="text-sm text-blue-700">
              <strong>Para casos generales:</strong> Consulta con Consejo IA para obtener asesoría legal integral.
              <br />
              <strong>Para casos en territorios étnicos:</strong> Es recomendable consultar primero con Consejo EtnoIA 
              para obtener asesoría especializada en derechos de pueblos indígenas, afrocolombianos y rom, 
              consulta previa, y protección territorial.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enlaces adicionales */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Link to="/veeduria-gestion-publica">
          <Button variant="outline" className="w-full text-xs">
            👁️ Gestión Pública
          </Button>
        </Link>
        <Link to="/veeduria-contratacion-publica">
          <Button variant="outline" className="w-full text-xs">
            🔍 Contratación
          </Button>
        </Link>
        <Link to="/veeduria-derechos-ambientales">
          <Button variant="outline" className="w-full text-xs">
            🛡️ Derechos Ambientales
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default VeeduriaConsejoIALinks;
