import React from 'react';
import './Politicas.css'; // Asegúrate de importar el CSS aquí

const Politicas = () => {
  return (
    <section className="politicas-seccion">
      <div className="politicas-header">
        <h2>Qué tenés que saber</h2>
        <hr className="subrayado-politicas" />
      </div>

      <div className="politicas-contenedor">
        <div className="columna-politica">
          <h3>Normas de la casa</h3>
          <ul>
            <li>Check-out: 10:00</li>
            <li>No se permiten mascotas</li>
            <li>No fumar</li>
          </ul>
        </div>

        <div className="columna-politica">
          <h3>Salud y seguridad</h3>
          <ul>
            <li>Detector de humo</li>
            <li>Depósito de seguridad</li>
            <li>Protocolos COVID-19</li>
          </ul>
        </div>

        <div className="columna-politica">
          <h3>Política de cancelación</h3>
          <p>Agregá las fechas de tu viaje para obtener los detalles de cancelación de esta propiedad.</p>
        </div>
      </div>
    </section>
  );
};

export default Politicas;