import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './buscador.css';
import es from 'date-fns/locale/es';
import { useAuth } from '../context/AuthContext';
import './home.css';

registerLocale('es', es);

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // HU #20

  // --- HU #22 ---
  const [busquedaTexto, setBusquedaTexto] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState({ texto: "", fechas: [null, null] });

  // --- Paginacion HU #8  ---
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10; // Criterio HU #8
  
  // --- HU #24: Favoritos ---
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem("favoritos");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Función de toggle PROTEGIDA
  const toggleFavorito = (productoId) => {
    // CRITERIO: "Como usuario autenticado..."
    if (!user) {
      alert("Debes iniciar sesión para guardar favoritos ❤️");
      // Opcional: navigate('/login');
      return;
    }

    setFavoritos((prev) => {
      const esFavorito = prev.includes(productoId);
      const nuevaLista = esFavorito
        ? prev.filter(id => id !== productoId)
        : [...prev, productoId];
      
      localStorage.setItem("favoritos", JSON.stringify(nuevaLista));
      return nuevaLista;
    });
  };

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

  // --- LÓGICA DE FILTRADO UNIFICADA (HU #20 + HU #22) ---
  const productosFiltrados = productos.filter(p => {
    // 1. Filtro por Categoría (HU #20)
    const cumpleCategoria = categoriaSeleccionada ? p.categoria?.id === categoriaSeleccionada : true;

    // 2. Filtro por Texto (HU #22)
    const nombre = p.nombre ? p.nombre.toLowerCase() : "";
    const descripcion = p.descripcion ? p.descripcion.toLowerCase() : "";
    const cumpleTexto = nombre.includes(filtrosAplicados.texto.toLowerCase()) ||
      descripcion.includes(filtrosAplicados.texto.toLowerCase());

    return cumpleCategoria && cumpleTexto;
  });

  // Función que se activa al dar click al botón "Buscar"
  const ejecutarBusqueda = () => {
    setFiltrosAplicados({ texto: busquedaTexto });
    setPaginaActual(1);
  };

  // Ajuste de paginación sobre los productos filtrados
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosAMostrar = productosFiltrados.slice(indicePrimero, indiceUltimo);

  return (
    <div className="home-container">

      {/* SECCIÓN BUSCADOR (HU #22) */}
      <section className="search-block">
        <h1>Busca ofertas en hoteles, casas y mucho más</h1>
        <p>Encuentra el alojamiento ideal para tus fechas y destino</p>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="¿A dónde vamos?"
              className="input-search"
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              list="productos-sugeridos"
            />
            <datalist id="productos-sugeridos">
              {productos.map(p => <option key={p.id} value={p.nombre} />)}
            </datalist>
          </div>

          <div className="datepicker-wrapper">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                const [start, end] = update;
                setStartDate(start);
                setEndDate(end);
              }}
              isClearable={true}
              placeholderText="Check in - Check out"
              className="input-search"
              locale="es"
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <button className="btn-primary" onClick={ejecutarBusqueda}>Buscar</button>
        </div>
      </section>

      {/* SECCIÓN CATEGORÍAS (HU #20) */}
      <section className="categories-block">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="categories-grid">
          {categorias.map(cat => (
            <div
              key={cat.id}
              className={`category-card ${categoriaSeleccionada === cat.id ? 'active-filter' : ''}`}
              onClick={() => {
                setCategoriaSeleccionada(cat.id === categoriaSeleccionada ? null : cat.id);
                setPaginaActual(1);
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

      {/* BARRA DE INFO RESULTADOS */}
      <div className="results-info-bar">
        <p>Mostrando <b>{productosFiltrados.length}</b> de <b>{productos.length}</b> alojamientos</p>
        {(categoriaSeleccionada || filtrosAplicados.texto) && (
          <button className="btn-clear" onClick={() => {
            setCategoriaSeleccionada(null);
            setBusquedaTexto("");
            setFiltrosAplicados({ texto: "" });
            setStartDate(null);
            setEndDate(null);
          }}>Limpiar filtros ✕</button>
        )}
      </div>

      {/* RECOMENDACIONES (GRID) */}
      <section className="recommendations-block">
        <h2>Recomendaciones</h2>
        <div className="product-grid">
          {productosAMostrar.map(p => (
            <div key={p.id} className="product-card">
              <div className="img-container">
                <img src={p.imagenUrl} alt={p.nombre} />

                {/* BOTÓN DE FAVORITO INTERACTIVO (HU #24) */}
                <button
                  className={`fav-btn ${favoritos.includes(p.id) ? 'es-favorito' : ''}`}
                  onClick={(e) => {
                    e.preventDefault(); // Evita conflictos si la card tuviera links globales
                    toggleFavorito(p.id);
                  }}
                  title={favoritos.includes(p.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  {favoritos.includes(p.id) ? '❤️' : '🤍'}
                </button>

                {/* Tag de categoría sobre la imagen opcional */}
                <span className="category-tag-float">{p.categoria?.titulo || "Alojamiento"}</span>
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

        {/* PAGINACIÓN */}
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