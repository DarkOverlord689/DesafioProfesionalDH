import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Resenas.css';

const Resenas = ({ productoId }) => {
    const { user } = useAuth();
    const storageKey = `resenas-${productoId}`;
    const [listaResenas, setListaResenas] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });
    const [puntuacion, setPuntuacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [hover, setHover] = useState(0);
    const [error, setError] = useState('');

    const handlePublicar = (e) => {
        e.preventDefault();
        setError('');

        if (puntuacion === 0) {
            setError('Selecciona una puntuacion de 1 a 5 estrellas.');
            return;
        }

        if (comentario.trim().length < 10) {
            setError('Escribe una resena de al menos 10 caracteres.');
            return;
        }

        const nuevaResena = {
            id: Date.now(),
            usuario: `${user.nombre} ${user.apellido}`,
            puntuacion,
            comentario: comentario.trim(),
            fecha: new Date().toLocaleDateString()
        };

        const nextResenas = [nuevaResena, ...listaResenas];
        localStorage.setItem(storageKey, JSON.stringify(nextResenas));
        setListaResenas(nextResenas);
        setPuntuacion(0);
        setComentario('');
    };

    const promedio = listaResenas.length > 0
        ? (listaResenas.reduce((acc, curr) => acc + curr.puntuacion, 0) / listaResenas.length).toFixed(1)
        : '0.0';

    return (
        <section className="resenas-bloque" id="valoraciones">
            <div className="resenas-header-info">
                <div className="promedio-display">
                    <span className="puntos-grandes">{promedio}</span>
                    <div className="stars-display">
                        {'*'.repeat(Math.round(Number(promedio)))}{'.'.repeat(5 - Math.round(Number(promedio)))}
                    </div>
                    <p>{listaResenas.length} valoraciones</p>
                </div>
                <h2>Valoraciones del alojamiento</h2>
            </div>

            {user ? (
                <form className="form-nueva-resena" onSubmit={handlePublicar} noValidate>
                    <h3>Como calificarias este lugar?</h3>
                    <div className="stars-selector" aria-label="Seleccionar puntuacion">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                type="button"
                                className={`star-icon ${num <= (hover || puntuacion) ? 'active' : ''}`}
                                onClick={() => setPuntuacion(num)}
                                onMouseEnter={() => setHover(num)}
                                onMouseLeave={() => setHover(0)}
                                aria-label={`${num} estrellas`}
                            >
                                *
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Escribe aqui tu resena detallada..."
                    />
                    {error && <small className="field-error">{error}</small>}
                    <button type="submit" className="btn-primary">Enviar valoracion</button>
                </form>
            ) : (
                <div className="aviso-login">Inicia sesion para dejar una valoracion.</div>
            )}

            <div className="feed-resenas">
                {listaResenas.map((r) => (
                    <div key={r.id} className="card-resena">
                        <div className="r-meta">
                            <strong>{r.usuario}</strong>
                            <span>{r.fecha}</span>
                        </div>
                        <div className="r-stars">{'*'.repeat(r.puntuacion)}</div>
                        <p>{r.comentario}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Resenas;
