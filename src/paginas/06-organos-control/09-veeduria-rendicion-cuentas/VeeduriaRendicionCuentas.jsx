import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert } from '../../../components/ui/alert';
import { 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  Clock,
  Users,
  Building,
  DollarSign,
  Calendar,
  Brain,
  Zap,
  BarChart3,
  Info,
  ArrowRight,
  ArrowLeft,
  Eye,
  FileCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

const VeeduriaRendicionCuentas = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosVeedor: { nombre: '', documento: '', email: '', telefono: '', organizacion: '' },
    rendicionCuentas: {
      entidad: '',
      periodo: '',
      tipoRendicion: '',
      recursos: '',
      metas: '',
      resultados: '',
      audienciaPublica: '',
      fechaAudiencia: ''
    },
    analisisIA: {
      especialistaPresupuesto: '',
      especialistaGestion: '',
      especialistaTransparencia: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    presupuesto: false,
    gestion: false,
    transparencia: false,
    analisisUnificado: false
  });

  const [progreso, setProgreso] = useState(0);

  const tiposRendicion = [
    { id: 'presupuestal', nombre: 'Rendición Presupuestal' },
    { id: 'gestion', nombre: 'Rendición de Gestión' },
    { id: 'resultados', nombre: 'Rendición de Resultados' },
    { id: 'audiencia_publica', nombre: 'Audiencia Pública' }
  ];

  const especialistasIA = [
    {
      id: 'especialistaPresupuesto',
      nombre: 'Dra. Patricia Vargas - Especialista Presupuestal',
      icono: '💰',
      descripcion: 'Experta en análisis presupuestal y uso de recursos públicos',
      especialidades: ['Presupuesto Público', 'Ejecución Presupuestal', 'Control Fiscal']
    },
    {
      id: 'especialistaGestion',
      nombre: 'Dr. Carlos Mendoza - Especialista en Gestión',
      icono: '📊',
      descripcion: 'Especialista en gestión pública y cumplimiento de metas',
      especialidades: ['Gestión Pública', 'Indicadores', 'Cumplimiento de Metas']
    },
    {
      id: 'especialistaTransparencia',
      nombre: 'Dra. Ana López - Especialista en Transparencia',
      icono: '🔍',
      descripcion: 'Experta en transparencia y acceso a la información pública',
      especialidades: ['Transparencia', 'Acceso a Información', 'Participación Ciudadana']
    }
  ];

  useEffect(() => {
    const completados = [
      !!(formulario.datosVeedor.nombre && formulario.datosVeedor.email),
      !!(formulario.rendicionCuentas.entidad && formulario.rendicionCuentas.periodo),
      !!formulario.analisisIA.analisisUnificado
    ].filter(Boolean).length;
    setProgreso(Math.round((completados / 3) * 100));
  }, [formulario]);

  const handleInputChange = (paso, campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [paso]: { ...prev[paso], [campo]: valor }
    }));
  };

  const analizarConIA = async (tipoEspecialista) => {
    setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analisis = {
        especialistaPresupuesto: `Análisis Presupuestal:\n\nEntidad: ${formulario.rendicionCuentas.entidad}\nPeriodo: ${formulario.rendicionCuentas.periodo}\n\n1. Análisis de ejecución presupuestal\n2. Verificación de uso de recursos\n3. Identificación de desviaciones\n4. Evaluación de eficiencia en el gasto\n5. Recomendaciones de control fiscal`,
        
        especialistaGestion: `Análisis de Gestión:\n\n1. Evaluación de cumplimiento de metas\n2. Análisis de resultados obtenidos\n3. Verificación de indicadores de gestión\n4. Identificación de brechas\n5. Recomendaciones de mejora`,
        
        especialistaTransparencia: `Análisis de Transparencia:\n\n1. Evaluación de acceso a información\n2. Análisis de audiencias públicas\n3. Verificación de publicación de informes\n4. Evaluación de participación ciudadana\n5. Recomendaciones de transparencia`
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          [tipoEspecialista]: analisis[tipoEspecialista]
        }
      }));

      toast.success(`Análisis completado`);
    } catch (error) {
      toast.error('Error al realizar análisis');
    } finally {
      setCargandoIA(prev => ({ ...prev, [tipoEspecialista]: false }));
    }
  };

  const generarAnalisisUnificado = async () => {
    setCargandoIA(prev => ({ ...prev, analisisUnificado: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const analisisUnificado = `ANÁLISIS UNIFICADO DE RENDICIÓN DE CUENTAS

ENTIDAD: ${formulario.rendicionCuentas.entidad}
PERIODO: ${formulario.rendicionCuentas.periodo}
TIPO: ${formulario.rendicionCuentas.tipoRendicion}

RESUMEN EJECUTIVO:
La veeduría a la rendición de cuentas de ${formulario.rendicionCuentas.entidad} para el periodo ${formulario.rendicionCuentas.periodo} busca garantizar transparencia en el uso de recursos públicos y cumplimiento de metas institucionales.

HALLAZGOS PRINCIPALES:
1. Recursos asignados: ${formulario.rendicionCuentas.recursos}
2. Metas establecidas: ${formulario.rendicionCuentas.metas}
3. Resultados obtenidos: ${formulario.rendicionCuentas.resultados}
4. Audiencia pública: ${formulario.rendicionCuentas.audienciaPublica}

RECOMENDACIONES:
1. Verificar ejecución presupuestal completa
2. Evaluar cumplimiento de indicadores
3. Promover participación ciudadana en audiencias
4. Exigir publicación de información completa
5. Realizar seguimiento continuo

CONCLUSIONES:
La rendición de cuentas es fundamental para garantizar la transparencia y el uso adecuado de recursos públicos. Se requiere seguimiento permanente y participación activa de la ciudadanía.`;

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          analisisUnificado
        }
      }));

      toast.success('Análisis unificado completado');
    } catch (error) {
      toast.error('Error al generar análisis');
    } finally {
      setCargandoIA(prev => ({ ...prev, analisisUnificado: false }));
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('VEEDURÍA - RENDICIÓN DE CUENTAS', 20, 30);
    doc.setFontSize(10);
    doc.text(`Entidad: ${formulario.rendicionCuentas.entidad}`, 20, 50);
    doc.text(`Periodo: ${formulario.rendicionCuentas.periodo}`, 20, 60);
    
    if (formulario.analisisIA.analisisUnificado) {
      doc.setFontSize(12);
      doc.text('ANÁLISIS IA', 20, 80);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(lines, 20, 90);
    }
    
    doc.save('veeduria-rendicion-cuentas.pdf');
    toast.success('PDF generado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Eye className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Veeduría Ciudadana</h1>
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">Rendición de Cuentas</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Sistema para exigir que las entidades públicas informen sobre el uso de recursos, 
            metas y resultados, promoviendo audiencias públicas de seguimiento.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-medium text-blue-600">{progreso}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              {pasoActual === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Users className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Datos del Veedor</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Nombre Completo *</Label>
                      <Input
                        value={formulario.datosVeedor.nombre}
                        onChange={(e) => handleInputChange('datosVeedor', 'nombre', e.target.value)}
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <Label>Documento *</Label>
                      <Input
                        value={formulario.datosVeedor.documento}
                        onChange={(e) => handleInputChange('datosVeedor', 'documento', e.target.value)}
                        placeholder="Número de documento"
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formulario.datosVeedor.email}
                        onChange={(e) => handleInputChange('datosVeedor', 'email', e.target.value)}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        value={formulario.datosVeedor.telefono}
                        onChange={(e) => handleInputChange('datosVeedor', 'telefono', e.target.value)}
                        placeholder="300 123 4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {pasoActual === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <FileCheck className="h-8 w-8 text-indigo-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Rendición de Cuentas</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Entidad *</Label>
                      <Input
                        value={formulario.rendicionCuentas.entidad}
                        onChange={(e) => handleInputChange('rendicionCuentas', 'entidad', e.target.value)}
                        placeholder="Nombre de la entidad"
                      />
                    </div>
                    <div>
                      <Label>Periodo *</Label>
                      <Input
                        value={formulario.rendicionCuentas.periodo}
                        onChange={(e) => handleInputChange('rendicionCuentas', 'periodo', e.target.value)}
                        placeholder="Ej: 2024"
                      />
                    </div>
                    <div>
                      <Label>Tipo de Rendición</Label>
                      <Select
                        value={formulario.rendicionCuentas.tipoRendicion}
                        onValueChange={(value) => handleInputChange('rendicionCuentas', 'tipoRendicion', value)}
                      >
                        <option value="">Seleccione</option>
                        {tiposRendicion.map(tipo => (
                          <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label>Recursos Asignados</Label>
                      <Input
                        value={formulario.rendicionCuentas.recursos}
                        onChange={(e) => handleInputChange('rendicionCuentas', 'recursos', e.target.value)}
                        placeholder="Valor en pesos"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Metas Establecidas</Label>
                      <Textarea
                        value={formulario.rendicionCuentas.metas}
                        onChange={(e) => handleInputChange('rendicionCuentas', 'metas', e.target.value)}
                        placeholder="Describa las metas establecidas"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Resultados Obtenidos</Label>
                      <Textarea
                        value={formulario.rendicionCuentas.resultados}
                        onChange={(e) => handleInputChange('rendicionCuentas', 'resultados', e.target.value)}
                        placeholder="Describa los resultados obtenidos"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {pasoActual === 3 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Brain className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Análisis IA</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {especialistasIA.map((especialista) => (
                      <Card key={especialista.id} className="p-4">
                        <div className="text-2xl mb-2">{especialista.icono}</div>
                        <h4 className="font-semibold text-sm mb-2">{especialista.nombre}</h4>
                        <p className="text-xs text-gray-600 mb-3">{especialista.descripcion}</p>
                        <Button
                          onClick={() => analizarConIA(especialista.id)}
                          disabled={cargandoIA[especialista.id]}
                          size="sm"
                          className="w-full"
                        >
                          {cargandoIA[especialista.id] ? (
                            <><Clock className="h-3 w-3 mr-1 animate-spin" />Analizando...</>
                          ) : (
                            <><Zap className="h-3 w-3 mr-1" />Analizar</>
                          )}
                        </Button>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">Análisis Unificado</h4>
                      <Button
                        onClick={generarAnalisisUnificado}
                        disabled={cargandoIA.analisisUnificado}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600"
                      >
                        {cargandoIA.analisisUnificado ? (
                          <><Clock className="h-4 w-4 mr-2 animate-spin" />Generando...</>
                        ) : (
                          <><Brain className="h-4 w-4 mr-2" />Generar</>
                        )}
                      </Button>
                    </div>
                    
                    {formulario.analisisIA.analisisUnificado && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">
                          {formulario.analisisIA.analisisUnificado}
                        </pre>
                      </div>
                    )}
                  </Card>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={generarPDF}
                      disabled={!formulario.analisisIA.analisisUnificado}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3"
                      size="lg"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Generar PDF
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => setPasoActual(Math.max(1, pasoActual - 1))}
                  disabled={pasoActual === 1}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button
                  onClick={() => setPasoActual(Math.min(3, pasoActual + 1))}
                  disabled={pasoActual === 3}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Información
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Building className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Entidad:</strong> {formulario.rendicionCuentas.entidad || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Periodo:</strong> {formulario.rendicionCuentas.periodo || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                  <span><strong>Recursos:</strong> {formulario.rendicionCuentas.recursos || 'N/A'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span className="font-medium text-blue-600">{progreso}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Análisis IA</span>
                  <span className="font-medium text-purple-600">
                    {Object.values(formulario.analisisIA).filter(val => val).length}/4
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeeduriaRendicionCuentas;

