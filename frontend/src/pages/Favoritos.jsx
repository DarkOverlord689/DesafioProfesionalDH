import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Favoritos.css';

const Favoritos = () => { // Quitamos la prop porque los cargaremos aquí
    const { user } = useAuth();
    const [misFavoritos, setMisFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const savedIds = JSON.parse(localStorage.getItem("favoritos")) || [];

                const response = await fetch("http://localhost:8080/productos");
                const data = await response.json();

                // Filtramos los que coinciden con los IDs guardados
                const filtrados = data.filter(p => savedIds.includes(p.id));
                setMisFavoritos(filtrados);
            } catch (error) {
                console.error("Error cargando favoritos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchFavoritos();
        }
    }, [user]);

    const eliminarFavorito = (id) => {
        const saved = JSON.parse(localStorage.getItem("favoritos")) || [];
        const nuevaListaIds = saved.filter(favId => favId !== id);
        localStorage.setItem("favoritos", JSON.stringify(nuevaListaIds));

        setMisFavoritos(prev => prev.filter(p => p.id !== id));
    };

    if (!user) return <div className="fav-info">Inicia sesión para ver tus favoritos.</div>;
    if (loading) return <div className="fav-info">Cargando tus favoritos...</div>;

    return (
        <div className="favoritos-container">
            <header className="fav-header">
                <h1>Mis Favoritos</h1>
                <Link to="/" className="btn-volver">❮ Volver a explorar</Link>
            </header>

            {misFavoritos.length === 0 ? (
                <div className="no-favs">
                    <p>Aún no tienes productos favoritos. ❤️</p>
                </div>
            ) : (
                <div className="product-grid">
                    {misFavoritos.map(p => (
                        <div key={p.id} className="product-card">
                            <div className="img-container">
                                <img src={p.imagenUrl} alt={p.nombre} />
                                <button
                                    className="fav-btn es-favorito"
                                    onClick={() => eliminarFavorito(p.id)}
                                    title="Eliminar de favoritos"
                                >
                                    ❤️
                                </button>
                            </div>
                            <div className="product-info">
                                <h3>{p.nombre}</h3>
                                <p className="category-tag-fav">{p.categoria?.nombre || "Alojamiento"}</p>
                                <div className="fav-actions">
                                    <Link to={`/producto/${p.id}`} className="btn-detail">Ver detalle</Link>
                                    <button className="btn-remove" onClick={() => eliminarFavorito(p.id)}>
                                        Quitar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favoritos;