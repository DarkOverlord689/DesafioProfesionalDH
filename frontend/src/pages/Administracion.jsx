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
    // 1. Esto lanza el cartel de confirmación
    const confirmar = window.confirm("¿Estás seguro de que querés borrar este producto?");

    if (confirmar) {
      try {
        // 2. Usar comillas invertidas ` ` NO comillas simples ' '
        await axios.delete(`http://localhost:8080/api/productos/${id}`);

        alert("🗑️ Producto borrado con éxito");

        // 3. Volver a cargar la lista para que desaparezca de la pantalla
        cargar();
      } catch (error) {
        console.error(error);
        alert("No se pudo eliminar el producto");
      }
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h1>Administración</h1>
      <form onSubmit={handleCrear} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '40px' }}>
        <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} required />
        <input type="text" placeholder="Categoría" value={nuevo.categoria} onChange={e => setNuevo({ ...nuevo, categoria: e.target.value })} required />
        <textarea placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} required />
        <input type="text" placeholder="URL Imagen" value={nuevo.imagenUrl} onChange={e => setNuevo({ ...nuevo, imagenUrl: e.target.value })} required />
        <button type="submit" className="btn-primary">Guardar Producto</button>
      </form>

      <table style={{ width: '100%', backgroundColor: '#272a2a', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#dbb155' }}>
            <th>ID</th><th>Nombre</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nombre}</td>
              <td><button onClick={() => handleEliminar(p.id)} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Administracion;