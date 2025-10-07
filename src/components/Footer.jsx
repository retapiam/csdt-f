import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '20px 0 15px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ marginBottom: '10px', color: '#3b82f6', fontSize: '16px' }}>CSDT</h3>
            <p style={{ fontSize: '12px', lineHeight: '1.4', opacity: 0.8 }}>
              Consejo Social de Veeduría y Desarrollo Territorial - Plataforma tecnológica integral para el control social y la transparencia.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Enlaces Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '5px' }}>
                <a href="/proyectos" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '12px' }}>
                  Proyectos
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="/donaciones" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '12px' }}>
                  Donaciones
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="/pqrsfd" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '12px' }}>
                  PQRSFD
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Institucional</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '5px' }}>
                <a href="/institucional" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '12px' }}>
                  Quiénes Somos
                </a>
              </li>
              <li style={{ marginBottom: '5px' }}>
                <a href="/consejo-ia" style={{ color: 'white', textDecoration: 'none', opacity: 0.8, fontSize: '12px' }}>
                  Consejo IA
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Contacto</h4>
            <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '6px' }}>
              📧 info@csdt.gov.co
            </p>
            <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '6px' }}>
              📞 +57 (1) 234-5678
            </p>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>
              📍 Bogotá, Colombia
            </p>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '15px',
          textAlign: 'center',
          fontSize: '12px',
          opacity: 0.6
        }}>
          <p>&copy; 2024 CSDT - Consejo Social de Veeduría y Desarrollo Territorial. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
