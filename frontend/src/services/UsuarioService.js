const API_URL = 'http://localhost:8080/api/usuarios';

export const registrarUsuario = async (datosUsuario) => {
    try {
        const response = await fetch(`${API_URL}/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario),
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        return await response.json();
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        throw error;
    }
};