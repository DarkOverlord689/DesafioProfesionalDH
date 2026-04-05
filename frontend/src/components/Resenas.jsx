import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Resenas.css';

const Resenas = ({ productoId, resenasIniciales = [] }) => {
    const { user } = useAuth();
    const [listaResenas, setListaResenas] = useState(resenasIniciales);
    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, setComentario] = useState("");
    const [hover, setHover] = useState(0);

    const handlePublicar = (e) => {
        e.preventDefault();
        if (puntuacion === 0) return alert("Selecciona una puntuación de 1 a 5 estrellas.");

        const nuevaResena = {
            id: Date.now(),
            usuario: `${user.nombre} ${user.apellido}`,
            puntuacion: puntuacion,
            comentario: comentario,
            fecha: new Date().toLocaleDateString()
        };

        setListaResenas([nuevaResena, ...listaResenas]);
        setPuntuacion(0);
        setComentario("");
    };

    // Puntuación Media Dinámica (Criterio #6)
    const promedio = listaResenas.length > 0
        ? (listaResenas.reduce((acc, curr) => acc + curr.puntuacion, 0) / listaResenas.length).toFixed(1)
        : 0;

    return (
        <section className="resenas-bloque">
            <div className="resenas-header-info">
                <div className="promedio-display">
                    <span className="puntos-grandes">{promedio}</span>
                    <div className="stars-display">
                        {"★".repeat(Math.round(promedio))}{"☆".repeat(5 - Math.round(promedio))}
                    </div>
                    <p>{listaResenas.length} valoraciones</p>
                </div>
                <h2>Opiniones de otros huéspedes</h2>
            </div>

            {user ? (
                <form className="form-nueva-resena" onSubmit={handlePublicar}>
                    <h3>¿Qué te pareció este lugar?</h3>
                    <div className="stars-selector">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <span
                                key={num}
                                className={`star-icon ${num <= (hover || puntuacion) ? 'active' : ''}`}
                                onClick={() => setPuntuacion(num)}
                                onMouseEnter={() => setHover(num)}
                                onMouseLeave={() => setHover(0)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe aquí tu reseña detallada..."
                        required
                    />
                    <button type="submit" className="btn-primary">Enviar valoración</button>
                </form>
            ) : (
                <div className="aviso-login">Inicia sesión para dejar una reseña.</div>
            )}

            <div className="feed-resenas">
                {listaResenas.map(r => (
                    <div key={r.id} className="card-resena">
                        <div className="r-meta">
                            <strong>{r.usuario}</strong>
                            <span>{r.fecha}</span>
                        </div>
                        <div className="r-stars">{"★".repeat(r.puntuacion)}</div>
                        <p>{r.comentario}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Resenas;