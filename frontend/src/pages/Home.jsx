import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { useAuth } from '../hooks/useAuth';
import { listarCategorias } from '../services/CategoriaService';
import { listarProductos } from '../services/ProductoService';
import './Buscador.css';
import './Home.css';

registerLocale('es', es);

const leerFavoritos = (key) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

const Home = () => {
  const { user } = useAuth();
  const favoritosKey = user ? `favoritos-${user.id}` : 'favoritos-anonimos';
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filtrosAplicados, setFiltrosAplicados] = useState({ texto: '' });
  const [paginaActual, setPaginaActual] = useState(1);
  const [favoritosState, setFavoritosState] = useState(() => ({
    key: favoritosKey,
    ids: leerFavoritos(favoritosKey)
  }));
  const productosPorPagina = 10;
  const favoritos = favoritosState.key === favoritosKey ? favoritosState.ids : leerFavoritos(favoritosKey);

  useEffect(() => {
    Promise.all([listarProductos(), listarCategorias()])
      .then(([productosData, categoriasData]) => {
        setProductos(productosData);
        setCategorias(categoriasData);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorito = (productoId) => {
    if (!user) {
      alert('Debes iniciar sesion para guardar favoritos.');
      return;
    }

    setFavoritosState(() => {
      const nuevaLista = favoritos.includes(productoId)
        ? favoritos.filter((id) => id !== productoId)
        : [...favoritos, productoId];

      localStorage.setItem(favoritosKey, JSON.stringify(nuevaLista));
      return { key: favoritosKey, ids: nuevaLista };
    });
  };

  const productosFiltrados = productos.filter((p) => {
    const cumpleCategoria = categoriaSeleccionada ? p.categoria?.id === categoriaSeleccionada : true;
    const texto = filtrosAplicados.texto.toLowerCase();
    const nombre = p.nombre ? p.nombre.toLowerCase() : '';
    const descripcion = p.descripcion ? p.descripcion.toLowerCase() : '';

    return cumpleCategoria && (nombre.includes(texto) || descripcion.includes(texto));
  });

  const ejecutarBusqueda = () => {
    setFiltrosAplicados({ texto: busquedaTexto.trim() });
    setPaginaActual(1);
  };

  const limpiarFiltros = () => {
    setCategoriaSeleccionada(null);
    setBusquedaTexto('');
    setFiltrosAplicados({ texto: '' });
    setStartDate(null);
    setEndDate(null);
    setPaginaActual(1);
  };

  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosAMostrar = productosFiltrados.slice(indicePrimero, indiceUltimo);

  return (
    <div className="home-container">
      <section className="search-block">
        <h1>Busca ofertas en hoteles, casas y mucho mas</h1>
        <p>Encuentra el alojamiento ideal para tus fechas y destino</p>

        <div className="search-bar">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="A donde vamos?"
              className="input-search"
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              list="productos-sugeridos"
            />
            <datalist id="productos-sugeridos">
              {productos.map((p) => <option key={p.id} value={p.nombre} />)}
            </datalist>
          </div>

          <div className="datepicker-wrapper">
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                const [start, end] = update;
                setStartDate(start);
                setEndDate(end);
              }}
              isClearable
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

      <section className="categories-block">
        <h2>Buscar por tipo de alojamiento</h2>
        <div className="categories-grid">
          {categorias.map((cat) => (
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

      <div className="results-info-bar">
        <p>Mostrando <b>{productosFiltrados.length}</b> de <b>{productos.length}</b> alojamientos</p>
        {(categoriaSeleccionada || filtrosAplicados.texto) && (
          <button className="btn-clear" onClick={limpiarFiltros}>Limpiar filtros x</button>
        )}
      </div>

      <section className="recommendations-block">
        <h2>Recomendaciones</h2>
        <div className="product-grid">
          {productosAMostrar.map((p) => (
            <div key={p.id} className="product-card">
              <div className="img-container">
                <img src={p.imagenUrl} alt={p.nombre} />

                <button
                  className={`fav-btn ${favoritos.includes(p.id) ? 'es-favorito' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorito(p.id);
                  }}
                  title={favoritos.includes(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {favoritos.includes(p.id) ? 'Favorito' : 'Guardar'}
                </button>

                <span className="category-tag-float">{p.categoria?.titulo || 'Alojamiento'}</span>
              </div>

              <div className="product-info">
                <div className="info-header">
                  <span className="category-tag">{p.categoria?.titulo || 'Alojamiento'}</span>
                  <div className="card-rating-wrapper">
                    <span className="rating-number">8.5</span>
                    <span className="rating-text">Muy bueno</span>
                  </div>
                </div>

                <h3>{p.nombre}</h3>
                <div className="mini-stars">***** <small>(12 valoraciones)</small></div>
                <p className="description">{p.descripcion}</p>
                <Link to={`/producto/${p.id}`} className="btn-detail">Ver detalle</Link>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length > productosPorPagina && (
          <div className="pagination-controls">
            <button onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} className="btn-pag">Inicio</button>
            <button onClick={() => setPaginaActual((prev) => prev - 1)} disabled={paginaActual === 1} className="btn-pag">Anterior</button>
            <span className="page-number">Pagina {paginaActual}</span>
            <button onClick={() => setPaginaActual((prev) => prev + 1)} disabled={indiceUltimo >= productosFiltrados.length} className="btn-pag">Siguiente</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
