import React, { useState } from 'react';
import './CompartirModal.css';

const CompartirModal = ({ producto, onClose }) => {
    const [mensaje, setMensaje] = useState(`¡Mira este alojamiento increíble: ${producto.nombre}!`);
    const urlProducto = window.location.href;

    // URLs de Redes Sociales (HU #27: Integración y Redirección)
    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlProducto)}&quote=${encodeURIComponent(mensaje)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(mensaje)}&url=${encodeURIComponent(urlProducto)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje + " " + urlProducto)}`,
    };

    const copiarEnlace = () => {
        navigator.clipboard.writeText(urlProducto);
        alert("¡Enlace copiado al portapapeles!");
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✕</button>

                <h2>Compartir Producto</h2>

                <div className="modal-body">
                    {/* Contenido para Compartir (HU #27) */}
                    <img src={producto.imagenUrl} alt={producto.nombre} className="share-img" />
                    <h3>{producto.nombre}</h3>
                    <p className="share-desc">{producto.descripcion.substring(0, 100)}...</p>

                    {/* Personalización (HU #27) */}
                    <label>Mensaje personalizado:</label>
                    <textarea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Escribe algo sobre este lugar..."
                    />

                    <div className="social-options">
                        <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="social-icon fb">Facebook</a>
                        <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="social-icon tw">Twitter / X</a>
                        <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="social-icon wa">WhatsApp</a>
                        <button onClick={copiarEnlace} className="social-icon copy">Copiar Enlace</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompartirModal;