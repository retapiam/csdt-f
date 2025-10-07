import React, { useState, useEffect } from 'react';
import { useDonaciones } from '@hooks/useDonaciones';
import api from '@services/api';

const HistorialDonaciones = ({ usuarioId = null, mostrarSoloUsuario = false }) => {
  const [filtros, setFiltros] = useState({
    usu_id: usuarioId,
    ...(mostrarSoloUsuario && { mostrar_solo_usuario: true })
  });

  const {
    donaciones,
    cargando,
    paginaActual,
    totalPaginas,
    cambiarPagina,
    cargarDonaciones,
    aplicarFiltros,
    limpiarFiltros
  } = useDonaciones(filtros);

  const [donacionSeleccionada, setDonacionSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cargar donaciones al montar el componente
  useEffect(() => {
    cargarDonaciones();
  }, [usuarioId]);

  const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(monto);
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'pen': return '#f59e0b';
      case 'pro': return '#3b82f6';
      case 'con': return '#10b981';
      case 'rec': return '#ef4444';
      case 'can': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const obtenerTextoEstado = (estado) => {
    switch (estado) {
      case 'pen': return 'PENDIENTE';
      case 'pro': return 'EN PROCESO';
      case 'con': return 'CONFIRMADO';
      case 'rec': return 'RECHAZADO';
      case 'can': return 'CANCELADO';
      default: return estado.toUpperCase();
    }
  };

  const obtenerColorTipo = (tipo) => {
    switch (tipo) {
      case 'efec': return '#10b981';
      case 'tran': return '#3b82f6';
      case 'cheq': return '#8b5cf6';
      case 'otr': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const obtenerTextoTipo = (tipo) => {
    switch (tipo) {
      case 'efec': return 'EFECTIVO';
      case 'tran': return 'TRANSFERENCIA';
      case 'cheq': return 'CHEQUE';
      case 'otr': return 'OTRO';
      default: return tipo.toUpperCase();
    }
  };

  const verDetalleDonacion = async (donacionId) => {
    try {
      const response = await api.get(`/donaciones/${donacionId}`);
      
      if (response.data.success) {
        setDonacionSeleccionada(response.data.data);
        setMostrarModal(true);
      }
    } catch (error) {
      console.error('Error cargando detalles:', error);
    }
  };

  const descargarCertificado = async (donacionId) => {
    try {
      const response = await api.get(`/pdf/${donacionId}/descargar`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificado-donacion-${donacionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error descargando certificado:', error);
    }
  };

  const manejarFiltro = (campo, valor) => {
    const nuevosFiltros = { ...filtros, [campo]: valor };
    setFiltros(nuevosFiltros);
    aplicarFiltros(nuevosFiltros);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '5px'
          }}>
            📋 Historial de Donaciones
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '14px'
          }}>
            {donaciones.length} donaciones encontradas
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <select
            value={filtros.est || ''}
            onChange={(e) => manejarFiltro('est', e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="">Todos los estados</option>
            <option value="pen">Pendiente</option>
            <option value="pro">En Proceso</option>
            <option value="con">Confirmado</option>
            <option value="rec">Rechazado</option>
            <option value="can">Cancelado</option>
          </select>

          <select
            value={filtros.tip || ''}
            onChange={(e) => manejarFiltro('tip', e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              background: 'white'
            }}
          >
            <option value="">Todos los tipos</option>
            <option value="efec">Efectivo</option>
            <option value="tran">Transferencia</option>
            <option value="cheq">Cheque</option>
            <option value="otr">Otro</option>
          </select>

          <button
            onClick={limpiarFiltros}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      {/* Lista de donaciones */}
      {cargando ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <p>Cargando historial...</p>
        </div>
      ) : donaciones.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
          <p>No se encontraron donaciones</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {donaciones.map((donacion) => (
              <div
                key={donacion.id}
                style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => verDetalleDonacion(donacion.id)}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '5px'
                    }}>
                      Donación #{donacion.id}
                    </h3>
                    {donacion.ref && (
                      <p style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        marginBottom: '5px'
                      }}>
                        Referencia: {donacion.ref}
                      </p>
                    )}
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      {new Date(donacion.fec_don).toLocaleDateString('es-CO')}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '8px'
                  }}>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#10b981'
                    }}>
                      {formatearMoneda(donacion.mon)}
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: obtenerColorTipo(donacion.tip),
                        color: 'white'
                      }}>
                        {obtenerTextoTipo(donacion.tip)}
                      </span>

                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: obtenerColorEstado(donacion.est),
                        color: 'white'
                      }}>
                        {obtenerTextoEstado(donacion.est)}
                      </span>
                    </div>
                  </div>
                </div>

                {donacion.des && (
                  <div style={{
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    borderLeft: '3px solid #3b82f6',
                    marginBottom: '10px'
                  }}>
                    <p style={{
                      color: '#374151',
                      fontSize: '14px',
                      margin: 0,
                      fontStyle: 'italic'
                    }}>
                      "{donacion.des}"
                    </p>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    Haz clic para ver detalles
                  </div>

                  {donacion.est === 'con' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        descargarCertificado(donacion.id);
                      }}
                      style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      📄 Descargar Certificado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              padding: '20px 0',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                style={{
                  background: paginaActual === 1 ? '#f3f4f6' : '#3b82f6',
                  color: paginaActual === 1 ? '#9ca3af' : 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: paginaActual === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Anterior
              </button>
              
              <span style={{
                padding: '8px 12px',
                fontWeight: 'bold',
                color: '#374151'
              }}>
                Página {paginaActual} de {totalPaginas}
              </span>
              
              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                style={{
                  background: paginaActual === totalPaginas ? '#f3f4f6' : '#3b82f6',
                  color: paginaActual === totalPaginas ? '#9ca3af' : 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer'
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal de detalles */}
      {mostrarModal && donacionSeleccionada && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Detalles de la Donación
              </h2>
              <button
                onClick={() => setMostrarModal(false)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                ✕ Cerrar
              </button>
            </div>

            <div style={{
              display: 'grid',
              gap: '20px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <div>
                  <strong style={{ color: '#374151' }}>ID:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>#{donacionSeleccionada.id}</p>
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Monto:</strong>
                  <p style={{ color: '#10b981', margin: '5px 0', fontWeight: 'bold' }}>
                    {formatearMoneda(donacionSeleccionada.mon)}
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Tipo:</strong>
                  <p style={{ margin: '5px 0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: obtenerColorTipo(donacionSeleccionada.tip),
                      color: 'white'
                    }}>
                      {obtenerTextoTipo(donacionSeleccionada.tip)}
                    </span>
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Estado:</strong>
                  <p style={{ margin: '5px 0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: obtenerColorEstado(donacionSeleccionada.est),
                      color: 'white'
                    }}>
                      {obtenerTextoEstado(donacionSeleccionada.est)}
                    </span>
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Fecha Donación:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    {new Date(donacionSeleccionada.fec_don).toLocaleDateString('es-CO')}
                  </p>
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Fecha Confirmación:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    {donacionSeleccionada.fec_con 
                      ? new Date(donacionSeleccionada.fec_con).toLocaleDateString('es-CO')
                      : 'No confirmada'
                    }
                  </p>
                </div>
              </div>

              {donacionSeleccionada.ref && (
                <div>
                  <strong style={{ color: '#374151' }}>Referencia:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>{donacionSeleccionada.ref}</p>
                </div>
              )}

              {donacionSeleccionada.des && (
                <div>
                  <strong style={{ color: '#374151' }}>Descripción:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>{donacionSeleccionada.des}</p>
                </div>
              )}

              {donacionSeleccionada.not && (
                <div>
                  <strong style={{ color: '#374151' }}>Notas:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>{donacionSeleccionada.not}</p>
                </div>
              )}

              {/* Información del usuario si existe */}
              {donacionSeleccionada.usuario && (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  <strong style={{ color: '#374151' }}>Información del Donante:</strong>
                  <p style={{ color: '#6b7280', margin: '5px 0' }}>
                    {donacionSeleccionada.usuario.nom} {donacionSeleccionada.usuario.ape}
                  </p>
                  {donacionSeleccionada.usuario.email && (
                    <p style={{ color: '#6b7280', margin: '5px 0' }}>
                      Email: {donacionSeleccionada.usuario.email}
                    </p>
                  )}
                </div>
              )}

              {/* Botón de descarga de certificado */}
              {donacionSeleccionada.est === 'con' && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    onClick={() => descargarCertificado(donacionSeleccionada.id)}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 25px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    📄 Descargar Certificado PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialDonaciones;
