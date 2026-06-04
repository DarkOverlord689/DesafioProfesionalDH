import React, { useEffect, useState } from 'react';
import { actualizarRolUsuario, listarUsuarios } from '../services/UsuarioService';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        listarUsuarios()
            .then(setUsuarios)
            .catch((err) => setError(err.message || 'Error cargando usuarios'))
            .finally(() => setCargando(false));
    }, []);

    const toggleRol = async (id, rolActual) => {
        const nuevoRol = rolActual === 'ADMIN' ? 'USER' : 'ADMIN';

        try {
            await actualizarRolUsuario(id, nuevoRol);
            setUsuarios((prev) => prev.map((u) =>
                u.id === id ? { ...u, rol: nuevoRol } : u
            ));
        } catch (err) {
            alert(err.message || 'Error al actualizar el permiso');
        }
    };

    if (cargando) return <p style={{ color: 'white' }}>Cargando usuarios...</p>;
    if (error) return <p style={{ color: 'white' }}>{error}</p>;

    return (
        <div className="gestion-container">
            <h2 className="gestion-title">Gestion de Usuarios</h2>
            <table className="gestion-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Rol Actual</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre} {u.apellido}</td>
                            <td>{u.email}</td>
                            <td>
                                <span className={`badge ${u.rol === 'ADMIN' ? 'admin' : 'user'}`}>
                                    {u.rol}
                                </span>
                            </td>
                            <td>
                                <button
                                    className={`btn-toggle ${u.rol === 'ADMIN' ? 'btn-remove' : 'btn-add'}`}
                                    onClick={() => toggleRol(u.id, u.rol)}
                                >
                                    {u.rol === 'ADMIN' ? 'Quitar Admin' : 'Hacer Admin'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuarios;
