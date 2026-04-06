import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Politicas from '../components/Politicas';
import Disponibilidad from '../components/Disponibilidad';
import { useAuth } from '../context/AuthContext';
import './DetalleProducto.css';
import CompartirModal from '../components/CompartirModal';

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [showShare, setShowShare] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/productos/detalle/${id}`)
            .then(res => setProducto(res.data))
            .catch(err => {
                console.error("Error al cargar el producto", err);
                setError(true);
            });
    }, [id]);

    const handleReservaClick = () => {
        if (!user) {
            // Si no está logueado, mandamos al login con el mensaje requerido
            navigate('/login', {
                state: {
                    mensaje: "Para realizar una reserva, debes iniciar sesión primero. Si no tienes cuenta, por favor regístrate."
                }
            });
        } else {
            // Si está logueado, vamos a la nueva página de reserva
            navigate(`/producto/${id}/reserva`);
        }
    };

    if (error) return <div className="error-msg">Error: No se encontró el producto {id}</div>;
    if (!producto) return <div className="loading-msg">Cargando datos...</div>;

    return (
        <div className="detalle-container">
            {/* ENCABEZADO ACTUALIZADO HU #27 */}
            <header className="detalle-header">
                <div className="header-info">
                    <div className="categoria-share-row">
                        <p className="categoria-txt">{producto.categoria?.nombre || "Alojamiento"}</p>

                        {/* Botón Compartir HU #27 */}
                        <button className="btn-share-trigger" onClick={() => setShowShare(true)}>
                            <i className="fas fa-share-alt"></i> Compartir
                        </button>
                    </div>
                    <h1>{producto.nombre}</h1>
                </div>
                <button className="btn-volver" onClick={() => navigate(-1)}>
                    ❮ Volver
                </button>
            </header>

            {/* GALERÍA */}
            <section className="galeria-seccion">
                <div className="foto-principal">
                    <img src={producto.imagenUrl} alt="Principal" />
                </div>
                <div className="fotos-secundarias">
                    <img src={producto.imagenUrl} alt="Vista 2" />
                    <img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" alt="Vista 3" />
                    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" alt="Vista 4" />
                    <div className="foto-con-overlay">
                        <img src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg" alt="Vista 5" />
                        <span className="ver-mas-txt">Ver más</span>
                    </div>
                </div>
            </section>

            {/* CUERPO Y DESCRIPCIÓN */}
            <section className="detalle-body">
                <div className="descripcion-col">
                    <h2>Descripción del alojamiento</h2>
                    <p className="descripcion-txt">{producto.descripcion}</p>
                </div>

                {/* --- NUEVO: BLOQUE DE ACCESO A RESERVA (HU #30) --- */}
                <div className="reserva-card-detalle">
                    <p className="reserva-prompt">Agregá tus fechas de viaje para obtener precios exactos</p>
                    <button onClick={handleReservaClick} className="btn-reserva-start">
                        Iniciar reserva
                    </button>
                </div>
            </section>

            {/* CARACTERÍSTICAS */}
            {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                <section className="caracteristicas-seccion">
                    <h2 className="titulo-caracteristicas">¿Qué ofrece este lugar?</h2>
                    <hr className="separador-dorado" />
                    <div className="caracteristicas-grid-final">
                        {producto.caracteristicas.map(car => (
                            <div key={car.id} className="caracteristica-item-card">
                                <i className={`fas ${car.icono} icon-estilo`}></i>
                                <span className="char-name">{car.nombre}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {/* HU #23: Calendario de Disponibilidad */}
            <Disponibilidad fechasReservadas={[new Date(2024, 10, 20), new Date(2024, 10, 21)]} />
            {/* --- POLÍTICAS (HU #26) --- */}
            <Politicas />
            {/* MODAL DE COMPARTIR HU #27 */}
            {showShare && (
                <CompartirModal
                    producto={producto}
                    onClose={() => setShowShare(false)}
                />
            )}
        </div>
    );
};

export default DetalleProducto;