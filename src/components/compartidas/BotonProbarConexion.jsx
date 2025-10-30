import React, { useState } from 'react';

const BotonProbarConexion = () => {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const ejecutarPruebas = async () => {
    if (loading) return;
    setLoading(true);
    setResultado(null);
    try {
      if (typeof window?.testDatabaseConnection !== 'function') {
        throw new Error('Función testDatabaseConnection no disponible');
      }
      const res = await window.testDatabaseConnection();
      setResultado({ ok: true, data: res });
      console.log('Reporte pruebas:', res);
    } catch (e) {
      setResultado({ ok: false, error: e?.message || 'Error ejecutando pruebas' });
      console.error('Error pruebas conexión:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={ejecutarPruebas}
        disabled={loading}
        style={{
          padding: '6px 10px',
          borderRadius: 6,
          background: loading ? '#94a3b8' : '#0ea5e9',
          color: '#fff',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
        title="Ejecutar pruebas de conexión"
      >
        {loading ? 'Probando...' : 'Probar conexión'}
      </button>
      {resultado && (
        <span style={{ fontSize: 12, color: resultado.ok ? '#16a34a' : '#dc2626' }}>
          {resultado.ok ? 'OK' : 'ERROR'}
        </span>
      )}
    </div>
  );
};

export default BotonProbarConexion;


