package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.models.Caracteristica;
import com.digitalhouse.backend.repositories.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristicas")
@CrossOrigin(origins = "http://localhost:5173") //puerto de react
public class CaracteristicaController {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @GetMapping
    public List<Caracteristica> listarTodas() {
        return caracteristicaRepository.findAll();
    }

    @PostMapping
    public Caracteristica crear(@RequestBody Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }
    
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        caracteristicaRepository.deleteById(id);
    }
}