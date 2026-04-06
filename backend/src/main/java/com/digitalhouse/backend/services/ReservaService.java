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

    public List<Reserva> buscarPorUsuarioId(Long id) {
        return reservaRepository.findByUsuarioId(id);
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva guardar(Reserva reserva) {
        return reservaRepository.save(reserva);
    }
}