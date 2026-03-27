package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.models.Producto;
import com.digitalhouse.backend.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // Listar todos (Historia #10)
    @GetMapping
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    // Registrar producto (Historia #3 - Validación nombre duplicado)
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Producto producto) {
        // 1. Limpiamos espacios
        String nombreNuevo = producto.getNombre().trim();

        // 2. Traemos TODO de la base para comparar (Forzamos lectura fresca)
        List<Producto> todos = productoRepository.findAll();

        boolean existe = todos.stream()
                .anyMatch(p -> p.getNombre().trim().equalsIgnoreCase(nombreNuevo));

        System.out.println("¿Existe el producto " + nombreNuevo + "? " + existe); // Esto saldrá en tu consola de Java

        if (existe) {
            return ResponseEntity.badRequest().body("Error: El nombre ya existe.");
        }

        return ResponseEntity.ok(productoRepository.save(producto));
    }

    // Eliminar producto (Historia #11 - Acción real en DB)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}