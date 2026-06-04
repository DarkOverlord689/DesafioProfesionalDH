import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/UsuarioService';
import './Registro.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmarPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const nextErrors = {};
        if (!formData.nombre.trim()) nextErrors.nombre = 'Ingresa tu nombre.';
        if (!formData.apellido.trim()) nextErrors.apellido = 'Ingresa tu apellido.';
        if (!formData.email.trim()) nextErrors.email = 'Ingresa tu email.';
        else if (!emailRegex.test(formData.email)) nextErrors.email = 'Ingresa un email valido.';
        if (formData.password.length < 6) nextErrors.password = 'La password debe tener al menos 6 caracteres.';
        if (formData.confirmarPassword !== formData.password) {
            nextErrors.confirmarPassword = 'Las passwords no coinciden.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        if (!validate()) return;

        try {
            setLoading(true);
            const datosAEnviar = { ...formData };
            delete datosAEnviar.confirmarPassword;
            await registrarUsuario(datosAEnviar);
            setMensaje('Registro exitoso. Ya puedes iniciar sesion.');
            setFormData({ nombre: '', apellido: '', email: '', password: '', confirmarPassword: '' });
            setTimeout(() => navigate('/login'), 1200);
        } catch (error) {
            setMensaje(error.message || 'Error al registrar: revisa los datos ingresados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit} className="registro-form" noValidate>
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} aria-invalid={Boolean(errors.nombre)} />
                {errors.nombre && <small className="field-error">{errors.nombre}</small>}

                <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} aria-invalid={Boolean(errors.apellido)} />
                {errors.apellido && <small className="field-error">{errors.apellido}</small>}

                <input type="email" name="email" placeholder="Correo Electronico" value={formData.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
                {errors.email && <small className="field-error">{errors.email}</small>}

                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} aria-invalid={Boolean(errors.password)} />
                {errors.password && <small className="field-error">{errors.password}</small>}

                <input type="password" name="confirmarPassword" placeholder="Confirmar Password" value={formData.confirmarPassword} onChange={handleChange} aria-invalid={Boolean(errors.confirmarPassword)} />
                {errors.confirmarPassword && <small className="field-error">{errors.confirmarPassword}</small>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            {mensaje && <p className="mensaje-alerta">{mensaje}</p>}
        </div>
    );
};

export default Registro;
