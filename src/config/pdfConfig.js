// Configuración para generación de PDFs
export const pdfConfig = {
  // Configuración de estilos
  styles: {
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
      padding: 20
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#1a365d'
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 8,
      fontWeight: 'bold',
      color: '#2d3748'
    },
    text: {
      fontSize: 10,
      lineHeight: 1.5,
      color: '#4a5568'
    },
    date: {
      fontSize: 8,
      marginBottom: 10,
      color: '#718096'
    },
    header: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#2d3748'
    }
  },
  
  // Configuración de metadatos
  metadata: {
    title: 'Sistema de Justicia - Documento',
    author: 'Sistema de Justicia IA',
    subject: 'Documento generado automáticamente',
    creator: 'CSDT-F',
    producer: 'Sistema de Justicia con IA'
  },
  
  // Configuración de narración de hechos
  narracionHechos: {
    template: `En el presente documento se narran los siguientes hechos:

1. FECHA Y HORA: {{fecha}}
2. DESCRIPCIÓN: {{descripcion}}
3. PARTICIPANTES: {{participantes}}
4. OBSERVACIONES: {{observaciones}}
5. EVIDENCIAS: {{evidencias}}
6. CONCLUSIONES: {{conclusiones}}

Esta narración ha sido generada automáticamente por el sistema de IA
del Sistema de Justicia y constituye un documento oficial.`,
    
    campos: [
      'fecha',
      'descripcion', 
      'participantes',
      'observaciones',
      'evidencias',
      'conclusiones'
    ]
  }
};

// Funciones auxiliares para PDF
export const pdfUtils = {
  // Generar narración de hechos
  generarNarracionHechos: (datos) => {
    let narracion = pdfConfig.narracionHechos.template;
    
    pdfConfig.narracionHechos.campos.forEach(campo => {
      const valor = datos[campo] || 'No especificado';
      narracion = narracion.replace(new RegExp(`{{${campo}}}`, 'g'), valor);
    });
    
    return narracion;
  },
  
  // Formatear fecha
  formatearFecha: (fecha = new Date()) => {
    return fecha.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Generar nombre de archivo
  generarNombreArchivo: (tipo, identificador) => {
    const fecha = new Date().toISOString().split('T')[0];
    return `${tipo}_${identificador}_${fecha}.pdf`;
  }
};
