import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Administracion = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]); // HU #12
  const [caracteristicas, setCaracteristicas] = useState([]); // HU #17

  const [nuevo, setNuevo] = useState({
    nombre: '',
    categoria: { id: '' }, // Objeto para el Backend
    descripcion: '',
    imagenUrl: '',
    caracteristicas: [] // Array de objetos {id: x}
  });

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      const [resProd, resCat, resCar] = await Promise.all([
        axios.get('http://localhost:8080/api/productos'),
        axios.get('http://localhost:8080/api/categorias'),
        axios.get('http://localhost:8080/api/caracteristicas')
      ]);
      setProductos(resProd.data);
      setCategorias(resCat.data);
      setCaracteristicas(resCar.data);
    } catch (err) {
      console.error("Error cargando datos", err);
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/productos', nuevo);
      alert("✅ Producto registrado");
      setNuevo({ nombre: '', categoria: { id: '' }, descripcion: '', imagenUrl: '', caracteristicas: [] });
      cargarTodo();
    } catch (err) {
      alert(err.response?.data || "❌ Error al guardar");
    }
  };

  const handleCheckboxChange = (id) => {
    const list = [...nuevo.caracteristicas];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) {
      list.push({ id });
    } else {
      list.splice(index, 1);
    }
    setNuevo({ ...nuevo, caracteristicas: list });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8080/api/productos/${id}`);
        alert("🗑️ Eliminado");
        cargarTodo();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  const [nuevaCategoria, setNuevaCategoria] = useState({
    titulo: '',
    descripcion: '',
    imagenUrl: ''
  });

  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/categorias', nuevaCategoria);
      alert("¡Categoría creada con éxito!");
      setNuevaCategoria({ titulo: '', descripcion: '', imagenUrl: '' });

      // RECARGA LAS CATEGORÍAS PARA EL SELECT
      const res = await axios.get('http://localhost:8080/api/categorias');
      setCategorias(res.data); // Esto actualiza el dropdown de productos automáticamente

    } catch (error) {
      console.error("Error al crear categoría", error);
      alert("Hubo un fallo al guardar");
    }
  };

  const [tabActiva, setTabActiva] = useState('productos');
  const styles = {
    tabActive: { padding: '10px 20px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    tabInactive: { padding: '10px 20px', backgroundColor: '#444', color: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  const [nuevaChar, setNuevaChar] = useState({ nombre: '', icono: '' });

  const handleCharSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/caracteristicas', nuevaChar);
      alert("¡Característica añadida con éxito!");
      setNuevaChar({ nombre: '', icono: '' }); // Limpiar

      // Actualizar la lista global para que el formulario de productos se entere
      const res = await axios.get('http://localhost:8080/api/caracteristicas');
      setCaracteristicas(res.data);
    } catch (error) {
      console.error("Error", error);
      alert("No se pudo guardar la característica");
    }
  };

  const eliminarElemento = async (tipo, id) => {
    if (window.confirm(`¿Seguro que quieres eliminar este ${tipo}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/${tipo}/${id}`);
        alert("Eliminado correctamente");
        // Recargar la página o filtrar el estado para que desaparezca visualmente
        window.location.reload();
      } catch (error) {
        alert("No se puede eliminar: el elemento está siendo usado por un producto.");
      }
    }
  };

return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* 1. NAVEGACIÓN (TABS) */}
      <div className="admin-tabs">
        {['productos', 'categorias', 'caracteristicas'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`btn-tab ${tabActiva === tab ? 'active' : ''}`}
            onClick={() => setTabActiva(tab)}
          >
            Gestionar {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* 2. FORMULARIOS DINÁMICOS Y LISTAS DE BORRADO */}
      <div className="admin-forms-wrapper">
        
        {/* PESTAÑA PRODUCTOS */}
        {tabActiva === 'productos' && (
          <form className="admin-form" onSubmit={handleCrear}>
            <h2>Registrar Nuevo Producto</h2>
            <input className="admin-input" type="text" placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} required />
            <select className="admin-input" value={nuevo.categoria.id} onChange={e => setNuevo({ ...nuevo, categoria: { id: e.target.value } })} required>
              <option value="">Selecciona una Categoría</option>
              {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.titulo}</option>)}
            </select>
            <textarea className="admin-input" placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} required />
            <input className="admin-input" type="text" placeholder="URL Imagen" value={nuevo.imagenUrl} onChange={e => setNuevo({ ...nuevo, imagenUrl: e.target.value })} required />
            <div className="caracteristicas-grid">
              {caracteristicas.map(car => (
                <label key={car.id} className="caracteristica-label">
                  <input type="checkbox" checked={nuevo.caracteristicas.some(item => item.id === car.id)} onChange={() => handleCheckboxChange(car.id)} /> {car.nombre}
                </label>
              ))}
            </div>
            <button type="submit" className="btn-save">Guardar Producto</button>
          </form>
        )}

        {/* PESTAÑA CATEGORÍAS (Formulario + Lista para borrar) */}
        {tabActiva === 'categorias' && (
          <div className="admin-tab-content">
            <form className="admin-form" onSubmit={handleCategoriaSubmit}>
              <h2>Nueva Categoría</h2>
              <input className="admin-input" type="text" placeholder="Título" value={nuevaCategoria.titulo} onChange={e => setNuevaCategoria({ ...nuevaCategoria, titulo: e.target.value })} required />
              <textarea className="admin-input" placeholder="Descripción" value={nuevaCategoria.descripcion} onChange={e => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })} required />
              <input className="admin-input" type="text" placeholder="URL Imagen" value={nuevaCategoria.imagenUrl} onChange={e => setNuevaCategoria({ ...nuevaCategoria, imagenUrl: e.target.value })} required />
              <button type="submit" className="btn-save">Crear Categoría</button>
            </form>

            <div className="admin-items-list">
              <h3>Categorías Existentes</h3>
              {categorias.map(cat => (
                <div key={cat.id} className="admin-item-row">
                  <span>{cat.titulo}</span>
                  <button className="btn-delete-small" onClick={() => eliminarElemento('categorias', cat.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA CARACTERÍSTICAS (Formulario + Lista para borrar) */}
        {tabActiva === 'caracteristicas' && (
          <div className="admin-tab-content">
            <form className="admin-form" onSubmit={handleCharSubmit}>
              <h2>Nueva Característica</h2>
              <input className="admin-input" type="text" placeholder="Nombre (WiFi)" value={nuevaChar.nombre} onChange={e => setNuevaChar({ ...nuevaChar, nombre: e.target.value })} required />
              <input className="admin-input" type="text" placeholder="Icono (fa-wifi)" value={nuevaChar.icono} onChange={e => setNuevaChar({ ...nuevaChar, icono: e.target.value })} required />
              <button type="submit" className="btn-save">Guardar Característica</button>
            </form>

            <div className="admin-items-list">
              <h3>Características Existentes</h3>
              {caracteristicas.map(car => (
                <div key={car.id} className="admin-item-row">
                  <span><i className={`fas ${car.icono}`}></i> {car.nombre}</span>
                  <button className="btn-delete-small" onClick={() => eliminarElemento('caracteristicas', car.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. TABLA DE PRODUCTOS */}
      {tabActiva === 'productos' && (
        <div className="admin-table-section">
          <h2 className="table-title">Productos en Inventario</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria?.titulo || "---"}</td>
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