import React, { useState } from 'react';
import axios from 'axios';

const Categorias = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    // Traemos las categorías reales de MySQL
    axios.get('http://localhost:8080/api/categorias')
      .then(res => setCats(res.data))
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  return (
    <div className="categorias-container">
      <h2>Buscar por tipo de alojamiento</h2>
      <div className="categorias-grid">
        {cats.map(c => (
          <div key={c.id} className="cat-card">
            <img src={c.imagenUrl} alt={c.titulo} />
            <div className="cat-info">
              <h3>{c.titulo}</h3>
              <p>{c.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;