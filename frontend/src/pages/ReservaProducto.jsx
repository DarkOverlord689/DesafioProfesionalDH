import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import './ReservaProducto.css';

const ReservaProducto = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate(); // Inicializamos el navegador
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [enviando, setEnviando] = useState(false); // Estado para evitar doble click

    // Criterio: Fechas no disponibles (Simulado por ahora)
    const excludeDates = [new Date(2026, 3, 20), new Date(2026, 3, 21)];

    const handleConfirmarReserva = async () => {
        if (!startDate || !endDate) return;

        setEnviando(true);

        // Armamos el objeto exactamente como lo espera tu @RequestBody en Java
        const reservaData = {
            fechaInicio: startDate.toISOString().split('T')[0], // Formato "YYYY-MM-DD"
            fechaFin: endDate.toISOString().split('T')[0],
            producto: { id: parseInt(id) },
            usuario: { id: user.id }
        };

        try {
            const response = await fetch('http://localhost:8080/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Si usas seguridad/Token, agrégalo aquí:
                    // 'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(reservaData)
            });

            if (response.ok) {
                alert("¡Reserva confirmada con éxito! Te esperamos.");
                navigate('/'); // Redirigimos al home después del éxito
            } else {
                const errorTexto = await response.text();
                alert("Error al procesar reserva: " + errorTexto);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor. Verifica que el Backend esté corriendo.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="reserva-container">
            <header className="reserva-header">
                <h1>Confirmá tu reserva</h1>
            </header>

            <div className="reserva-layout">
                {/* COLUMNA IZQUIERDA: FORMULARIO Y CALENDARIO */}
                <div className="reserva-main">
                    <section className="form-datos-usuario">
                        <h3>Tus datos</h3>
                        <div className="reserva-inputs">
                            <input type="text" value={user?.nombre || ''} disabled placeholder="Nombre" />
                            <input type="text" value={user?.apellido || ''} disabled placeholder="Apellido" />
                            <input type="email" value={user?.email || ''} disabled placeholder="Correo electrónico" />
                        </div>
                    </section>

                    <section className="calendario-reserva">
                        <h3>Seleccioná tu fecha de reserva</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={(update) => {
                                const [start, end] = update;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            monthsShown={2}
                            minDate={new Date()}
                            excludeDates={excludeDates}
                        />
                    </section>
                </div>

                {/* COLUMNA DERECHA: RESUMEN DE LA RESERVA */}
                <aside className="reserva-resumen">
                    <h3>Detalle de la reserva</h3>
                    <div className="resumen-info">
                        <p>Check-in: <span>{startDate ? startDate.toLocaleDateString() : "_/_/_"}</span></p>
                        <p>Check-out: <span>{endDate ? endDate.toLocaleDateString() : "_/_/_"}</span></p>
                        
                        <button 
                            className="btn-confirmar-final" 
                            disabled={!startDate || !endDate || enviando}
                            onClick={handleConfirmarReserva} // Vinculamos la función
                        >
                            {enviando ? "Procesando..." : "Confirmar reserva"}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReservaProducto;