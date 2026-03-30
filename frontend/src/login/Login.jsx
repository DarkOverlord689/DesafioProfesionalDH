import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const userData = await response.json();
                login(userData); // Guarda en Context y LocalStorage
                navigate('/'); // Redirige al Home
            } else {
                // Captura el error del backend (HU #14: mensaje claro)
                const msg = await response.text();
                setError(msg || 'Credenciales incorrectas. Verifica tu email y contraseña.');
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Intenta más tarde.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h2 className="login-title">Iniciar Sesión</h2>
                <p className="login-subtitle">Accede a tus reservas y beneficios exclusivos</p>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="ejemplo@mail.com"
                            value={credentials.email}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            placeholder="********"
                            value={credentials.password}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    {error && <div className="error-box">{error}</div>}

                    <button type="submit" className="btn-login-submit">Ingresar</button>
                </form>

                <p className="footer-text">
                    ¿Aún no tienes cuenta? <Link to="/registro" className="gold-link">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;