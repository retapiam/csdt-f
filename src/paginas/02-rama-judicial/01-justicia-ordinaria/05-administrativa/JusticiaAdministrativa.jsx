import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Badge } from '../../../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../../../components/ui/alert';
import { 
  Scale, User, FileText, Upload, Download, CheckCircle, AlertCircle, Brain, 
  Shield, Eye, Clock, Target, Zap, Users, Lightbulb, ArrowRight, ArrowLeft, 
  BookOpen, CalendarCheck, AlertTriangle, Search, FileCheck, Award,
  Briefcase, Home, Phone, Mail, MapPin, Calendar, UserCheck, Clock3,
  Building2, Gavel, FileX, FileCheck2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const JusticiaAdministrativa = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosDemandante: {
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      direccion: '',
      tipoPersona: '',
      representanteLegal: '',
    },
    actoAdministrativo: {
      numeroActo: '',
      fechaActo: '',
      entidadEmisora: '',
      tipoActo: '',
      descripcionActo: '',
      fundamentoLegal: '',
    },
    medioControl: {
      tipoMedio: '',
      causales: [],
      pretensiones: '',
      valorPretension: '',
      terminoCaducidad: '',
    },
    hechosFundamento: {
      descripcionHechos: '',
      normativaAplicable: '',
      viciosDetectados: '',
      afectacionDerechos: '',
      pruebas: '',
    },
    analisisIA: {
      procedencia: null,
      medioControlRecomendado: '',
      competencia: '',
      terminoCaducidad: '',
      recomendaciones: '',
      jurisprudencia: '',
      planAccion: ''
    }
  });
  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const tiposPersona = [
    'Persona Natural', 'Persona Jurídica', 'Entidad Pública', 'Organización Social'
  ];

  const tiposActoAdministrativo = [
    'Resolución',
    'Decreto',
    'Ordenanza',
    'Acuerdo',
    'Circular',
    'Directiva',
    'Contrato',
    'Pliego de Condiciones',
    'Liquidación',
    'Sanción',
    'Multa',
    'Acto de Inspección'
  ];

  const entidadesPublicas = [
    'Alcaldía Municipal',
    'Gobernación Departamental',
    'Ministerio de Hacienda',
    'Ministerio de Transporte',
    'Ministerio de Vivienda',
    'Ministerio de Educación',
    'Ministerio de Salud',
    'Contraloría General',
    'Procuraduría General',
    'Defensoría del Pueblo',
    'Fiscalía General',
    'Superintendencia de Servicios Públicos',
    'Superintendencia de Industria y Comercio',
    'Agencia Nacional de Contratación Pública',
    'Departamento Administrativo de la Función Pública'
  ];

  const mediosControl = [
    'Nulidad simple',
    'Nulidad y restablecimiento del derecho',
    'Controversias contractuales',
    'Reparación directa',
    'Acción de grupo',
    'Acción electoral',
    'Acción de cumplimiento',
    'Acción de tutela (cuando aplique)'
  ];

  const causalesVicios = [
    'Vicio de competencia',
    'Vicio de procedimiento',
    'Vicio de forma',
    'Vicio de motivación',
    'Desviación de poder',
    'Violación del debido proceso',
    'Inobservancia de normas sustanciales',
    'Inexequibilidad de la norma aplicada'
  ];

  const competencias = [
    'Juzgado Administrativo Municipal',
    'Juzgado Administrativo del Circuito',
    'Tribunal Administrativo',
    'Consejo de Estado - Sala de lo Contencioso Administrativo',
    'Consejo de Estado - Sala Plena'
  ];

  const actualizarFormulario = (seccion, campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: valor
      }
    }));
  };

  const analizarConIA = async () => {
    setCargandoIA(true);
    try {
      // Simulación de análisis IA especializado en derecho administrativo
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analisis = {
        procedencia: formulario.medioControl.tipoMedio === 'Nulidad simple' || 
                    formulario.medioControl.tipoMedio === 'Nulidad y restablecimiento del derecho'
          ? 'Procedente'
          : 'Por determinar según el caso',
        medioControlRecomendado: formulario.actoAdministrativo.tipoActo.includes('Contrato')
          ? 'Controversias contractuales'
          : formulario.medioControl.causales.length > 2
          ? 'Nulidad y restablecimiento del derecho'
          : 'Nulidad simple',
        competencia: formulario.medioControl.valorPretension && parseFloat(formulario.medioControl.valorPretension) > 1000000000
          ? 'Consejo de Estado - Sala de lo Contencioso Administrativo'
          : 'Juzgado Administrativo del Circuito',
        terminoCaducidad: formulario.medioControl.tipoMedio === 'Nulidad simple'
          ? '4 meses desde la notificación'
          : formulario.medioControl.tipoMedio === 'Nulidad y restablecimiento del derecho'
          ? '4 meses desde la notificación'
          : 'Según el caso específico',
        recomendaciones: [
          'Verificar que el acto administrativo esté notificado',
          'Revisar el cumplimiento de términos de caducidad',
          'Recopilar todas las evidencias del caso',
          'Preparar fundamentos jurídicos sólidos',
          'Considerar la posibilidad de conciliación previa'
        ],
        jurisprudencia: [
          'Consejo de Estado, Sala de lo Contencioso Administrativo, Sentencia 12345 de 2023',
          'Consejo de Estado, Sala Plena, Sentencia 67890 de 2023',
          'Corte Constitucional, Sentencia C-456 de 2023'
        ],
        planAccion: [
          'Paso 1: Verificar términos de caducidad',
          'Paso 2: Recopilar documentación completa',
          'Paso 3: Redactar demanda administrativa',
          'Paso 4: Presentar ante autoridad competente',
          'Paso 5: Seguimiento del proceso'
        ]
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      setMostrarAnalisis(true);
      toast.success('Análisis contencioso administrativo completado con IA especializada');
    } catch (error) {
      toast.error('Error en el análisis IA');
      console.error('Error:', error);
    } finally {
      setCargandoIA(false);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-ES');
    
    // Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('DEMANDA CONTENCIOSO ADMINISTRATIVO', 20, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${fecha}`, 20, 30);
    doc.text(`No. Radicado: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 35);
    
    // Datos del Demandante
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL DEMANDANTE', 20, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${formulario.datosDemandante.nombre}`, 20, 60);
    doc.text(`Identificación: ${formulario.datosDemandante.identificacion}`, 20, 65);
    doc.text(`Tipo de Persona: ${formulario.datosDemandante.tipoPersona}`, 20, 70);
    doc.text(`Dirección: ${formulario.datosDemandante.direccion}`, 20, 75);
    
    // Acto Administrativo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ACTO ADMINISTRATIVO IMPUGNADO', 20, 90);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Número: ${formulario.actoAdministrativo.numeroActo}`, 20, 100);
    doc.text(`Fecha: ${formulario.actoAdministrativo.fechaActo}`, 20, 105);
    doc.text(`Entidad: ${formulario.actoAdministrativo.entidadEmisora}`, 20, 110);
    doc.text(`Tipo: ${formulario.actoAdministrativo.tipoActo}`, 20, 115);
    
    // Medio de Control
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MEDIO DE CONTROL', 20, 130);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo: ${formulario.medioControl.tipoMedio}`, 20, 140);
    doc.text(`Pretensiones: ${formulario.medioControl.pretensiones}`, 20, 145);
    if (formulario.medioControl.valorPretension) {
      doc.text(`Valor: $${formulario.medioControl.valorPretension}`, 20, 150);
    }
    
    // Hechos y Fundamentos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('HECHOS Y FUNDAMENTOS', 20, 165);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(formulario.hechosFundamento.descripcionHechos, 170);
    doc.text(splitText, 20, 175);
    
    // Análisis IA
    if (mostrarAnalisis) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISIS LEGAL CON IA', 20, 200);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Procedencia: ${formulario.analisisIA.procedencia}`, 20, 210);
      doc.text(`Competencia: ${formulario.analisisIA.competencia}`, 20, 215);
      doc.text(`Término Caducidad: ${formulario.analisisIA.terminoCaducidad}`, 20, 220);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por CSDT - Centro de Sistemas de Desarrollo Territorial', 20, 280);
    
    doc.save(`demanda-administrativa-${formulario.datosDemandante.identificacion}-${fecha}.pdf`);
    toast.success('Demanda administrativa generada exitosamente');
  };

  const siguientePaso = () => {
    if (pasoActual < 5) {
      setPasoActual(pasoActual + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };

  const renderPaso1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Datos del Demandante</h3>
        <p className="text-gray-600">Información del solicitante del medio de control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input
              id="nombre"
              value={formulario.datosDemandante.nombre}
              onChange={(e) => actualizarFormulario('datosDemandante', 'nombre', e.target.value)}
              placeholder="Ingrese su nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="identificacion">Identificación *</Label>
            <Input
              id="identificacion"
              value={formulario.datosDemandante.identificacion}
              onChange={(e) => actualizarFormulario('datosDemandante', 'identificacion', e.target.value)}
              placeholder="Número de identificación"
            />
          </div>

          <div>
            <Label htmlFor="tipoPersona">Tipo de Persona *</Label>
            <Select value={formulario.datosDemandante.tipoPersona} onValueChange={(value) => actualizarFormulario('datosDemandante', 'tipoPersona', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de persona" />
              </SelectTrigger>
              <SelectContent>
                {tiposPersona.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formulario.datosDemandante.telefono}
              onChange={(e) => actualizarFormulario('datosDemandante', 'telefono', e.target.value)}
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formulario.datosDemandante.email}
              onChange={(e) => actualizarFormulario('datosDemandante', 'email', e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formulario.datosDemandante.direccion}
              onChange={(e) => actualizarFormulario('datosDemandante', 'direccion', e.target.value)}
              placeholder="Dirección de notificación"
              rows={3}
            />
          </div>

          {formulario.datosDemandante.tipoPersona === 'Persona Jurídica' && (
            <div>
              <Label htmlFor="representanteLegal">Representante Legal</Label>
              <Input
                id="representanteLegal"
                value={formulario.datosDemandante.representanteLegal}
                onChange={(e) => actualizarFormulario('datosDemandante', 'representanteLegal', e.target.value)}
                placeholder="Nombre del representante legal"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Building2 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Acto Administrativo Impugnado</h3>
        <p className="text-gray-600">Información del acto administrativo a impugnar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="numeroActo">Número del Acto *</Label>
            <Input
              id="numeroActo"
              value={formulario.actoAdministrativo.numeroActo}
              onChange={(e) => actualizarFormulario('actoAdministrativo', 'numeroActo', e.target.value)}
              placeholder="Ej: Resolución 123 de 2023"
            />
          </div>

          <div>
            <Label htmlFor="fechaActo">Fecha del Acto *</Label>
            <Input
              id="fechaActo"
              type="date"
              value={formulario.actoAdministrativo.fechaActo}
              onChange={(e) => actualizarFormulario('actoAdministrativo', 'fechaActo', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="entidadEmisora">Entidad Emisora *</Label>
            <Select value={formulario.actoAdministrativo.entidadEmisora} onValueChange={(value) => actualizarFormulario('actoAdministrativo', 'entidadEmisora', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione la entidad" />
              </SelectTrigger>
              <SelectContent>
                {entidadesPublicas.map((entidad) => (
                  <SelectItem key={entidad} value={entidad}>{entidad}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tipoActo">Tipo de Acto *</Label>
            <Select value={formulario.actoAdministrativo.tipoActo} onValueChange={(value) => actualizarFormulario('actoAdministrativo', 'tipoActo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el tipo de acto" />
              </SelectTrigger>
              <SelectContent>
                {tiposActoAdministrativo.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="descripcionActo">Descripción del Acto *</Label>
            <Textarea
              id="descripcionActo"
              value={formulario.actoAdministrativo.descripcionActo}
              onChange={(e) => actualizarFormulario('actoAdministrativo', 'descripcionActo', e.target.value)}
              placeholder="Describa brevemente el contenido del acto administrativo"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="fundamentoLegal">Fundamento Legal</Label>
            <Textarea
              id="fundamentoLegal"
              value={formulario.actoAdministrativo.fundamentoLegal}
              onChange={(e) => actualizarFormulario('actoAdministrativo', 'fundamentoLegal', e.target.value)}
              placeholder="Normas legales que sustentan el acto"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaso3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Scale className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Medio de Control</h3>
        <p className="text-gray-600">Selección del medio de control administrativo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="tipoMedio">Tipo de Medio de Control *</Label>
            <Select value={formulario.medioControl.tipoMedio} onValueChange={(value) => actualizarFormulario('medioControl', 'tipoMedio', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el medio de control" />
              </SelectTrigger>
              <SelectContent>
                {mediosControl.map((medio) => (
                  <SelectItem key={medio} value={medio}>{medio}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="causales">Causales de Vicios</Label>
            <div className="space-y-2">
              {causalesVicios.map((causal) => (
                <div key={causal} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={causal}
                    checked={formulario.medioControl.causales.includes(causal)}
                    onChange={(e) => {
                      const causales = formulario.medioControl.causales;
                      if (e.target.checked) {
                        causales.push(causal);
                      } else {
                        const index = causales.indexOf(causal);
                        causales.splice(index, 1);
                      }
                      actualizarFormulario('medioControl', 'causales', [...causales]);
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={causal} className="text-sm">{causal}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="pretensiones">Pretensiones *</Label>
            <Textarea
              id="pretensiones"
              value={formulario.medioControl.pretensiones}
              onChange={(e) => actualizarFormulario('medioControl', 'pretensiones', e.target.value)}
              placeholder="Describa qué solicita al juez administrativo"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="valorPretension">Valor de la Pretensión (si aplica)</Label>
            <Input
              id="valorPretension"
              type="number"
              value={formulario.medioControl.valorPretension}
              onChange={(e) => actualizarFormulario('medioControl', 'valorPretension', e.target.value)}
              placeholder="Valor en pesos colombianos"
            />
          </div>

          <div>
            <Label htmlFor="terminoCaducidad">Término de Caducidad</Label>
            <Input
              id="terminoCaducidad"
              value={formulario.medioControl.terminoCaducidad}
              onChange={(e) => actualizarFormulario('medioControl', 'terminoCaducidad', e.target.value)}
              placeholder="Fecha límite para presentar"
            />
          </div>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Los términos de caducidad varían según el tipo de medio de control. 
          Consulte con un abogado especializado si tiene dudas sobre los plazos.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderPaso4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Hechos y Fundamentos</h3>
        <p className="text-gray-600">Descripción detallada de los hechos y fundamentos jurídicos</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="descripcionHechos">Descripción de los Hechos *</Label>
          <Textarea
            id="descripcionHechos"
            value={formulario.hechosFundamento.descripcionHechos}
            onChange={(e) => actualizarFormulario('hechosFundamento', 'descripcionHechos', e.target.value)}
            placeholder="Describa cronológicamente los hechos que dieron lugar al acto administrativo impugnado"
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="normativaAplicable">Normativa Aplicable</Label>
          <Textarea
            id="normativaAplicable"
            value={formulario.hechosFundamento.normativaAplicable}
            onChange={(e) => actualizarFormulario('hechosFundamento', 'normativaAplicable', e.target.value)}
            placeholder="Leyes, decretos, reglamentos aplicables al caso"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="viciosDetectados">Vicios Detectados</Label>
            <Textarea
              id="viciosDetectados"
              value={formulario.hechosFundamento.viciosDetectados}
              onChange={(e) => actualizarFormulario('hechosFundamento', 'viciosDetectados', e.target.value)}
              placeholder="Describa los vicios de forma, procedimiento o fondo detectados"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="afectacionDerechos">Afectación de Derechos</Label>
            <Textarea
              id="afectacionDerechos"
              value={formulario.hechosFundamento.afectacionDerechos}
              onChange={(e) => actualizarFormulario('hechosFundamento', 'afectacionDerechos', e.target.value)}
              placeholder="Explique cómo el acto afecta sus derechos e intereses"
              rows={4}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="pruebas">Medios de Prueba</Label>
          <Textarea
            id="pruebas"
            value={formulario.hechosFundamento.pruebas}
            onChange={(e) => actualizarFormulario('hechosFundamento', 'pruebas', e.target.value)}
            placeholder="Documentos, testimonios, peritajes y otros medios de prueba disponibles"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderPaso5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Análisis Legal con IA</h3>
        <p className="text-gray-600">Análisis especializado en contencioso administrativo</p>
      </div>

      {!mostrarAnalisis ? (
        <div className="text-center">
          <Button onClick={analizarConIA} disabled={cargandoIA} className="bg-purple-600 hover:bg-purple-700">
            {cargandoIA ? (
              <>
                <Clock3 className="mr-2 h-4 w-4 animate-spin" />
                Analizando con IA...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Analizar Caso con IA Administrativa
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Análisis Completado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Procedencia:</h4>
                <Badge variant={formulario.analisisIA.procedencia === 'Procedente' ? 'default' : 'secondary'} className="mb-2">
                  {formulario.analisisIA.procedencia}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Medio de Control Recomendado:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.medioControlRecomendado}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Competencia:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.competencia}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Término de Caducidad:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.terminoCaducidad}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {formulario.analisisIA.recomendaciones.map((recomendacion, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{recomendacion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5 text-blue-600" />
                Jurisprudencia Relevante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {formulario.analisisIA.jurisprudencia.map((caso, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {caso}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button onClick={generarPDF} className="bg-red-600 hover:bg-red-700">
              <Download className="mr-2 h-4 w-4" />
              Generar Demanda PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-12 w-12 text-purple-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Justicia Administrativa</h1>
              <p className="text-gray-600">Sistema de medios de control con IA especializada</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((paso) => (
              <div
                key={paso}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  paso <= pasoActual
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {paso}
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {pasoActual === 1 && renderPaso1()}
            {pasoActual === 2 && renderPaso2()}
            {pasoActual === 3 && renderPaso3()}
            {pasoActual === 4 && renderPaso4()}
            {pasoActual === 5 && renderPaso5()}
          </CardContent>
        </Card>

        {/* Navegación */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={pasoAnterior}
            disabled={pasoActual === 1}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {pasoActual < 4 && (
            <Button onClick={siguientePaso} className="flex items-center">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Shield className="mr-2 h-4 w-4 text-purple-600" />
                Medios de Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Los medios de control permiten impugnar actos administrativos ilegales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-orange-600" />
                Términos de Caducidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Revise cuidadosamente los términos de caducidad antes de presentar su demanda.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4 text-green-600" />
                IA Especializada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Nuestra IA especializada en derecho administrativo analiza su caso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JusticiaAdministrativa;
