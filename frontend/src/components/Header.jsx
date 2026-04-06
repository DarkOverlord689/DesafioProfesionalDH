import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import './Header.css';

const Header = () => {
  const { user, logout, getInitials } = useAuth();

  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo-section">
          <span className="brand-name">DARKSISHOP</span>
          <span className="slogan">Sentite como en tu hogar</span>
        </div>
      </Link>

      <div className="auth-buttons">
        {user ? (
          /* ESCENARIO: USUARIO LOGUEADO */
          <div className="user-nav">

            {/* ACCESO A FAVORITOS (HU #25) */}
            <Link to="/favoritos" className="fav-header-link" title="Ver mis favoritos">
              ❤️ Mis Favoritos
            </Link>

            {/* --- ACCESO A HISTORIAL (HU #33) --- */}
            <Link to="/mis-reservas" className="fav-header-link" title="Ver mi historial de reservas">
              🏨 Mis Reservas
            </Link>

            {user.rol === "ADMIN" && (
              <Link to="/administracion">
                <button className="btn-secondary">Panel Admin</button>
              </Link>
            )}

            <div className="user-info">
              <div className="avatar-circle">
                {getInitials()}
              </div>
              <div className="user-text">
                <span className="welcome-msg">Hola,</span>
                <span className="user-name">{user.nombre} {user.apellido}</span>
              </div>
              <button onClick={logout} className="btn-logout">Cerrar sesión</button>
            </div>
          </div>
        ) : (
          /* ESCENARIO: USUARIO ANÓNIMO */
          <>
            <Link to="/registro">
              <button className="btn-secondary">Crear cuenta</button>
            </Link>
            <Link to="/login">
              <button className="btn-secondary">Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;