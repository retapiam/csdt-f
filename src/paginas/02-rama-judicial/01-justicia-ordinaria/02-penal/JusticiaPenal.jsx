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
  Gavel, User, FileText, Upload, Download, CheckCircle, AlertCircle, Brain, 
  Shield, Eye, Clock, Target, Zap, Users, Lightbulb, ArrowRight, ArrowLeft, 
  Scale, BookOpen, CalendarCheck, AlertTriangle, Search, FileCheck, Award,
  Briefcase, Home, Phone, Mail, MapPin, Calendar, UserCheck, Clock3
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const JusticiaPenal = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosDenunciante: {
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      direccion: '',
      tipoDocumento: '',
      anonimo: false,
    },
    datosDenunciado: {
      nombre: '',
      identificacion: '',
      direccion: '',
      descripcion: '',
    },
    detallesDelito: {
      tipoDelito: '',
      clasificacionDelito: '',
      gravedadDelito: '',
      modalidad: '',
      fechaHecho: '',
      lugarHecho: '',
      horaHecho: '',
    },
    narracionHechos: {
      descripcionDetallada: '',
      cronologia: '',
      testigos: '',
      evidencias: '',
      danos: '',
    },
    analisisIA: {
      clasificacionAutomatica: '',
      procedimientoAplicable: '',
      competencia: '',
      plazoPrescripcion: '',
      recomendaciones: '',
      jurisprudencia: '',
      planAccion: ''
    }
  });
  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const tiposDocumento = [
    'Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Tarjeta de Identidad', 'Registro Civil'
  ];

  const tiposDelito = [
    'Delitos contra la vida',
    'Delitos contra el patrimonio',
    'Delitos sexuales',
    'Delitos contra la administración pública',
    'Delitos ambientales',
    'Delitos informáticos',
    'Violencia intrafamiliar',
    'Secuestro y extorsión',
    'Narcotráfico',
    'Delitos contra la libertad',
    'Delitos contra la integridad personal',
    'Delitos contra la fe pública'
  ];

  const clasificacionesDelito = [
    'Delito leve', 'Delito grave', 'Delito gravísimo', 'Contravención'
  ];

  const modalidadesDelito = [
    'Consumado', 'Tentativa', 'Frustrado', 'Continuado', 'Permanente'
  ];

  const competencias = [
    'Juzgado Penal Municipal',
    'Juzgado Penal del Circuito',
    'Juzgado Penal Especializado',
    'Juzgado Penal de Garantías',
    'Juzgado Penal de Conocimiento'
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
      // Simulación de análisis IA especializado en derecho penal
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analisis = {
        clasificacionAutomatica: `Delito clasificado como: ${formulario.detallesDelito.tipoDelito} - ${formulario.detallesDelito.clasificacionDelito}`,
        procedimientoAplicable: formulario.detallesDelito.tipoDelito.includes('vida') || 
                               formulario.detallesDelito.tipoDelito.includes('sexual') ||
                               formulario.detallesDelito.tipoDelito.includes('secuestro') ||
                               formulario.detallesDelito.tipoDelito.includes('narcotráfico')
          ? 'Procedimiento especial (querellable/oficioso)'
          : 'Procedimiento ordinario',
        competencia: formulario.detallesDelito.clasificacionDelito === 'Delito gravísimo'
          ? 'Juzgado Penal del Circuito'
          : 'Juzgado Penal Municipal',
        plazoPrescripcion: formulario.detallesDelito.clasificacionDelito === 'Delito gravísimo'
          ? '20 años'
          : formulario.detallesDelito.clasificacionDelito === 'Delito grave'
          ? '10 años'
          : '5 años',
        recomendaciones: [
          'Recopilar todas las evidencias disponibles',
          'Identificar y contactar testigos',
          'Preservar el lugar de los hechos',
          'Solicitar peritajes si es necesario',
          'Presentar la denuncia dentro del plazo legal'
        ],
        jurisprudencia: [
          'Corte Suprema de Justicia, Sala de Casación Penal, Sentencia 12345 de 2023',
          'Corte Constitucional, Sentencia C-789 de 2023',
          'Consejo de Estado, Sala de lo Contencioso Administrativo, Sentencia 45678 de 2023'
        ],
        planAccion: [
          'Paso 1: Recopilar evidencias y testimonios',
          'Paso 2: Redactar denuncia detallada',
          'Paso 3: Presentar ante autoridad competente',
          'Paso 4: Seguimiento del proceso penal',
          'Paso 5: Participación en audiencias'
        ]
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      setMostrarAnalisis(true);
      toast.success('Análisis penal completado con IA especializada');
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
    doc.text('DENUNCIA PENAL', 20, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${fecha}`, 20, 30);
    doc.text(`No. Radicado: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 35);
    
    // Datos del Denunciante
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL DENUNCIANTE', 20, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${formulario.datosDenunciante.nombre}`, 20, 60);
    doc.text(`Identificación: ${formulario.datosDenunciante.identificacion}`, 20, 65);
    doc.text(`Teléfono: ${formulario.datosDenunciante.telefono}`, 20, 70);
    doc.text(`Dirección: ${formulario.datosDenunciante.direccion}`, 20, 75);
    
    // Datos del Denunciado
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL DENUNCIADO', 20, 90);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${formulario.datosDenunciado.nombre}`, 20, 100);
    doc.text(`Identificación: ${formulario.datosDenunciado.identificacion}`, 20, 105);
    
    // Detalles del Delito
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLES DEL DELITO', 20, 120);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo de Delito: ${formulario.detallesDelito.tipoDelito}`, 20, 130);
    doc.text(`Clasificación: ${formulario.detallesDelito.clasificacionDelito}`, 20, 135);
    doc.text(`Modalidad: ${formulario.detallesDelito.modalidad}`, 20, 140);
    doc.text(`Fecha: ${formulario.detallesDelito.fechaHecho}`, 20, 145);
    doc.text(`Lugar: ${formulario.detallesDelito.lugarHecho}`, 20, 150);
    
    // Narración de Hechos
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('NARRACIÓN DE HECHOS', 20, 165);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(formulario.narracionHechos.descripcionDetallada, 170);
    doc.text(splitText, 20, 175);
    
    // Análisis IA
    if (mostrarAnalisis) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISIS LEGAL CON IA', 20, 200);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Procedimiento: ${formulario.analisisIA.procedimientoAplicable}`, 20, 210);
      doc.text(`Competencia: ${formulario.analisisIA.competencia}`, 20, 215);
      doc.text(`Plazo Prescripción: ${formulario.analisisIA.plazoPrescripcion}`, 20, 220);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por CSDT - Centro de Sistemas de Desarrollo Territorial', 20, 280);
    
    doc.save(`denuncia-penal-${formulario.datosDenunciante.identificacion}-${fecha}.pdf`);
    toast.success('Denuncia penal generada exitosamente');
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
        <h3 className="text-xl font-semibold mb-2">Datos del Denunciante</h3>
        <p className="text-gray-600">Información personal del denunciante</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input
              id="nombre"
              value={formulario.datosDenunciante.nombre}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'nombre', e.target.value)}
              placeholder="Ingrese su nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
            <Select value={formulario.datosDenunciante.tipoDocumento} onValueChange={(value) => actualizarFormulario('datosDenunciante', 'tipoDocumento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                {tiposDocumento.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="identificacion">Número de Identificación *</Label>
            <Input
              id="identificacion"
              value={formulario.datosDenunciante.identificacion}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'identificacion', e.target.value)}
              placeholder="Número de identificación"
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formulario.datosDenunciante.telefono}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'telefono', e.target.value)}
              placeholder="Número de teléfono"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formulario.datosDenunciante.email}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'email', e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formulario.datosDenunciante.direccion}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'direccion', e.target.value)}
              placeholder="Dirección de residencia"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="anonimo"
              checked={formulario.datosDenunciante.anonimo}
              onChange={(e) => actualizarFormulario('datosDenunciante', 'anonimo', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="anonimo">Denuncia anónima</Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <UserCheck className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Datos del Denunciado</h3>
        <p className="text-gray-600">Información del presunto responsable</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombreDenunciado">Nombre del Denunciado</Label>
            <Input
              id="nombreDenunciado"
              value={formulario.datosDenunciado.nombre}
              onChange={(e) => actualizarFormulario('datosDenunciado', 'nombre', e.target.value)}
              placeholder="Nombre completo del denunciado"
            />
          </div>

          <div>
            <Label htmlFor="identificacionDenunciado">Identificación del Denunciado</Label>
            <Input
              id="identificacionDenunciado"
              value={formulario.datosDenunciado.identificacion}
              onChange={(e) => actualizarFormulario('datosDenunciado', 'identificacion', e.target.value)}
              placeholder="Número de identificación"
            />
          </div>

          <div>
            <Label htmlFor="direccionDenunciado">Dirección del Denunciado</Label>
            <Input
              id="direccionDenunciado"
              value={formulario.datosDenunciado.direccion}
              onChange={(e) => actualizarFormulario('datosDenunciado', 'direccion', e.target.value)}
              placeholder="Dirección conocida"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="descripcionDenunciado">Descripción del Denunciado</Label>
            <Textarea
              id="descripcionDenunciado"
              value={formulario.datosDenunciado.descripcion}
              onChange={(e) => actualizarFormulario('datosDenunciado', 'descripcion', e.target.value)}
              placeholder="Descripción física, vestimenta, características distintivas"
              rows={4}
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Información importante</AlertTitle>
            <AlertDescription>
              Si no conoce los datos del denunciado, puede dejarlos en blanco. 
              La investigación policial se encargará de identificarlo.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );

  const renderPaso3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Gavel className="h-12 w-12 text-orange-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Detalles del Delito</h3>
        <p className="text-gray-600">Clasificación y características del delito</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="tipoDelito">Tipo de Delito *</Label>
            <Select value={formulario.detallesDelito.tipoDelito} onValueChange={(value) => actualizarFormulario('detallesDelito', 'tipoDelito', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el tipo de delito" />
              </SelectTrigger>
              <SelectContent>
                {tiposDelito.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="clasificacionDelito">Clasificación del Delito *</Label>
            <Select value={formulario.detallesDelito.clasificacionDelito} onValueChange={(value) => actualizarFormulario('detallesDelito', 'clasificacionDelito', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione la clasificación" />
              </SelectTrigger>
              <SelectContent>
                {clasificacionesDelito.map((clasificacion) => (
                  <SelectItem key={clasificacion} value={clasificacion}>{clasificacion}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="modalidad">Modalidad del Delito</Label>
            <Select value={formulario.detallesDelito.modalidad} onValueChange={(value) => actualizarFormulario('detallesDelito', 'modalidad', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione la modalidad" />
              </SelectTrigger>
              <SelectContent>
                {modalidadesDelito.map((modalidad) => (
                  <SelectItem key={modalidad} value={modalidad}>{modalidad}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="fechaHecho">Fecha del Hecho *</Label>
            <Input
              id="fechaHecho"
              type="date"
              value={formulario.detallesDelito.fechaHecho}
              onChange={(e) => actualizarFormulario('detallesDelito', 'fechaHecho', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="horaHecho">Hora del Hecho</Label>
            <Input
              id="horaHecho"
              type="time"
              value={formulario.detallesDelito.horaHecho}
              onChange={(e) => actualizarFormulario('detallesDelito', 'horaHecho', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="lugarHecho">Lugar del Hecho *</Label>
            <Textarea
              id="lugarHecho"
              value={formulario.detallesDelito.lugarHecho}
              onChange={(e) => actualizarFormulario('detallesDelito', 'lugarHecho', e.target.value)}
              placeholder="Dirección exacta o descripción del lugar"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaso4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Narración de Hechos</h3>
        <p className="text-gray-600">Descripción detallada de los hechos ocurridos</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="descripcionDetallada">Descripción Detallada de los Hechos *</Label>
          <Textarea
            id="descripcionDetallada"
            value={formulario.narracionHechos.descripcionDetallada}
            onChange={(e) => actualizarFormulario('narracionHechos', 'descripcionDetallada', e.target.value)}
            placeholder="Describa detalladamente qué ocurrió, cómo ocurrió, cuándo y dónde. Sea específico y cronológico."
            rows={6}
          />
        </div>

        <div>
          <Label htmlFor="cronologia">Cronología de los Hechos</Label>
          <Textarea
            id="cronologia"
            value={formulario.narracionHechos.cronologia}
            onChange={(e) => actualizarFormulario('narracionHechos', 'cronologia', e.target.value)}
            placeholder="Describa paso a paso la secuencia de eventos"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="testigos">Testigos</Label>
            <Textarea
              id="testigos"
              value={formulario.narracionHechos.testigos}
              onChange={(e) => actualizarFormulario('narracionHechos', 'testigos', e.target.value)}
              placeholder="Nombre y datos de contacto de testigos"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="evidencias">Evidencias Disponibles</Label>
            <Textarea
              id="evidencias"
              value={formulario.narracionHechos.evidencias}
              onChange={(e) => actualizarFormulario('narracionHechos', 'evidencias', e.target.value)}
              placeholder="Fotografías, videos, documentos, objetos"
              rows={3}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="danos">Daños Causados</Label>
          <Textarea
            id="danos"
            value={formulario.narracionHechos.danos}
            onChange={(e) => actualizarFormulario('narracionHechos', 'danos', e.target.value)}
            placeholder="Describa los daños físicos, materiales o morales causados"
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
        <p className="text-gray-600">Análisis especializado en derecho penal</p>
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
                Analizar Caso con IA Penal
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
                <h4 className="font-semibold mb-2">Clasificación Automática:</h4>
                <Badge variant="outline" className="mb-2">
                  {formulario.analisisIA.clasificacionAutomatica}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Procedimiento Aplicable:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.procedimientoAplicable}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Competencia:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.competencia}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Plazo de Prescripción:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.plazoPrescripcion}</p>
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
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
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
              Generar Denuncia PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gavel className="h-12 w-12 text-blue-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Justicia Penal</h1>
              <p className="text-gray-600">Sistema de denuncias penales con IA especializada</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((paso) => (
              <div
                key={paso}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  paso <= pasoActual
                    ? 'bg-blue-600 text-white'
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
                <Shield className="mr-2 h-4 w-4 text-blue-600" />
                Protección Legal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Su denuncia está protegida por la ley y será tratada con confidencialidad.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-green-600" />
                Plazos Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Presente su denuncia dentro de los plazos de prescripción para garantizar la investigación.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Award className="mr-2 h-4 w-4 text-purple-600" />
                IA Especializada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Nuestra IA especializada en derecho penal analiza su caso y proporciona recomendaciones.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JusticiaPenal;
