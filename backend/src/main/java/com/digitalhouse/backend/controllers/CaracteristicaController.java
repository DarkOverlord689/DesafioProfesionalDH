package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.models.Caracteristica;
import com.digitalhouse.backend.services.CaracteristicaService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/caracteristicas")
@CrossOrigin(origins = "http://localhost:5173")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping
    public List<Caracteristica> listarTodas() {
        return caracteristicaService.listarTodas();
    }

    @PostMapping
    public Caracteristica crear(@Valid @RequestBody Caracteristica caracteristica) {
        return caracteristicaService.crear(caracteristica);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        caracteristicaService.eliminar(id);
    }
}
