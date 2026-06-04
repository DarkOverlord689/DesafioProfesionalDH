import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginUsuario } from '../services/UsuarioService';
import './Login.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const mensajeAlerta = location.state?.mensaje;

    const validate = () => {
        const nextErrors = {};
        if (!credentials.email.trim()) nextErrors.email = 'Ingresa tu email.';
        else if (!emailRegex.test(credentials.email)) nextErrors.email = 'Ingresa un email valido.';
        if (!credentials.password) nextErrors.password = 'Ingresa tu password.';

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (!validate()) return;

        try {
            setLoading(true);
            const authData = await loginUsuario(credentials);
            login(authData);
            const pathPrevio = location.state?.from || '/';
            navigate(pathPrevio);
        } catch (err) {
            setServerError(err.message || 'Credenciales incorrectas. Verifica tu email y password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                {mensajeAlerta && (
                    <div className="alerta-reserva-login">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p>{mensajeAlerta}</p>
                    </div>
                )}
                <h2 className="login-title">Iniciar Sesion</h2>
                <p className="login-subtitle">Accede a tus reservas y beneficios exclusivos</p>

                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electronico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="ejemplo@mail.com"
                            value={credentials.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <small className="field-error">{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            value={credentials.password}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.password)}
                        />
                        {errors.password && <small className="field-error">{errors.password}</small>}
                    </div>

                    {serverError && <div className="error-box">{serverError}</div>}

                    <button type="submit" className="btn-login-submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="footer-text">
                    Aun no tienes cuenta? <Link to="/registro" className="gold-link">Registrate aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
