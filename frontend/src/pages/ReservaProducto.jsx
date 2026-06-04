import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { obtenerProducto } from '../services/ProductoService';
import { crearReserva } from '../services/ReservaService';
import './ReservaProducto.css';

const ReservaProducto = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        obtenerProducto(id)
            .then(setProducto)
            .catch(() => setError('No se pudo cargar el producto.'));
    }, [id]);

    const handleConfirmarReserva = async () => {
        setError('');

        if (!startDate || !endDate) {
            setError('Selecciona fecha de inicio y fin.');
            return;
        }

        if (startDate > endDate) {
            setError('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        setEnviando(true);

        const reservaData = {
            fechaInicio: startDate.toISOString().split('T')[0],
            fechaFin: endDate.toISOString().split('T')[0],
            producto: { id: Number(id) },
            usuario: { id: user?.id }
        };

        try {
            await crearReserva(reservaData);
            alert('Reserva confirmada con exito!');
            navigate('/mis-reservas');
        } catch (err) {
            setError(err.message || 'Error de conexion con el servidor.');
        } finally {
            setEnviando(false);
        }
    };

    if (!producto && !error) return <div className="reserva-container"><h1>Cargando...</h1></div>;
    if (error && !producto) return <div className="reserva-container"><h1>{error}</h1></div>;

    return (
        <div className="reserva-container">
            <header className="reserva-header">
                <h1>Confirma tu reserva</h1>
            </header>

            <div className="reserva-layout">
                <div className="reserva-main">
                    <section className="form-datos-usuario">
                        <h3>Tus datos</h3>
                        <div className="reserva-inputs">
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Nombre</label>
                                <input type="text" value={user?.nombre || ''} disabled style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Apellido</label>
                                <input type="text" value={user?.apellido || ''} disabled style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} />
                            </div>
                            <div className="input-group">
                                <label style={{ color: '#f1c40f' }}>Email</label>
                                <input type="email" value={user?.email || ''} disabled style={{ color: 'white', opacity: 1, WebkitTextFillColor: 'white' }} />
                            </div>
                        </div>
                    </section>

                    <section className="calendario-reserva">
                        <h3>Selecciona tu fecha de reserva</h3>
                        <DatePicker
                            selected={startDate}
                            onChange={(update) => {
                                const [start, end] = update;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            monthsShown={2}
                            minDate={new Date()}
                        />
                    </section>
                </div>

                <aside className="reserva-resumen">
                    <div className="resumen-card">
                        <h3>Detalle de la reserva</h3>
                        <div className="resumen-img-container">
                            <img
                                src={producto.imagenUrl || 'https://via.placeholder.com/300'}
                                alt={producto.nombre}
                                className="img-resumen"
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    display: 'block'
                                }}
                            />
                        </div>
                        <div className="resumen-info-producto">
                            <span className="resumen-categoria" style={{ color: '#f1c40f' }}>{producto.categoria?.titulo || 'Hotel'}</span>
                            <h2 className="resumen-titulo" style={{ color: 'white' }}>{producto.nombre}</h2>
                            <p className="resumen-ubicacion" style={{ color: '#ccc' }}>{producto.ciudad?.nombre || 'Ubicacion confirmada'}</p>
                        </div>
                        <hr className="divider" />
                        <div className="resumen-info">
                            <p style={{ color: 'white' }}>Check-in <span style={{ color: '#f1c40f' }}>{startDate ? startDate.toLocaleDateString() : '__/__/__'}</span></p>
                            <p style={{ color: 'white' }}>Check-out <span style={{ color: '#f1c40f' }}>{endDate ? endDate.toLocaleDateString() : '__/__/__'}</span></p>
                        </div>
                        {error && <p className="mensaje-alerta">{error}</p>}
                        <button
                            className="btn-confirmar-final"
                            disabled={!startDate || !endDate || enviando}
                            onClick={handleConfirmarReserva}
                        >
                            {enviando ? 'PROCESANDO...' : 'CONFIRMAR RESERVA'}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReservaProducto;
