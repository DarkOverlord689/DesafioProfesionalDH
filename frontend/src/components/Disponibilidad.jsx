import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import './Disponibilidad.css';

registerLocale('es', es);

const Disponibilidad = ({ fechasReservadas = [] }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(false); // Simulación de manejo de errores

  // Simulación de "Intentar de nuevo"
  const reintentarCarga = () => {
    setError(false);
    console.log("Reintentando obtener disponibilidad...");
  };

  if (error) {
    return (
      <div className="error-disponibilidad">
        <p>⚠️ No se pudo obtener la información de disponibilidad en este momento.</p>
        <button onClick={reintentarCarga} className="btn-reintentar">Intentar nuevamente</button>
      </div>
    );
  }

  return (
    <section className="disponibilidad-seccion">
      <h2>Fechas disponibles</h2>
      <div className="disponibilidad-flex">

        {/* Calendario Doble Inline (HU #23) */}
        <div className="calendario-contenedor">
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={2} // Muestra dos meses
            locale="es"
            minDate={new Date()}
            excludeDates={fechasReservadas} // Criterio: Fechas ocupadas
            calendarClassName="calendario-detalle"
          />
        </div>

        {/* Bloque de Acción para Reservar */}
        <div className="reserva-card">
          <p>Agregá tus fechas de viaje para obtener precios exactos</p>
          <button className="btn-reserva" disabled={!startDate || !endDate}>
            Iniciar reserva
          </button>
        </div>
      </div>
    </section>
  );
};

export default Disponibilidad;