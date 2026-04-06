package com.digitalhouse.backend.controllers;
import com.digitalhouse.backend.models.Reserva;
import com.digitalhouse.backend.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {
    @Autowired
    private ReservaRepository reservaRepository;

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody Reserva reserva) {
        try {
            Reserva nuevaReserva = reservaRepository.save(reserva);
            return new ResponseEntity<>(nuevaReserva, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al crear la reserva: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/producto/{productoId}")
    public List<Reserva> listarPorProducto(@PathVariable Long productoId) {
        return reservaRepository.findByProductoId(productoId);
    }
}
