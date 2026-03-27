import React from 'react';

const Buscador = () => {
  return (
    <div className="buscador-section">
      <h1>Busca ofertas en hoteles, casas y mucho más</h1>
      <div className="buscador-bar">
        <div className="input-group">
          <span>📍</span>
          <input type="text" placeholder="¿A dónde vamos?" />
        </div>
        <div className="input-group">
          <span>📅</span>
          <input type="text" placeholder="Check-in - Check-out" />
        </div>
        <button className="btn-gold">Buscar</button>
      </div>
    </div>
  );
};

export default Buscador;