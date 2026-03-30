import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo-section">
          <span className="brand-name">DARKSISHOP</span>
          <span className="slogan">Sentite como en tu hogar</span>
        </div>
      </Link>
      <div className="auth-buttons">
        <Link to="/administracion">
          <button className="btn-secondary">Panel Admin</button>
        </Link>
        <Link to="/registro">
          <button className="btn-secondary">Crear cuenta</button>
        </Link>
        <button className="btn-secondary">Iniciar sesión</button>
      </div>
    </header>
  );
};

export default Header;