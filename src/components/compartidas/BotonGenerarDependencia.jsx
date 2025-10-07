import React from 'react';
import { Button } from '../ui/button';
import { Target, Clock, CheckCircle } from 'lucide-react';
import { useDependencia } from '../../hooks/useDependencia';

/**
 * Componente reutilizable para generar dependencias
 * Crea automáticamente una actividad y guarda PDFs
 * 
 * @param {Object} props
 * @param {string} props.modulo - Nombre del módulo de origen
 * @param {Function} props.obtenerDatos - Función que retorna los datos de la dependencia
 * @param {Function} props.generarPDF - Función para generar el PDF (opcional)
 * @param {Function} props.onSuccess - Callback cuando se crea exitosamente
 * @param {Function} props.onError - Callback en caso de error
 * @param {boolean} props.disabled - Deshabilitado
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.style - Estilos personalizados
 * @param {string} props.textoBoton - Texto del botón (default: "Generar Dependencia")
 */
const BotonGenerarDependencia = ({
  modulo,
  obtenerDatos,
  generarPDF = null,
  onSuccess = null,
  onError = null,
  disabled = false,
  className = '',
  style = {},
  textoBoton = 'Generar Dependencia',
  mostrarActividad = true
}) => {
  const { generarDependencia, generando, actividadCreada } = useDependencia();

  const handleClick = async () => {
    try {
      // Validar que existan los datos
      if (!obtenerDatos || typeof obtenerDatos !== 'function') {
        alert('Error: No se configuró correctamente la función de obtención de datos');
        return;
      }

      // Obtener datos del componente padre
      const datos = await obtenerDatos();

      if (!datos) {
        alert('Por favor, completa todos los datos necesarios antes de generar la dependencia.');
        return;
      }

      // Generar PDF si se proporciona la función
      let rutaPDF = null;
      let pdfsAdicionales = [];

      if (generarPDF && typeof generarPDF === 'function') {
        const resultadoPDF = await generarPDF();
        if (resultadoPDF) {
          if (typeof resultadoPDF === 'string') {
            rutaPDF = resultadoPDF;
          } else if (resultadoPDF.ruta) {
            rutaPDF = resultadoPDF.ruta;
            if (resultadoPDF.adicionales) {
              pdfsAdicionales = resultadoPDF.adicionales;
            }
          }
        }
      }

      // Preparar datos de la dependencia
      const datosDependencia = {
        modulo: modulo || 'Sistema',
        titulo: datos.titulo || `${modulo} - ${Date.now()}`,
        descripcion: datos.descripcion || '',
        tipo: datos.tipo || 'general',
        datosCliente: datos.cliente || {},
        datosUbicacion: datos.ubicacion || {},
        resultado: datos.resultado || null,
        codigoCaso: datos.codigoCaso || `${modulo.substring(0, 3).toUpperCase()}-${Date.now()}`,
        pdfsAdicionales: rutaPDF ? [
          {
            ruta: rutaPDF,
            tipo: 'principal',
            nombre: `${modulo} - ${datos.codigoCaso || Date.now()}.pdf`
          },
          ...pdfsAdicionales
        ] : pdfsAdicionales
      };

      // Generar dependencia
      const resultado = await generarDependencia(datosDependencia);

      // Callback de éxito
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(resultado);
      }

      return resultado;

    } catch (error) {
      console.error('Error al generar dependencia:', error);
      
      // Callback de error
      if (onError && typeof onError === 'function') {
        onError(error);
      }
    }
  };

  const defaultStyle = {
    background: generando ? '#9ca3af' : 'linear-gradient(45deg, #22c55e, #16a34a)',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '0.5rem',
    color: 'white',
    cursor: generando ? 'not-allowed' : 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  return (
    <div className={className}>
      <Button
        onClick={handleClick}
        disabled={disabled || generando}
        style={defaultStyle}
      >
        {generando ? (
          <>
            <Clock style={{ marginRight: '0.5rem' }} className="animate-spin" />
            Generando Dependencia...
          </>
        ) : (
          <>
            <Target style={{ marginRight: '0.5rem' }} />
            {textoBoton}
          </>
        )}
      </Button>

      {/* Mostrar actividad creada */}
      {mostrarActividad && actividadCreada && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#f0fdf4',
          borderRadius: '0.5rem',
          border: '1px solid #86efac'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <CheckCircle size={20} style={{ color: '#15803d', marginRight: '0.5rem' }} />
            <p style={{ 
              color: '#15803d',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              margin: 0
            }}>
              Dependencia Creada Exitosamente
            </p>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#166534' }}>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Código:</strong> {actividadCreada.codigo_caso || 'N/A'}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>ID Actividad:</strong> {actividadCreada.id}
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              <strong>Estado:</strong> {actividadCreada.estado || 'Pendiente'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonGenerarDependencia;

