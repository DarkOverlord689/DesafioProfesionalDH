import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Administracion from './pages/Administracion';
import DetalleProducto from './pages/DetalleProducto';
import Registro from './pages/Registro';
import Login from "./login/Login";
import Favoritos from './pages/Favoritos';
import ProtectedRoute from './components/ProtectedRoute';
import GestionUsuarios from './components/GestionUsuarios';
import ReservaProducto from './pages/ReservaProducto';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* AUTHS */}
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administracion"
            element={
              <ProtectedRoute>
                <Administracion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administracion/usuarios"
            element={
              <ProtectedRoute>
                <GestionUsuarios />
              </ProtectedRoute>
            }
          />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route
            path="/producto/:id/reserva"
            element={
              <ProtectedRoute>
                <ReservaProducto />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;