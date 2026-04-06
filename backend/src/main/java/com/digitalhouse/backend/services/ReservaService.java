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

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva guardar(Reserva reserva) {
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