package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.models.Reserva;
import com.digitalhouse.backend.services.ReservaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/producto/{productoId}")
    public List<Reserva> listarPorProducto(@PathVariable Long productoId) {
        return reservaService.buscarPorProductoId(productoId);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<Reserva>> listarPorUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.buscarPorUsuarioId(id));
    }

    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@Valid @RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.guardar(reserva));
    }

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }
}
