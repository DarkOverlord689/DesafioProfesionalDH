import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // HU #20

  // --- Paginacion HU #8  ---
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10; // Criterio HU #8

  useEffect(() => {
    // Productos
    axios.get('http://localhost:8080/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));

    // Categorías
    axios.get('http://localhost:8080/api/categorias')
      .then(res => setCategorias(res.data)) // <--- Esto llena el estado 'categorias'
      .catch(err => console.error(err));
  }, []);

  // --- LÓGICA DE FILTRADO (HU #20) ---
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(p => p.categoria?.id === categoriaSeleccionada)
    : productos;

  // Ajuste de paginación sobre los productos filtrados
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosAMostrar = productosFiltrados.slice(indicePrimero, indiceUltimo);

  return (
    <div className="home-container">
      {/* Buscador */}
      <section className="search-block">
        <h1>Busca ofertas en hoteles, casas y mucho más</h1>
        <div className="search-bar">
          <input type="text" placeholder="¿A dónde vamos?" className="input-search" />
          <input type="text" placeholder="Check in - Check out" className="input-search" />
          <button className="btn-primary">Buscar</button>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories-block">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="categories-grid">
          {categorias.map(cat => (
            <div
              key={cat.id}
              className={`category-card ${categoriaSeleccionada === cat.id ? 'active-filter' : ''}`}
              onClick={() => {
                setCategoriaSeleccionada(cat.id === categoriaSeleccionada ? null : cat.id);
                setPaginaActual(1); // Reset de página al filtrar
              }}
            >
              <img src={cat.imagenUrl} alt={cat.titulo} />
              <div className="category-info">
                <h3>{cat.titulo}</h3>
                <p>{categoriaSeleccionada === cat.id ? 'Quitar filtro' : `Ver ${cat.titulo?.toLowerCase()}`}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFO DE RESULTADOS (Criterio HU #20) */}
      <div className="results-info-bar">
        <p>Mostrando <b>{productosFiltrados.length}</b> de <b>{productos.length}</b> alojamientos disponibles</p>
        {categoriaSeleccionada && (
          <button className="btn-clear" onClick={() => setCategoriaSeleccionada(null)}>Limpiar filtros ✕</button>
        )}
      </div>

      {/* HU #4: Grid 2x5 */}
      <section className="recommendations-block">
        <h2>Recomendaciones</h2>
        <div className="product-grid">
          {productosAMostrar.map(p => (
            <div key={p.id} className="product-card">
              <div className="img-container">
                <img src={p.imagenUrl} alt={p.nombre} />
                <span className="fav-icon">❤️</span>
              </div>
              <div className="product-info">
                <div className="info-header">
                  <span className="category-tag">{p.categoria?.titulo || "Alojamiento"}</span>
                  <span className="rating">⭐⭐⭐⭐⭐</span>
                </div>
                <h3>{p.nombre}</h3>
                <p className="description">{p.descripcion}</p>
                <Link to={`/producto/${p.id}`} className="btn-detail">Ver detalle</Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- CONTROLES DE PAGINACIÓN (HU #8) --- */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="pagination-controls">
            <button onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} className="btn-pag">Inicio</button>
            <button onClick={() => setPaginaActual(prev => prev - 1)} disabled={paginaActual === 1} className="btn-pag">Anterior</button>
            <span className="page-number">Página {paginaActual}</span>
            <button onClick={() => setPaginaActual(prev => prev + 1)} disabled={indiceUltimo >= productosFiltrados.length} className="btn-pag">Siguiente</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;