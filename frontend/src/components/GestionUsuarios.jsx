import React, { useEffect, useState } from 'react';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 1. Obtener todos los usuarios al cargar el componente
    useEffect(() => {
        fetch('http://localhost:8080/api/usuarios')
            .then(res => {
                if (!res.ok) throw new Error("Error en la respuesta del servidor");
                return res.json();
            })
            .then(data => {
                setUsuarios(data);
                setCargando(false);
            })
            .catch(err => {
                console.error("Error cargando usuarios:", err);
                setCargando(false); // <--- ESTO ES LO QUE TE FALTA
            });
    }, []);

    // 2. Función para alternar el Rol (La lógica de la HU #16)
    const toggleRol = async (id, rolActual) => {
        const nuevoRol = rolActual === 'ADMIN' ? 'USER' : 'ADMIN';

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${id}/rol`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoRol) // Enviamos solo el string como espera tu backend
            });

            if (response.ok) {
                // Actualizamos el estado local para que la tabla cambie visualmente
                setUsuarios(usuarios.map(u =>
                    u.id === id ? { ...u, rol: nuevoRol } : u
                ));
            }
        } catch (error) {
            alert("Error al actualizar el permiso");
        }
    };

    if (cargando) return <p style={{ color: 'white' }}>Cargando usuarios...</p>;

    return (
        <div className="gestion-container">
            <h2 className="gestion-title">Gestión de Usuarios</h2>
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
                    {usuarios.map(u => (
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