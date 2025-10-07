import React, { useState, useEffect } from 'react';
import { useDonaciones } from '@hooks/useDonaciones';
import EstadisticasDonaciones from './EstadisticasDonaciones';
import HistorialDonaciones from './HistorialDonaciones';

const DashboardDonaciones = ({ usuarioId = null, mostrarHistorialPersonal = false }) => {
  const [activaTab, setActivaTab] = useState('estadisticas');
  const [periodoEstadisticas, setPeriodoEstadisticas] = useState('mes');
  
  const {
    estadisticas,
    cargandoEstadisticas,
    cargarEstadisticas
  } = useDonaciones();

  // Cargar estadísticas al montar el componente
  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(monto || 0);
  };

  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '10px'
              }}>
                💰 Dashboard de Donaciones
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '16px'
              }}>
                {mostrarHistorialPersonal ? 'Tu historial personal de donaciones' : 'Vista general del sistema de donaciones'}
              </p>
            </div>

            {/* Selector de período para estadísticas */}
            {activaTab === 'estadisticas' && (
              <div style={{
                display: 'flex',
                gap: '10px',
                background: '#f8fafc',
                padding: '5px',
                borderRadius: '8px'
              }}>
                {['semana', 'mes', 'trimestre', 'año'].map(per => (
                  <button
                    key={per}
                    onClick={() => setPeriodoEstadisticas(per)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      background: periodoEstadisticas === per ? '#3b82f6' : 'transparent',
                      color: periodoEstadisticas === per ? 'white' : '#6b7280',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {per === 'semana' && '📅 Semana'}
                    {per === 'mes' && '📊 Mes'}
                    {per === 'trimestre' && '📈 Trimestre'}
                    {per === 'año' && '🗓️ Año'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Métricas rápidas */}
          {estadisticas && !cargandoEstadisticas && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {formatearMoneda(estadisticas.total_monto)}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Recaudado</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {estadisticas.total_donaciones || 0}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Donaciones</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {estadisticas.donaciones_confirmadas || 0}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Confirmadas</div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  {estadisticas.donaciones_pendientes || 0}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>Pendientes</div>
              </div>
            </div>
          )}

          {cargandoEstadisticas && (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
              <p>Cargando estadísticas...</p>
            </div>
          )}
        </div>

        {/* Navegación por pestañas */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
          background: 'white',
          borderRadius: '15px',
          padding: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {[
            { id: 'estadisticas', label: '📊 Estadísticas', icon: '📊' },
            ...(mostrarHistorialPersonal ? [{ id: 'historial', label: '📋 Mi Historial', icon: '📋' }] : []),
            { id: 'informacion', label: 'ℹ️ Información', icon: 'ℹ️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivaTab(tab.id)}
              style={{
                padding: '15px 25px',
                margin: '0 5px',
                borderRadius: '10px',
                border: 'none',
                background: activaTab === tab.id ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' : 'transparent',
                color: activaTab === tab.id ? 'white' : '#6b7280',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de las pestañas */}
        {activaTab === 'estadisticas' && (
          <EstadisticasDonaciones periodo={periodoEstadisticas} />
        )}

        {activaTab === 'historial' && mostrarHistorialPersonal && (
          <HistorialDonaciones usuarioId={usuarioId} mostrarSoloUsuario={true} />
        )}

        {activaTab === 'informacion' && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              ℹ️ Información sobre las Donaciones
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {/* Cómo funciona */}
              <div style={{
                background: '#f8fafc',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  🔄 Cómo Funciona
                </h3>
                <ul style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  paddingLeft: '20px'
                }}>
                  <li>Realiza tu donación con el formulario</li>
                  <li>Recibe un número de referencia</li>
                  <li>Completa el pago según el método elegido</li>
                  <li>Tu donación será validada por nuestro equipo</li>
                  <li>Recibe tu certificado de donación</li>
                </ul>
              </div>

              {/* Estados de donación */}
              <div style={{
                background: '#f8fafc',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  📈 Estados de Donación
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: '#f59e0b',
                      color: 'white'
                    }}>
                      PENDIENTE
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Esperando confirmación</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}>
                      EN PROCESO
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Siendo procesada</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: '#10b981',
                      color: 'white'
                    }}>
                      CONFIRMADO
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Certificado disponible</span>
                  </div>
                </div>
              </div>

              {/* Métodos de pago */}
              <div style={{
                background: '#f8fafc',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  💳 Métodos de Pago
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>📱</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Billeteras digitales (Nequi, Daviplata)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🏦</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Transferencia bancaria</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>💳</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Tarjeta de crédito</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>💰</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Efectivo</span>
                  </div>
                </div>
              </div>

              {/* Transparencia */}
              <div style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
                color: 'white',
                padding: '25px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  🔍 Transparencia
                </h3>
                <p style={{
                  fontSize: '14px',
                  opacity: 0.9,
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Publicamos reportes trimestrales sobre el uso de las donaciones, 
                  incluyendo gastos operativos y proyectos específicos.
                </p>
                <button style={{
                  background: 'white',
                  color: '#1e40af',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  📊 Ver Reportes
                </button>
              </div>

              {/* Contacto */}
              <div style={{
                background: '#f8fafc',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  📞 Contacto
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    <strong>Email:</strong> donaciones@csdt.org
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    <strong>Teléfono:</strong> +57 300 123 4567
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    <strong>Horario:</strong> Lun - Vie, 8:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDonaciones;
