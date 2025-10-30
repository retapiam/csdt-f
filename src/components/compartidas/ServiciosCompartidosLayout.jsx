import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const ServiciosCompartidosLayout = () => {
  const { user } = useAuth();

  return (
      <div className="servicios-layout">
        <header className="servicios-header">
          <div className="servicios-user">
            <div className="servicios-user-avatar" aria-hidden>
              {(user?.name || 'U')[0]}
            </div>
            <div className="servicios-user-info">
              <div className="servicios-user-name">{user?.name}</div>
              <div className="servicios-user-meta">
                <span className="servicios-user-email">{user?.email}</span>
                <span className="servicios-user-rol">{user?.rol}</span>
              </div>
            </div>
          </div>
          <nav className="servicios-nav">
            <NavLink to="/contacto" className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink>
            <NavLink to="/ayuda" className={({ isActive }) => isActive ? 'active' : ''}>Ayuda</NavLink>
            <NavLink to="/documentos" className={({ isActive }) => isActive ? 'active' : ''}>Documentos</NavLink>
            <NavLink to="/noticias" className={({ isActive }) => isActive ? 'active' : ''}>Noticias</NavLink>
            <NavLink to="/perfil" className={({ isActive }) => isActive ? 'active' : ''}>Perfil</NavLink>
            <NavLink to="/terminos" className={({ isActive }) => isActive ? 'active' : ''}>Términos</NavLink>
            <NavLink to="/convocatorias" className={({ isActive }) => isActive ? 'active' : ''}>Convocatorias</NavLink>
          </nav>
        </header>

        <section className="servicios-content">
          <Outlet />
        </section>
      </div>
  );
};

export default ServiciosCompartidosLayout;


