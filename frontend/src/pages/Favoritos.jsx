import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { listarProductos } from '../services/ProductoService';
import './Favoritos.css';

const Favoritos = () => {
    const { user } = useAuth();
    const favoritosKey = user ? `favoritos-${user.id}` : 'favoritos-anonimos';
    const [misFavoritos, setMisFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const savedIds = JSON.parse(localStorage.getItem(favoritosKey)) || [];
                const data = await listarProductos();
                setMisFavoritos(data.filter((p) => savedIds.includes(p.id)));
            } catch (err) {
                console.error('Error cargando favoritos:', err);
                setError('No se pudieron cargar tus favoritos.');
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchFavoritos();
    }, [favoritosKey, user]);

    const eliminarFavorito = (id) => {
        const saved = JSON.parse(localStorage.getItem(favoritosKey)) || [];
        const nuevaListaIds = saved.filter((favId) => favId !== id);
        localStorage.setItem(favoritosKey, JSON.stringify(nuevaListaIds));
        setMisFavoritos((prev) => prev.filter((p) => p.id !== id));
    };

    if (!user) return <div className="fav-info">Inicia sesion para ver tus favoritos.</div>;
    if (loading) return <div className="fav-info">Cargando tus favoritos...</div>;
    if (error) return <div className="fav-info">{error}</div>;

    return (
        <div className="favoritos-container">
            <header className="fav-header">
                <h1>Mis Favoritos</h1>
                <Link to="/" className="btn-volver">Volver a explorar</Link>
            </header>

            {misFavoritos.length === 0 ? (
                <div className="no-favs">
                    <p>Aun no tienes productos favoritos.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {misFavoritos.map((p) => (
                        <div key={p.id} className="product-card">
                            <div className="img-container">
                                <img src={p.imagenUrl} alt={p.nombre} />
                                <button
                                    className="fav-btn es-favorito"
                                    onClick={() => eliminarFavorito(p.id)}
                                    title="Eliminar de favoritos"
                                >
                                    Favorito
                                </button>
                            </div>
                            <div className="product-info">
                                <h3>{p.nombre}</h3>
                                <p className="category-tag-fav">{p.categoria?.titulo || 'Alojamiento'}</p>
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
