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

  return (
    <div className="admin-container">
      <h1 className="admin-title">Panel de Administración</h1>

      {/* --- SELECTOR DE PESTAÑAS (TABS) --- */}
      <div className="admin-tabs">
        <button 
          type="button"
          className={`btn-tab ${tabActiva === 'productos' ? 'active' : ''}`}
          onClick={() => setTabActiva('productos')}
        >
          Gestionar Productos
        </button>
        <button 
          type="button"
          className={`btn-tab ${tabActiva === 'categorias' ? 'active' : ''}`}
          onClick={() => setTabActiva('categorias')}
        >
          Gestionar Categorías
        </button>
      </div>

      {/* --- CONTENIDO DINÁMICO SEGÚN LA PESTAÑA --- */}
      <div className="admin-forms-wrapper">
        {tabActiva === 'productos' ? (
          /* FORMULARIO DE PRODUCTOS (HU #12 y #17) */
          <form className="admin-form" onSubmit={handleCrear}>
            <h2>Registrar Nuevo Producto</h2>

            <input 
              className="admin-input" 
              type="text" 
              placeholder="Nombre del Producto" 
              value={nuevo.nombre} 
              onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} 
              required 
            />

            <select
              className="admin-input"
              value={nuevo.categoria.id}
              onChange={e => setNuevo({ ...nuevo, categoria: { id: e.target.value } })}
              required
            >
              <option value="">Selecciona una Categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.titulo}</option>
              ))}
            </select>

            <textarea 
              className="admin-input" 
              placeholder="Descripción detallada" 
              value={nuevo.descripcion} 
              onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} 
              required 
            />

            <input 
              className="admin-input" 
              type="text" 
              placeholder="URL de la Imagen" 
              value={nuevo.imagenUrl} 
              onChange={e => setNuevo({ ...nuevo, imagenUrl: e.target.value })} 
              required 
            />

            <div className="caracteristicas-selector">
              <p>Características disponibles:</p>
              <div className="caracteristicas-grid">
                {caracteristicas.map(car => (
                  <label key={car.id} className="caracteristica-label">
                    <input
                      type="checkbox"
                      checked={nuevo.caracteristicas.some(item => item.id === car.id)}
                      onChange={() => handleCheckboxChange(car.id)}
                    /> {car.nombre}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-save">Guardar Producto</button>
          </form>
        ) : (
          /* FORMULARIO DE CATEGORÍAS (HU #21) */
          <form className="admin-form" onSubmit={handleCategoriaSubmit}>
            <h2>Registrar Nueva Categoría</h2>

            <input
              className="admin-input"
              type="text"
              placeholder="Título de Categoría (Ej: Hoteles)"
              value={nuevaCategoria.titulo}
              onChange={e => setNuevaCategoria({ ...nuevaCategoria, titulo: e.target.value })}
              required
            />

            <textarea
              className="admin-input"
              placeholder="Descripción de la categoría"
              value={nuevaCategoria.descripcion}
              onChange={e => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
              required
            />

            <input
              className="admin-input"
              type="text"
              placeholder="URL Imagen (Icono o Representación)"
              value={nuevaCategoria.imagenUrl}
              onChange={e => setNuevaCategoria({ ...nuevaCategoria, imagenUrl: e.target.value })}
              required
            />

            <button type="submit" className="btn-save btn-categoria">
              Crear Categoría
            </button>
          </form>
        )}
      </div>

      {/* --- LISTADO GLOBAL DE PRODUCTOS --- */}
      <div className="admin-table-section">
        <h2 className="table-title">Productos en Inventario</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria?.titulo || "Sin categoría"}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administracion;