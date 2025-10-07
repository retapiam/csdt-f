import React from 'react';
import useForm from '@hooks/useForm';

const FormularioBase = ({ 
  titulo, 
  descripcion, 
  campos, 
  onSubmit, 
  botones,
  mostrarAnonimato = true,
  mostrarIA = true,
  onAnalizarIA,
  analizando = false
}) => {
  const { values, handleChange, validateForm, reset } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  const handleAnonimatoChange = (e) => {
    const isAnonimo = e.target.checked;
    handleChange(e);
    
    // Si se activa anonimato, limpiar datos personales
    if (isAnonimo) {
      reset();
    }
  };

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '15px', 
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        fontWeight: 'bold', 
        color: '#1e40af',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        {titulo}
      </h2>
      
      {descripcion && (
        <p style={{ 
          fontSize: '1rem', 
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          {descripcion}
        </p>
      )}

      {/* Opción de Anonimato */}
      {mostrarAnonimato && (
        <div style={{ 
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
          border: '2px solid #f59e0b', 
          borderRadius: '15px', 
          padding: '25px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
            <input
              type="checkbox"
              name="anonimato"
              checked={values.anonimato || false}
              onChange={handleAnonimatoChange}
              style={{ width: '20px', height: '20px' }}
            />
            <label style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#92400e' }}>
              🔒 Presentar de forma ANÓNIMA
            </label>
          </div>
          <p style={{ 
            color: values.anonimato ? '#16a34a' : '#3b82f6', 
            fontSize: '0.9rem',
            textAlign: 'center',
            marginTop: '10px'
          }}>
            {values.anonimato ? 
              '✅ Su identidad será protegida' : 
              'ℹ️ Sus datos personales serán incluidos'
            }
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {campos.map((campo, index) => (
            <div key={index}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                {campo.label} {campo.required && '*'}
              </label>
              
              {campo.tipo === 'select' ? (
                <select
                  name={campo.name}
                  value={values[campo.name] || ''}
                  onChange={handleChange}
                  required={campo.required}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: values.anonimato ? '#fef3c7' : 'white'
                  }}
                >
                  <option value="">{campo.placeholder}</option>
                  {campo.opciones?.map(opcion => (
                    <option key={opcion.id || opcion} value={opcion.id || opcion}>
                      {opcion.nombre || opcion}
                    </option>
                  ))}
                </select>
              ) : campo.tipo === 'textarea' ? (
                <textarea
                  name={campo.name}
                  value={values[campo.name] || ''}
                  onChange={handleChange}
                  required={campo.required}
                  rows={campo.rows || 4}
                  placeholder={campo.placeholder}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              ) : (
                <input
                  type={campo.tipo || 'text'}
                  name={campo.name}
                  value={values[campo.name] || ''}
                  onChange={handleChange}
                  required={campo.required}
                  placeholder={campo.placeholder}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: values.anonimato ? '#fef3c7' : 'white'
                  }}
                />
              )}
              
              {campo.ayuda && (
                <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                  {campo.ayuda}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Análisis IA */}
        {mostrarIA && onAnalizarIA && (
          <div style={{ 
            background: '#f8fafc', 
            border: '2px solid #3b82f6', 
            borderRadius: '15px', 
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h3 style={{ fontSize: '1.5rem', color: '#1e40af', marginBottom: '20px', textAlign: 'center' }}>
              🤖 Análisis con IA
            </h3>
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => onAnalizarIA(values)}
                disabled={analizando}
                style={{
                  background: analizando ? '#9ca3af' : '#8b5cf6',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: analizando ? 'not-allowed' : 'pointer'
                }}
              >
                {analizando ? '⏳ Analizando...' : '🎯 Analizar con IA'}
              </button>
            </div>
          </div>
        )}

        {/* Botones */}
        <div style={{ textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {botones.map((boton, index) => (
            <button
              key={index}
              type={boton.tipo || 'button'}
              onClick={boton.onClick ? () => boton.onClick(values) : undefined}
              disabled={boton.disabled}
              style={{
                background: boton.color || '#3b82f6',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                ...boton.estilo
              }}
            >
              {boton.texto}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default FormularioBase;
