import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MisReservas.css';

const MisReservas = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservas = async () => {
            if (user?.id) {
                try {
                    const res = await axios.get(`http://localhost:8080/api/reservas/usuario/${user.id}`);
                    setReservas(res.data);
                } catch (err) {
                    console.error("Error al cargar historial:", err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchReservas();
    }, [user]);

    if (loading) return <div className="historial-container"><h2 className="loading-text">Cargando tu historial...</h2></div>;

    return (
        <div className="historial-container">
            <header className="historial-header">
                <h1>Mis Reservas</h1>
                <p>Gestiona y revisa tus alojamientos anteriores</p>
            </header>

            {reservas.length === 0 ? (
                <div className="no-reservas">
                    <p>Aún no tienes reservas realizadas. 🏨</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Explorar productos</button>
                </div>
            ) : (
                <div className="reservas-grid">
                    {reservas.map(res => (
                        <div key={res.id} className="reserva-item">
                            <div className="reserva-img-box">
                                <img
                                    src={res.producto?.imagenUrl || res.producto?.imagenes?.[0]?.url || 'https://via.placeholder.com/300'}
                                    alt={res.producto?.nombre}
                                />
                                <span className="reserva-tag">Confirmada</span>
                            </div>

                            <div className="reserva-info-box">
                                <span className="reserva-id-text">ID RESERVA: #{res.id}</span>
                                <h3>{res.producto?.nombre}</h3>
                                <p className="reserva-loc">📍 {res.producto?.ciudad?.nombre || "Ubicación"}</p>

                                <div className="reserva-fechas-grid">
                                    <div>
                                        <label>Check-in</label>
                                        <span>{res.fechaInicio}</span>
                                    </div>
                                    <div>
                                        <label>Check-out</label>
                                        <span>{res.fechaFin}</span>
                                    </div>
                                </div>

                                <button
                                    className="btn-ver-detalle"
                                    onClick={() => navigate(`/producto/${res.producto?.id}`)}
                                >
                                    VER PRODUCTO
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MisReservas;