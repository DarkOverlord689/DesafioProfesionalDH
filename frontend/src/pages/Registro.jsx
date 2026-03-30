import React, { useState } from 'react';
import { registrarUsuario } from '../services/UsuarioService';
import './Registro.css';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: ''
    });

    const [mensaje, setMensaje] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica de contraseñas
        if (formData.password !== formData.confirmarPassword) {
            setMensaje("Las contraseñas no coinciden");
            return;
        }

        try {
            // Quitamos confirmarPassword antes de enviar al backend
            const { confirmarPassword, ...datosAEnviar } = formData;

            const resultado = await registrarUsuario(datosAEnviar);
            console.log("Registro exitoso:", resultado);
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                confirmarPassword: ''
            });
            setTimeout(() => {
                navigate('/'); 
            }, 3000);

        } catch (error) {
            setMensaje("Error al registrar: el email ya existe o el servidor falló.");
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} className="registro-form">
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
                <input type="password" name="confirmarPassword" placeholder="Confirmar Contraseña" onChange={handleChange} required />

                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p className="mensaje-alerta">{mensaje}</p>}
        </div>
    );
};

export default Registro;