import { useState } from 'react';

/**
 * Hook para generar PDFs fácilmente
 */
export const usePDF = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generar PDF de análisis jurídico
   */
  const generarPDFAnalisisJuridico = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      // Importar dinámicamente el servicio
      const { pdfAvanzadoService } = await import('../services/pdf/PDFAvanzadoService');
      
      const pdf = await pdfAvanzadoService.generarPDFCompleto('analisis_juridico', datos);
      
      // Descargar el PDF
      if (pdf && pdf.output) {
        pdf.save(`analisis-juridico-${Date.now()}.pdf`);
      }
      
      return pdf;
    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar PDF de consejo IA
   */
  const generarPDFConsejoIA = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const { pdfAvanzadoService } = await import('../services/pdf/PDFAvanzadoService');
      
      const pdf = await pdfAvanzadoService.generarPDFCompleto('consejo_ia', datos);
      
      if (pdf && pdf.output) {
        pdf.save(`consejo-ia-${Date.now()}.pdf`);
      }
      
      return pdf;
    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar PDF de acción de tutela
   */
  const generarPDFAccionTutela = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const { pdfAvanzadoService } = await import('../services/pdf/PDFAvanzadoService');
      
      const pdf = await pdfAvanzadoService.generarPDFCompleto('accion_tutela', datos);
      
      if (pdf && pdf.output) {
        pdf.save(`accion-tutela-${Date.now()}.pdf`);
      }
      
      return pdf;
    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar PDF de informe de veeduría
   */
  const generarPDFInformeVeeduria = async (datos) => {
    setLoading(true);
    setError(null);
    try {
      const { pdfAvanzadoService } = await import('../services/pdf/PDFAvanzadoService');
      
      const pdf = await pdfAvanzadoService.generarPDFCompleto('informe_veeduria', datos);
      
      if (pdf && pdf.output) {
        pdf.save(`informe-veeduria-${Date.now()}.pdf`);
      }
      
      return pdf;
    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar PDF genérico
   */
  const generarPDFGenerico = async (plantilla, datos, nombreArchivo = 'documento.pdf') => {
    setLoading(true);
    setError(null);
    try {
      const { pdfAvanzadoService } = await import('../services/pdf/PDFAvanzadoService');
      
      const pdf = await pdfAvanzadoService.generarPDFCompleto(plantilla, datos);
      
      if (pdf && pdf.output) {
        pdf.save(nombreArchivo);
      }
      
      return pdf;
    } catch (err) {
      console.error('Error generando PDF:', err);
      setError(err.message || 'Error al generar PDF');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generarPDFAnalisisJuridico,
    generarPDFConsejoIA,
    generarPDFAccionTutela,
    generarPDFInformeVeeduria,
    generarPDFGenerico
  };
};

export default usePDF;
