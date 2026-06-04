import React, { useEffect, useState } from 'react';
import { listarCategorias } from '../services/CategoriaService';

const Categorias = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    listarCategorias()
      .then(setCats)
      .catch((err) => console.error('Error cargando categorias:', err));
  }, []);

  return (
    <div className="categorias-container">
      <h2>Buscar por tipo de alojamiento</h2>
      <div className="categorias-grid">
        {cats.map((c) => (
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
