package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.models.Reserva;
import com.digitalhouse.backend.services.ReservaService;
import com.digitalhouse.backend.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ReservaRepository reservaRepository;

    // Listar por producto
    @GetMapping("/producto/{productoId}")
    public List<Reserva> listarPorProducto(@PathVariable Long productoId) {
        return reservaRepository.findByProductoId(productoId);
    }

    // Listar por usuario (Para el historial HU #33)
    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Reserva>> listarPorUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.buscarPorUsuarioId(id));
    }

    // Crear reserva (HU #32)
    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.guardar(reserva));
    }

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }
}