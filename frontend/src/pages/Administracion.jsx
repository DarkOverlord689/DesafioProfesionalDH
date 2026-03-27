import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Administracion = () => {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', categoria: '', descripcion: '', imagenUrl: '' });

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const res = await axios.get('http://localhost:8080/api/productos');
    setProductos(res.data);
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/productos', nuevo);
      alert("✅ Producto registrado");
      setNuevo({ nombre: '', categoria: '', descripcion: '', imagenUrl: '' });
      cargar();
    } catch (err) {
      alert(err.response?.data || "❌ Error al guardar");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8080/api/productos/${id}`);
        alert("🗑️ Eliminado");
        cargar();
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleCrear}>
        <h2>Registrar Nuevo Producto</h2>
        <input 
          className="admin-input" 
          type="text" 
          placeholder="Nombre" 
          value={nuevo.nombre} 
          onChange={e => setNuevo({...nuevo, nombre: e.target.value})} 
          required 
        />
        <input 
          className="admin-input" 
          type="text" 
          placeholder="Categoría" 
          value={nuevo.categoria} 
          onChange={e => setNuevo({...nuevo, categoria: e.target.value})} 
          required 
        />
        <textarea 
          className="admin-input" 
          placeholder="Descripción" 
          value={nuevo.descripcion} 
          onChange={e => setNuevo({...nuevo, descripcion: e.target.value})} 
          required 
        />
        <input 
          className="admin-input" 
          type="text" 
          placeholder="URL Imagen" 
          value={nuevo.imagenUrl} 
          onChange={e => setNuevo({...nuevo, imagenUrl: e.target.value})} 
          required 
        />
        <button type="submit" className="btn-save">Guardar Producto</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>
                <button className="btn-delete" onClick={() => handleEliminar(p.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administracion;