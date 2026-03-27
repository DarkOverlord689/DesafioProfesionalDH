import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <section className="search-block">
        <h1>Busca ofertas en hoteles, casas y mucho más</h1>
        <div className="search-bar">
          <input type="text" placeholder="¿A dónde vamos?" />
          <input type="text" placeholder="Check in - Check out" />
          <button className="btn-primary">Buscar</button>
        </div>
      </section>

      <section className="recommendations-block">
        <h2>Recomendaciones</h2>
        <div className="product-grid">
          {productos.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.imagenUrl} alt={p.nombre} />
              <div className="product-info">
                <span className="category-tag">{p.categoria}</span>
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <button className="btn-detail">Ver detalle</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;