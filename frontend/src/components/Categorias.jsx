import React from 'react';

const Categorias = () => {
  const cats = [
    { id: 1, nombre: 'Hoteles', img: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg' },
    { id: 2, nombre: 'Departamentos', img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' },
    { id: 3, nombre: 'Hostels', img: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg' },
    { id: 4, nombre: 'Bed and Breakfast', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' }
  ];

  return (
    <div className="categorias-container">
      <h2>Buscar por tipo de alojamiento</h2>
      <div className="categorias-grid">
        {cats.map(c => (
          <div key={c.id} className="cat-card">
            <img src={c.img} alt={c.nombre} />
            <div className="cat-info">
              <h3>{c.nombre}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;