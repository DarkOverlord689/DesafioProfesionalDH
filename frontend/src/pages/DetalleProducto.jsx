import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompartirModal from '../components/CompartirModal';
import Disponibilidad from '../components/Disponibilidad';
import Politicas from '../components/Politicas';
import Resenas from '../components/Resenas';
import { useAuth } from '../hooks/useAuth';
import { obtenerProducto } from '../services/ProductoService';
import './DetalleProducto.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);
    const [showShare, setShowShare] = useState(false);

    useEffect(() => {
        obtenerProducto(id)
            .then(setProducto)
            .catch((err) => {
                console.error('Error al cargar el producto', err);
                setError(true);
            });
    }, [id]);

    const handleReservaClick = () => {
        if (!user) {
            navigate('/login', {
                state: {
                    mensaje: 'Para realizar una reserva, debes iniciar sesion primero. Si no tienes cuenta, por favor registrate.'
                }
            });
            return;
        }

        navigate(`/producto/${id}/reserva`);
    };

    if (error) return <div className="error-msg">Error: No se encontro el producto {id}</div>;
    if (!producto) return <div className="loading-msg">Cargando datos...</div>;

    return (
        <div className="detalle-container">
            <header className="detalle-header">
                <div className="header-info">
                    <div className="categoria-share-row">
                        <p className="categoria-txt">{producto.categoria?.titulo || 'Alojamiento'}</p>

                        <button className="btn-share-trigger" onClick={() => setShowShare(true)}>
                            <i className="fas fa-share-alt"></i> Compartir
                        </button>
                    </div>
                    <h1>{producto.nombre}</h1>
                </div>
                <button className="btn-volver" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </header>

            <section className="galeria-seccion">
                <div className="foto-principal">
                    <img src={producto.imagenUrl} alt={producto.nombre} />
                </div>
                <div className="fotos-secundarias">
                    <img src={producto.imagenUrl} alt={`${producto.nombre} vista 2`} />
                    <img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" alt="Vista 3" />
                    <img src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" alt="Vista 4" />
                    <div className="foto-con-overlay">
                        <img src="https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg" alt="Vista 5" />
                        <span className="ver-mas-txt">Ver mas</span>
                    </div>
                </div>
            </section>

            <section className="detalle-body">
                <div className="descripcion-col">
                    <h2>Descripcion del alojamiento</h2>
                    <p className="descripcion-txt">{producto.descripcion}</p>
                </div>

                <div className="reserva-card-detalle">
                    <p className="reserva-prompt">Agrega tus fechas de viaje para obtener precios exactos</p>
                    <button onClick={handleReservaClick} className="btn-reserva-start">
                        Iniciar reserva
                    </button>
                </div>
            </section>

            {producto.caracteristicas && producto.caracteristicas.length > 0 && (
                <section className="caracteristicas-seccion">
                    <h2 className="titulo-caracteristicas">Que ofrece este lugar?</h2>
                    <hr className="separador-dorado" />
                    <div className="caracteristicas-grid-final">
                        {producto.caracteristicas.map((car) => (
                            <div key={car.id} className="caracteristica-item-card">
                                <i className={`fas ${car.icono} icon-estilo`}></i>
                                <span className="char-name">{car.nombre}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Disponibilidad fechasReservadas={[new Date(2024, 10, 20), new Date(2024, 10, 21)]} />
            <Resenas key={producto.id} productoId={producto.id} />
            <Politicas />

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
