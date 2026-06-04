package com.digitalhouse.backend.services;

import com.digitalhouse.backend.models.Reserva;
import com.digitalhouse.backend.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private EmailService emailService;

    public List<Reserva> buscarPorUsuarioId(Long id) {
        return reservaRepository.findByUsuarioId(id);
    }

    public List<Reserva> buscarPorProductoId(Long productoId) {
        return reservaRepository.findByProductoId(productoId);
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva guardar(Reserva reserva) {
        if (reserva.getFechaInicio().isAfter(reserva.getFechaFin())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin");
        }

        Reserva reservaGuardada = reservaRepository.save(reserva);

        try {
            emailService.enviarCorreoReserva(reservaGuardada);
            System.out.println("Email de reserva enviado con éxito.");
        } catch (Exception e) {
            System.err.println("Error al enviar el email: " + e.getMessage());
        }

        return reservaGuardada;

    }
}
