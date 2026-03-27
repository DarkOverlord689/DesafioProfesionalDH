import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DetalleProducto.css'; // <--- Esto es lo que une el diseño

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/productos/detalle/${id}`)
            .then(res => setProducto(res.data))
            .catch(err => {
                console.error("Error al cargar el producto", err);
                setError(true);
            });
    }, [id]);

    if (error) return <div className="error-msg">Error: No se encontró el producto {id}</div>;
    if (!producto) return <div className="loading-msg">Cargando datos...</div>;

    return (
        <div className="detalle-container">
            {/* ENCABEZADO */}
            <header className="detalle-header">
                <div className="header-info">
                    <p className="categoria-txt">{producto.categoria?.nombre || "Alojamiento"}</p>
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

            {/* CUERPO */}
            <section className="detalle-body">
                <h2>Descripción del alojamiento</h2>
                <p className="descripcion-txt">{producto.descripcion}</p>
            </section>
        </div>
    );
};

export default DetalleProducto;