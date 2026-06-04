import React, { useEffect, useState } from 'react';
import GestionUsuarios from '../components/GestionUsuarios';
import { crearCaracteristica, eliminarCaracteristica, listarCaracteristicas } from '../services/CaracteristicaService';
import { crearCategoria, eliminarCategoria, listarCategorias } from '../services/CategoriaService';
import { crearProducto, eliminarProducto, listarProductos } from '../services/ProductoService';
import './Administracion.css';

const initialProducto = {
  nombre: '',
  categoria: { id: '' },
  descripcion: '',
  imagenUrl: '',
  caracteristicas: []
};

const urlValida = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const Administracion = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [nuevo, setNuevo] = useState(initialProducto);
  const [nuevaCategoria, setNuevaCategoria] = useState({ titulo: '', descripcion: '', imagenUrl: '' });
  const [nuevaChar, setNuevaChar] = useState({ nombre: '', icono: '' });
  const [tabActiva, setTabActiva] = useState('productos');
  const [errores, setErrores] = useState({});

  const obtenerTodo = () => Promise.all([
    listarProductos(),
    listarCategorias(),
    listarCaracteristicas()
  ]);

  const aplicarDatos = ([productosData, categoriasData, caracteristicasData]) => {
    setProductos(productosData);
    setCategorias(categoriasData);
    setCaracteristicas(caracteristicasData);
  };

  async function cargarTodo() {
    try {
      aplicarDatos(await obtenerTodo());
    } catch (err) {
      alert(err.message || 'Error cargando datos');
    }
  }

  useEffect(() => {
    obtenerTodo()
      .then(aplicarDatos)
      .catch((err) => alert(err.message || 'Error cargando datos'));
  }, []);

  const validarProducto = () => {
    const next = {};
    if (!nuevo.nombre.trim()) next.nombre = 'El nombre es obligatorio.';
    if (!nuevo.categoria.id) next.categoria = 'Selecciona una categoria.';
    if (!nuevo.descripcion.trim()) next.descripcion = 'La descripcion es obligatoria.';
    if (!urlValida(nuevo.imagenUrl)) next.imagenUrl = 'Ingresa una URL de imagen valida.';
    setErrores(next);
    return Object.keys(next).length === 0;
  };

  const validarCategoria = () => {
    const next = {};
    if (!nuevaCategoria.titulo.trim()) next.titulo = 'El titulo es obligatorio.';
    if (!nuevaCategoria.descripcion.trim()) next.descripcionCategoria = 'La descripcion es obligatoria.';
    if (!urlValida(nuevaCategoria.imagenUrl)) next.imagenCategoria = 'Ingresa una URL de imagen valida.';
    setErrores(next);
    return Object.keys(next).length === 0;
  };

  const validarCaracteristica = () => {
    const next = {};
    if (!nuevaChar.nombre.trim()) next.nombreChar = 'El nombre es obligatorio.';
    if (!nuevaChar.icono.trim()) next.icono = 'El icono es obligatorio.';
    setErrores(next);
    return Object.keys(next).length === 0;
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!validarProducto()) return;

    try {
      await crearProducto({
        ...nuevo,
        categoria: { id: Number(nuevo.categoria.id) }
      });
      alert('Producto registrado');
      setNuevo(initialProducto);
      setErrores({});
      cargarTodo();
    } catch (err) {
      alert(err.message || 'Error al guardar');
    }
  };

  const handleCheckboxChange = (id) => {
    const list = [...nuevo.caracteristicas];
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) list.push({ id });
    else list.splice(index, 1);
    setNuevo({ ...nuevo, caracteristicas: list });
  };

  const handleEliminar = async (id) => {
    if (window.confirm('Seguro que quieres eliminar este producto?')) {
      try {
        await eliminarProducto(id);
        cargarTodo();
      } catch (err) {
        alert(err.message || 'Error al eliminar');
      }
    }
  };

  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    if (!validarCategoria()) return;

    try {
      await crearCategoria(nuevaCategoria);
      setNuevaCategoria({ titulo: '', descripcion: '', imagenUrl: '' });
      setErrores({});
      cargarTodo();
    } catch (err) {
      alert(err.message || 'No se pudo guardar la categoria');
    }
  };

  const handleCharSubmit = async (e) => {
    e.preventDefault();
    if (!validarCaracteristica()) return;

    try {
      await crearCaracteristica(nuevaChar);
      setNuevaChar({ nombre: '', icono: '' });
      setErrores({});
      cargarTodo();
    } catch (err) {
      alert(err.message || 'No se pudo guardar la caracteristica');
    }
  };

  const eliminarElemento = async (tipo, id) => {
    if (!window.confirm(`Seguro que quieres eliminar este ${tipo}?`)) return;

    try {
      if (tipo === 'categoria') await eliminarCategoria(id);
      if (tipo === 'caracteristica') await eliminarCaracteristica(id);
      cargarTodo();
    } catch (err) {
      alert(err.message || 'No se puede eliminar: el elemento esta siendo usado por un producto.');
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administracion</h1>

      <div className="admin-tabs">
        {['productos', 'categorias', 'caracteristicas', 'usuarios'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`btn-tab ${tabActiva === tab ? 'active' : ''}`}
            onClick={() => {
              setTabActiva(tab);
              setErrores({});
            }}
          >
            Gestionar {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-forms-wrapper">
        {tabActiva === 'productos' && (
          <form className="admin-form" onSubmit={handleCrear} noValidate>
            <h2>Registrar Nuevo Producto</h2>
            <input className="admin-input" type="text" placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
            {errores.nombre && <small className="field-error">{errores.nombre}</small>}

            <select className="admin-input" value={nuevo.categoria.id} onChange={(e) => setNuevo({ ...nuevo, categoria: { id: e.target.value } })}>
              <option value="">Selecciona una Categoria</option>
              {categorias.map((cat) => <option key={cat.id} value={cat.id}>{cat.titulo}</option>)}
            </select>
            {errores.categoria && <small className="field-error">{errores.categoria}</small>}

            <textarea className="admin-input" placeholder="Descripcion" value={nuevo.descripcion} onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })} />
            {errores.descripcion && <small className="field-error">{errores.descripcion}</small>}

            <input className="admin-input" type="text" placeholder="URL Imagen" value={nuevo.imagenUrl} onChange={(e) => setNuevo({ ...nuevo, imagenUrl: e.target.value })} />
            {errores.imagenUrl && <small className="field-error">{errores.imagenUrl}</small>}

            <div className="caracteristicas-grid">
              {caracteristicas.map((car) => (
                <label key={car.id} className="caracteristica-label">
                  <input type="checkbox" checked={nuevo.caracteristicas.some((item) => item.id === car.id)} onChange={() => handleCheckboxChange(car.id)} /> {car.nombre}
                </label>
              ))}
            </div>
            <button type="submit" className="btn-save">Guardar Producto</button>
          </form>
        )}

        {tabActiva === 'categorias' && (
          <div className="admin-tab-content">
            <form className="admin-form" onSubmit={handleCategoriaSubmit} noValidate>
              <h2>Nueva Categoria</h2>
              <input className="admin-input" type="text" placeholder="Titulo" value={nuevaCategoria.titulo} onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, titulo: e.target.value })} />
              {errores.titulo && <small className="field-error">{errores.titulo}</small>}

              <textarea className="admin-input" placeholder="Descripcion" value={nuevaCategoria.descripcion} onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })} />
              {errores.descripcionCategoria && <small className="field-error">{errores.descripcionCategoria}</small>}

              <input className="admin-input" type="text" placeholder="URL Imagen" value={nuevaCategoria.imagenUrl} onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, imagenUrl: e.target.value })} />
              {errores.imagenCategoria && <small className="field-error">{errores.imagenCategoria}</small>}

              <button type="submit" className="btn-save">Crear Categoria</button>
            </form>

            <div className="admin-items-list">
              <h3>Categorias Existentes</h3>
              {categorias.map((cat) => (
                <div key={cat.id} className="admin-item-row">
                  <span>{cat.titulo}</span>
                  <button className="btn-delete-small" onClick={() => eliminarElemento('categoria', cat.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tabActiva === 'caracteristicas' && (
          <div className="admin-tab-content">
            <form className="admin-form" onSubmit={handleCharSubmit} noValidate>
              <h2>Nueva Caracteristica</h2>
              <input className="admin-input" type="text" placeholder="Nombre (WiFi)" value={nuevaChar.nombre} onChange={(e) => setNuevaChar({ ...nuevaChar, nombre: e.target.value })} />
              {errores.nombreChar && <small className="field-error">{errores.nombreChar}</small>}

              <input className="admin-input" type="text" placeholder="Icono (fa-wifi)" value={nuevaChar.icono} onChange={(e) => setNuevaChar({ ...nuevaChar, icono: e.target.value })} />
              {errores.icono && <small className="field-error">{errores.icono}</small>}

              <button type="submit" className="btn-save">Guardar Caracteristica</button>
            </form>

            <div className="admin-items-list">
              <h3>Caracteristicas Existentes</h3>
              {caracteristicas.map((car) => (
                <div key={car.id} className="admin-item-row">
                  <span><i className={`fas ${car.icono}`}></i> {car.nombre}</span>
                  <button className="btn-delete-small" onClick={() => eliminarElemento('caracteristica', car.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {tabActiva === 'usuarios' && (
        <div className="admin-tab-content">
          <GestionUsuarios />
        </div>
      )}

      {tabActiva === 'productos' && (
        <div className="admin-table-section">
          <h2 className="table-title">Productos en Inventario</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Categoria</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria?.titulo || '---'}</td>
                  <td><button className="btn-delete" onClick={() => handleEliminar(p.id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Administracion;
