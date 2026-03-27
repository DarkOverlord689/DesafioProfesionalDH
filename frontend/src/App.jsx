import { useEffect, useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png' // Tu imagen de fondo
import './App.css'

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error conectando al server:", err));
  }, []);

  return (
    <div className="app-container">
      {/* HEADER con tus logos */}
      <header className="header">
        <div className="logo-section">
          <img src={reactLogo} className="logo" alt="React logo" />
          <div className="logo-text">
            <span className="brand-name">DARKSISHOP</span>
            <span className="slogan">Sentite como en tu hogar</span>
          </div>
        </div>
        <div className="auth-buttons">
          <button className="btn-secondary">Crear cuenta</button>
          <button className="btn-secondary">Iniciar sesión</button>
        </div>
      </header>

      <main>
        {/* BUSCADOR con tu imagen heroImg */}
        <section className="search-block" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImg})` }}>
          <h1>Busca ofertas en hoteles, casas y mucho más</h1>
          <div className="search-bar">
            <input type="text" placeholder="¿A dónde vamos?" className="input-dest" />
            <input type="text" placeholder="Check-in - Check-out" className="input-date" />
            <button className="btn-primary">Buscar</button>
          </div>
        </section>

        {/* CATEGORIAS (Maqueta obligatoria Sprint 1) */}
        <section className="categories-block">
          <h2>Buscar por tipo de alojamiento</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="cat-placeholder">🏨</div>
              <div className="cat-info"><h3>Hoteles</h3><p>807,105 hoteles</p></div>
            </div>
            <div className="category-card">
              <div className="cat-placeholder">🏢</div>
              <div className="cat-info"><h3>Departamentos</h3><p>12,450 departamentos</p></div>
            </div>
          </div>
        </section>

        {/* RECOMENDACIONES (Viniendo del Backend) */}
        <section className="recommendations-block">
          <h2>Recomendaciones</h2>
          <div className="product-grid">
            {productos.length > 0 ? productos.map(p => (
              <div key={p.id} className="product-card">
                <img src={p.imagenUrl} alt={p.nombre} />
                <div className="product-info">
                  <span className="category-tag">{p.categoria}</span>
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                  <button className="btn-detail">Ver detalle</button>
                </div>
              </div>
            )) : <p className="loading-text">Cargando experiencias desde el servidor...</p>}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>©2026 DARKSISHOP</p>
          <img src={viteLogo} className="logo-vite" alt="Vite logo" />
        </div>
      </footer>
    </div>
  )
}

export default App