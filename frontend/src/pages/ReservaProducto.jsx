import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import './ReservaProducto.css';

const ReservaProducto = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/productos/${id}`);
                if (!response.ok) throw new Error("Error en el servidor");
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error("Error:", error);
                fetch(`http://localhost:8080/api/productos/detalle/${id}`)
                    .then(res => res.json())
                    .then(data => setProducto(data))
                    .catch(() => alert("No se pudo cargar el producto. Revisa el Backend."));
            }
        };
        if (id) fetchProducto();
    }, [id]);

    // --- FUNCIÓN PARA ENVIAR LA RESERVA AL BACKEND ---
    const handleConfirmarReserva = async () => {
        if (!startDate || !endDate) {
            alert("Por favor, selecciona las fechas.");
            return;
        }

        setEnviando(true);

        const reservaData = {
            fechaInicio: startDate.toISOString().split('T')[0],
            fechaFin: endDate.toISOString().split('T')[0],
            producto: { id: parseInt(id) },
            usuario: { id: user?.id }
        };

        try {
            const response = await fetch('http://localhost:8080/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservaData)
            });

            if (response.ok) {
                alert("¡Reserva confirmada con éxito!");
                navigate('/');
            } else {
                const msg = await response.text();
                alert("Error: " + msg);
            }
        } catch (error) {
            alert("Error de conexión con el servidor.");
        } finally {
            setEnviando(false);
        }
    };

    if (!producto) return <div className="reserva-container"><h1>Cargando...</h1></div>;

    return (
        <div className="reserva-container">
            <header className="reserva-header">
                <h1>Confirmá tu reserva</h1>
            </header>

            <div className="reserva-layout">
                <div className="reserva-main">
                    <section className="form-datos-usuario">
                        <h3>Tus datos</h3>
                        <div className="reserva-inputs">
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Nombre</label>
                                <input 
                                    type="text" 
                                    value={user?.nombre || ''} 
                                    disabled 
                                    style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} 
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Apellido</label>
                                <input 
                                    type="text" 
                                    value={user?.apellido || ''} 
                                    disabled 
                                    style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} 
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Email</label>
                                <input 
                                    type="email" 
                                    value={user?.email || ''} 
                                    disabled 
                                    style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} 
                                />
                            </div>
                        </div>
                    </section>

                    <section className="calendario-reserva">
                        <h3>Seleccioná tu fecha de reserva</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={(update) => { const [start, end] = update; setStartDate(start); setEndDate(end); }}
                            startDate={startDate} endDate={endDate}
                            selectsRange inline monthsShown={2} minDate={new Date()}
                        />
                    </section>
                </div>

                <aside className="reserva-resumen">
                    <div className="resumen-card">
                        <h3>Detalle de la reserva</h3>
                        <div className="resumen-img-container">
                            <img
                                src={
                                    producto.imagenUrl ||
                                    (producto.imagenes && producto.imagenes[0]?.urlImage) ||
                                    (producto.imagenes && producto.imagenes[0]?.url) ||
                                    'https://via.placeholder.com/300'
                                }
                                alt={producto.nombre}
                                className="img-resumen"
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    display: 'block'
                                }}
                            />
                        </div>
                        <div className="resumen-info-producto">
                            <span className="resumen-categoria" style={{ color: '#f1c40f' }}>{producto.categoria?.titulo || "Hotel"}</span>
                            <h2 className="resumen-titulo" style={{ color: 'white' }}>{producto.nombre}</h2>
                            <p className="resumen-ubicacion" style={{ color: '#ccc' }}>📍 {producto.ciudad?.nombre || "Ubicación confirmada"}</p>
                        </div>
                        <hr className="divider" />
                        <div className="resumen-info">
                            <p style={{ color: 'white' }}>Check-in <span style={{ color: '#f1c40f' }}>{startDate ? startDate.toLocaleDateString() : "__/__/__"}</span></p>
                            <p style={{ color: 'white' }}>Check-out <span style={{ color: '#f1c40f' }}>{endDate ? endDate.toLocaleDateString() : "__/__/__"}</span></p>
                        </div>
                        <button 
                            className="btn-confirmar-final" 
                            disabled={!startDate || !endDate || enviando}
                            onClick={handleConfirmarReserva}
                        >
                            {enviando ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReservaProducto;