import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { 
  Heart, User, FileText, Upload, Download, CheckCircle, AlertCircle, Brain, 
  Shield, Eye, Clock, Target, Zap, Users, Lightbulb, ArrowRight, ArrowLeft, 
  BookOpen, CalendarCheck, AlertTriangle, Search, FileCheck, Award,
  Briefcase, Home, Phone, Mail, MapPin, Calendar, UserCheck, Clock3,
  Globe, HandHeart, Scale, Star, Handshake, Gavel
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const JurisdiccionEspecialPaz = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [formulario, setFormulario] = useState({
    datosVictima: {
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      direccion: '',
      fechaNacimiento: '',
      genero: '',
      etnia: '',
      discapacidad: false,
      tipoDiscapacidad: '',
    },
    victimizacion: {
      tipoVictimizacion: '',
      fechaVictimizacion: '',
      lugarVictimizacion: '',
      contextoConflicto: '',
      descripcionHechos: '',
      consecuencias: '',
      familiaresAfectados: '',
    },
    contextoConflicto: {
      periodoConflicto: '',
      grupoArmado: '',
      zonaGeografica: '',
      desplazamiento: false,
      fechaDesplazamiento: '',
      lugarOrigen: '',
      lugarLlegada: '',
      perdidasMateriales: '',
    },
    solicitudJEP: {
      tipoSolicitud: '',
      derechosSolicitados: [],
      verdad: false,
      justicia: false,
      reparacion: false,
      garantiasNoRepeticion: false,
      medidasSatisfaccion: '',
      reparacionEconomica: '',
      reparacionSimbolica: '',
    },
    analisisIA: {
      procedencia: null,
      tipoVictima: '',
      derechosReconocidos: [],
      rutasReparacion: [],
      recomendaciones: '',
      jurisprudencia: '',
      planAccion: ''
    }
  });
  const [cargandoIA, setCargandoIA] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const generos = ['Masculino', 'Femenino', 'Transgénero', 'No binario', 'Prefiero no decir'];
  const etnias = ['Mestizo', 'Indígena', 'Afrocolombiano', 'Rom', 'Raizal', 'Palenquero', 'Otro'];
  const tiposDiscapacidad = ['Física', 'Sensorial', 'Intelectual', 'Psicosocial', 'Múltiple'];

  const tiposVictimizacion = [
    'Desplazamiento forzado',
    'Desaparición forzada',
    'Homicidio',
    'Masacre',
    'Violencia sexual',
    'Reclutamiento forzado',
    'Tortura',
    'Secuestro',
    'Amenazas',
    'Despojo de tierras',
    'Mina antipersonal',
    'Ataque a bienes civiles',
    'Violencia contra líderes sociales',
    'Violencia contra defensores de derechos humanos',
    'Otras formas de violencia'
  ];

  const periodosConflicto = [
    '1985-1990',
    '1991-1995',
    '1996-2000',
    '2001-2005',
    '2006-2010',
    '2011-2015',
    '2016-2020',
    '2021-actualidad'
  ];

  const gruposArmados = [
    'FARC-EP',
    'ELN',
    'Paramilitares (AUC)',
    'Bacrim',
    'Carteles de droga',
    'Ejército de Liberación Nacional (ELN)',
    'Ejército Popular de Liberación (EPL)',
    'Autodefensas Gaitanistas de Colombia (AGC)',
    'Grupo Armado Organizado no identificado',
    'Otro'
  ];

  const tiposSolicitud = [
    'Verdad',
    'Justicia',
    'Reparación',
    'Garantías de no repetición',
    'Verdad y Reparación',
    'Justicia y Reparación',
    'Verdad, Justicia y Reparación',
    'Todas las anteriores'
  ];

  const derechosReconocidos = [
    'Derecho a la verdad',
    'Derecho a la justicia',
    'Derecho a la reparación integral',
    'Derecho a las garantías de no repetición',
    'Derecho a la memoria histórica',
    'Derecho a la participación',
    'Derecho a la restitución de tierras',
    'Derecho a la reparación simbólica'
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
      // Simulación de análisis IA especializado en justicia transicional
      await new Promise(resolve => setTimeout(resolve, 3000));

      const analisis = {
        procedencia: 'Procedente - Víctima del conflicto armado reconocida',
        tipoVictima: `Víctima de ${formulario.victimizacion.tipoVictimizacion}`,
        derechosReconocidos: [
          'Derecho a la verdad',
          'Derecho a la justicia',
          'Derecho a la reparación integral',
          'Derecho a las garantías de no repetición'
        ],
        rutasReparacion: [
          'Participación en procesos de la JEP',
          'Acceso a medidas de reparación integral',
          'Participación en espacios de verdad',
          'Acceso a servicios de atención psicosocial',
          'Inclusión en programas de reparación colectiva'
        ],
        recomendaciones: [
          'Registrarse en el Registro Único de Víctimas (RUV)',
          'Solicitar medidas de atención y asistencia',
          'Participar en procesos de la JEP',
          'Acceder a servicios de salud mental',
          'Participar en espacios de memoria histórica',
          'Solicitar medidas de reparación integral'
        ],
        jurisprudencia: [
          'Corte Constitucional, Sentencia C-579 de 2013 - Marco jurídico para la paz',
          'Corte Constitucional, Auto 092 de 2008 - Protección de mujeres víctimas',
          'Corte Constitucional, Auto 004 de 2009 - Protección de pueblos indígenas',
          'Corte Constitucional, Auto 005 de 2009 - Protección de comunidades afrocolombianas',
          'JEP, Sala de Reconocimiento, Auto 001 de 2023 - Casos priorizados'
        ],
        planAccion: [
          'Paso 1: Registro en el RUV y solicitud de medidas',
          'Paso 2: Participación en procesos de verdad de la JEP',
          'Paso 3: Acceso a medidas de reparación integral',
          'Paso 4: Participación en espacios de memoria',
          'Paso 5: Seguimiento y acompañamiento psicosocial'
        ]
      };

      setFormulario(prev => ({
        ...prev,
        analisisIA: analisis
      }));
      setMostrarAnalisis(true);
      toast.success('Análisis de justicia transicional completado con IA especializada');
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
    doc.text('SOLICITUD ANTE LA JURISDICCIÓN ESPECIAL PARA LA PAZ', 20, 20);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${fecha}`, 20, 30);
    doc.text(`No. Radicado: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 35);
    
    // Datos de la Víctima
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DE LA VÍCTIMA', 20, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${formulario.datosVictima.nombre}`, 20, 60);
    doc.text(`Identificación: ${formulario.datosVictima.identificacion}`, 20, 65);
    doc.text(`Género: ${formulario.datosVictima.genero}`, 20, 70);
    doc.text(`Etnia: ${formulario.datosVictima.etnia}`, 20, 75);
    
    // Victimización
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DE VICTIMIZACIÓN', 20, 90);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo de Victimización: ${formulario.victimizacion.tipoVictimizacion}`, 20, 100);
    doc.text(`Fecha: ${formulario.victimizacion.fechaVictimizacion}`, 20, 105);
    doc.text(`Lugar: ${formulario.victimizacion.lugarVictimizacion}`, 20, 110);
    
    // Contexto del Conflicto
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CONTEXTO DEL CONFLICTO', 20, 125);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Período: ${formulario.contextoConflicto.periodoConflicto}`, 20, 135);
    doc.text(`Grupo Armado: ${formulario.contextoConflicto.grupoArmado}`, 20, 140);
    doc.text(`Zona Geográfica: ${formulario.contextoConflicto.zonaGeografica}`, 20, 145);
    
    // Solicitud JEP
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD ANTE LA JEP', 20, 160);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo de Solicitud: ${formulario.solicitudJEP.tipoSolicitud}`, 20, 170);
    
    // Análisis IA
    if (mostrarAnalisis) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISIS DE JUSTICIA TRANSICIONAL', 20, 185);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Procedencia: ${formulario.analisisIA.procedencia}`, 20, 195);
      doc.text(`Tipo de Víctima: ${formulario.analisisIA.tipoVictima}`, 20, 200);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por CSDT - Centro de Sistemas de Desarrollo Territorial', 20, 280);
    
    doc.save(`solicitud-jep-${formulario.datosVictima.identificacion}-${fecha}.pdf`);
    toast.success('Solicitud ante la JEP generada exitosamente');
  };

  const siguientePaso = () => {
    if (pasoActual < 6) {
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
        <h3 className="text-xl font-semibold mb-2">Datos de la Víctima</h3>
        <p className="text-gray-600">Información personal de la víctima del conflicto armado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <Input
              id="nombre"
              value={formulario.datosVictima.nombre}
              onChange={(e) => actualizarFormulario('datosVictima', 'nombre', e.target.value)}
              placeholder="Ingrese su nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="identificacion">Identificación *</Label>
            <Input
              id="identificacion"
              value={formulario.datosVictima.identificacion}
              onChange={(e) => actualizarFormulario('datosVictima', 'identificacion', e.target.value)}
              placeholder="Número de identificación"
            />
          </div>

          <div>
            <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
            <Input
              id="fechaNacimiento"
              type="date"
              value={formulario.datosVictima.fechaNacimiento}
              onChange={(e) => actualizarFormulario('datosVictima', 'fechaNacimiento', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="genero">Género</Label>
            <Select value={formulario.datosVictima.genero} onValueChange={(value) => actualizarFormulario('datosVictima', 'genero', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione género" />
              </SelectTrigger>
              <SelectContent>
                {generos.map((genero) => (
                  <SelectItem key={genero} value={genero}>{genero}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="etnia">Etnia</Label>
            <Select value={formulario.datosVictima.etnia} onValueChange={(value) => actualizarFormulario('datosVictima', 'etnia', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione etnia" />
              </SelectTrigger>
              <SelectContent>
                {etnias.map((etnia) => (
                  <SelectItem key={etnia} value={etnia}>{etnia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={formulario.datosVictima.telefono}
              onChange={(e) => actualizarFormulario('datosVictima', 'telefono', e.target.value)}
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formulario.datosVictima.email}
              onChange={(e) => actualizarFormulario('datosVictima', 'email', e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formulario.datosVictima.direccion}
              onChange={(e) => actualizarFormulario('datosVictima', 'direccion', e.target.value)}
              placeholder="Dirección de residencia actual"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="discapacidad"
            checked={formulario.datosVictima.discapacidad}
            onChange={(e) => actualizarFormulario('datosVictima', 'discapacidad', e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="discapacidad">Tiene alguna discapacidad</Label>
        </div>

        {formulario.datosVictima.discapacidad && (
          <div>
            <Label htmlFor="tipoDiscapacidad">Tipo de Discapacidad</Label>
            <Select value={formulario.datosVictima.tipoDiscapacidad} onValueChange={(value) => actualizarFormulario('datosVictima', 'tipoDiscapacidad', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de discapacidad" />
              </SelectTrigger>
              <SelectContent>
                {tiposDiscapacidad.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Información de Victimización</h3>
        <p className="text-gray-600">Detalles sobre los hechos de victimización</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="tipoVictimizacion">Tipo de Victimización *</Label>
            <Select value={formulario.victimizacion.tipoVictimizacion} onValueChange={(value) => actualizarFormulario('victimizacion', 'tipoVictimizacion', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el tipo de victimización" />
              </SelectTrigger>
              <SelectContent>
                {tiposVictimizacion.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fechaVictimizacion">Fecha de Victimización *</Label>
            <Input
              id="fechaVictimizacion"
              type="date"
              value={formulario.victimizacion.fechaVictimizacion}
              onChange={(e) => actualizarFormulario('victimizacion', 'fechaVictimizacion', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="lugarVictimizacion">Lugar de Victimización *</Label>
            <Textarea
              id="lugarVictimizacion"
              value={formulario.victimizacion.lugarVictimizacion}
              onChange={(e) => actualizarFormulario('victimizacion', 'lugarVictimizacion', e.target.value)}
              placeholder="Municipio, departamento y descripción del lugar"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="contextoConflicto">Contexto del Conflicto</Label>
            <Textarea
              id="contextoConflicto"
              value={formulario.victimizacion.contextoConflicto}
              onChange={(e) => actualizarFormulario('victimizacion', 'contextoConflicto', e.target.value)}
              placeholder="Describa el contexto en el que ocurrieron los hechos"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="consecuencias">Consecuencias de la Victimización</Label>
            <Textarea
              id="consecuencias"
              value={formulario.victimizacion.consecuencias}
              onChange={(e) => actualizarFormulario('victimizacion', 'consecuencias', e.target.value)}
              placeholder="Describa las consecuencias físicas, psicológicas, sociales y económicas"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="familiaresAfectados">Familiares Afectados</Label>
            <Textarea
              id="familiaresAfectados"
              value={formulario.victimizacion.familiaresAfectados}
              onChange={(e) => actualizarFormulario('victimizacion', 'familiaresAfectados', e.target.value)}
              placeholder="Nombres y relación de familiares también afectados"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="descripcionHechos">Descripción Detallada de los Hechos *</Label>
        <Textarea
          id="descripcionHechos"
          value={formulario.victimizacion.descripcionHechos}
          onChange={(e) => actualizarFormulario('victimizacion', 'descripcionHechos', e.target.value)}
          placeholder="Describa detalladamente los hechos ocurridos, incluyendo quiénes participaron, cómo ocurrió, y qué pasó después"
          rows={6}
        />
      </div>
    </div>
  );

  const renderPaso3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Contexto del Conflicto Armado</h3>
        <p className="text-gray-600">Información sobre el contexto del conflicto armado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="periodoConflicto">Período del Conflicto</Label>
            <Select value={formulario.contextoConflicto.periodoConflicto} onValueChange={(value) => actualizarFormulario('contextoConflicto', 'periodoConflicto', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el período" />
              </SelectTrigger>
              <SelectContent>
                {periodosConflicto.map((periodo) => (
                  <SelectItem key={periodo} value={periodo}>{periodo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="grupoArmado">Grupo Armado</Label>
            <Select value={formulario.contextoConflicto.grupoArmado} onValueChange={(value) => actualizarFormulario('contextoConflicto', 'grupoArmado', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el grupo armado" />
              </SelectTrigger>
              <SelectContent>
                {gruposArmados.map((grupo) => (
                  <SelectItem key={grupo} value={grupo}>{grupo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="zonaGeografica">Zona Geográfica</Label>
            <Textarea
              id="zonaGeografica"
              value={formulario.contextoConflicto.zonaGeografica}
              onChange={(e) => actualizarFormulario('contextoConflicto', 'zonaGeografica', e.target.value)}
              placeholder="Región, departamento, municipio donde ocurrieron los hechos"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="desplazamiento"
              checked={formulario.contextoConflicto.desplazamiento}
              onChange={(e) => actualizarFormulario('contextoConflicto', 'desplazamiento', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="desplazamiento">Sufrió desplazamiento forzado</Label>
          </div>

          {formulario.contextoConflicto.desplazamiento && (
            <>
              <div>
                <Label htmlFor="fechaDesplazamiento">Fecha del Desplazamiento</Label>
                <Input
                  id="fechaDesplazamiento"
                  type="date"
                  value={formulario.contextoConflicto.fechaDesplazamiento}
                  onChange={(e) => actualizarFormulario('contextoConflicto', 'fechaDesplazamiento', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="lugarOrigen">Lugar de Origen</Label>
                <Input
                  id="lugarOrigen"
                  value={formulario.contextoConflicto.lugarOrigen}
                  onChange={(e) => actualizarFormulario('contextoConflicto', 'lugarOrigen', e.target.value)}
                  placeholder="Municipio y departamento de origen"
                />
              </div>

              <div>
                <Label htmlFor="lugarLlegada">Lugar de Llegada</Label>
                <Input
                  id="lugarLlegada"
                  value={formulario.contextoConflicto.lugarLlegada}
                  onChange={(e) => actualizarFormulario('contextoConflicto', 'lugarLlegada', e.target.value)}
                  placeholder="Municipio y departamento donde se estableció"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="perdidasMateriales">Pérdidas Materiales</Label>
            <Textarea
              id="perdidasMateriales"
              value={formulario.contextoConflicto.perdidasMateriales}
              onChange={(e) => actualizarFormulario('contextoConflicto', 'perdidasMateriales', e.target.value)}
              placeholder="Describa las pérdidas materiales: vivienda, tierras, bienes, etc."
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
        <Handshake className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Solicitud ante la JEP</h3>
        <p className="text-gray-600">Derechos que solicita ante la Jurisdicción Especial para la Paz</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="tipoSolicitud">Tipo de Solicitud *</Label>
          <Select value={formulario.solicitudJEP.tipoSolicitud} onValueChange={(value) => actualizarFormulario('solicitudJEP', 'tipoSolicitud', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione el tipo de solicitud" />
            </SelectTrigger>
            <SelectContent>
              {tiposSolicitud.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Derechos que Solicita</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {derechosReconocidos.map((derecho) => (
              <div key={derecho} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={derecho}
                  checked={formulario.solicitudJEP.derechosSolicitados.includes(derecho)}
                  onChange={(e) => {
                    const derechos = formulario.solicitudJEP.derechosSolicitados;
                    if (e.target.checked) {
                      derechos.push(derecho);
                    } else {
                      const index = derechos.indexOf(derecho);
                      derechos.splice(index, 1);
                    }
                    actualizarFormulario('solicitudJEP', 'derechosSolicitados', [...derechos]);
                  }}
                  className="rounded"
                />
                <Label htmlFor={derecho} className="text-sm">{derecho}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="medidasSatisfaccion">Medidas de Satisfacción</Label>
            <Textarea
              id="medidasSatisfaccion"
              value={formulario.solicitudJEP.medidasSatisfaccion}
              onChange={(e) => actualizarFormulario('solicitudJEP', 'medidasSatisfaccion', e.target.value)}
              placeholder="Qué medidas de satisfacción solicita (disculpas públicas, memoriales, etc.)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="reparacionEconomica">Reparación Económica</Label>
              <Input
                id="reparacionEconomica"
                type="number"
                value={formulario.solicitudJEP.reparacionEconomica}
                onChange={(e) => actualizarFormulario('solicitudJEP', 'reparacionEconomica', e.target.value)}
                placeholder="Monto en pesos colombianos (si aplica)"
              />
            </div>

            <div>
              <Label htmlFor="reparacionSimbolica">Reparación Simbólica</Label>
              <Textarea
                id="reparacionSimbolica"
                value={formulario.solicitudJEP.reparacionSimbolica}
                onChange={(e) => actualizarFormulario('solicitudJEP', 'reparacionSimbolica', e.target.value)}
                placeholder="Qué reparación simbólica solicita"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <Alert>
        <Handshake className="h-4 w-4" />
        <AlertTitle>Derechos de las Víctimas</AlertTitle>
        <AlertDescription>
          La JEP garantiza los derechos de verdad, justicia, reparación y garantías de no repetición 
          para todas las víctimas del conflicto armado en Colombia.
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderPaso5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Análisis de Justicia Transicional</h3>
        <p className="text-gray-600">Análisis especializado con IA para víctimas del conflicto</p>
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
                Analizar Caso con IA de Justicia Transicional
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
                <Badge variant="default" className="mb-2">
                  {formulario.analisisIA.procedencia}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tipo de Víctima:</h4>
                <p className="text-sm text-gray-600">{formulario.analisisIA.tipoVictima}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Derechos Reconocidos:</h4>
                <div className="flex flex-wrap gap-2">
                  {formulario.analisisIA.derechosReconocidos.map((derecho, index) => (
                    <Badge key={index} variant="outline">{derecho}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Rutas de Reparación:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formulario.analisisIA.rutasReparacion.map((ruta, index) => (
                    <li key={index}>• {ruta}</li>
                  ))}
                </ul>
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
                Jurisprudencia de Justicia Transicional
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
              Generar Solicitud JEP PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-600 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Jurisdicción Especial para la Paz</h1>
              <p className="text-gray-600">Sistema de justicia transicional para víctimas del conflicto</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3, 4, 5].map((paso) => (
              <div
                key={paso}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  paso <= pasoActual
                    ? 'bg-red-600 text-white'
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
                <Heart className="mr-2 h-4 w-4 text-red-600" />
                Derechos de las Víctimas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Verdad, justicia, reparación y garantías de no repetición para todas las víctimas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Handshake className="mr-2 h-4 w-4 text-green-600" />
                Justicia Transicional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                La JEP garantiza justicia transicional y reparación integral a las víctimas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Star className="mr-2 h-4 w-4 text-purple-600" />
                IA Especializada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Nuestra IA especializada en justicia transicional analiza su caso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JurisdiccionEspecialPaz;
