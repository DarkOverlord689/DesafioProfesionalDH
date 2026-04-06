import React from 'react';
import './WhatsappButton.css';

const WhatsappButton = () => {
    const phone = "51982232353"; 
    const message = "Hola! Tengo una consulta sobre una reserva en DARKSISHOP.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const handleChat = () => {
        window.open(url, '_blank');
    };

    return (
        <div className="whatsapp-float" onClick={handleChat} title="Chatea con nosotros">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                alt="WhatsApp" 
            />
        </div>
    );
};

export default WhatsappButton;