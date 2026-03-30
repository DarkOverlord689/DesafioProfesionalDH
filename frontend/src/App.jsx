import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Administracion from './pages/Administracion';
import DetalleProducto from './pages/DetalleProducto';
import Registro from './pages/Registro';
import Login from "./login/Login";
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
          {/* path producto y admin */}
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;