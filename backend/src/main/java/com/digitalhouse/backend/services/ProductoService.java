package com.digitalhouse.backend.services;

import com.digitalhouse.backend.exceptions.RecursoNoEncontradoException;
import com.digitalhouse.backend.models.Producto;
import com.digitalhouse.backend.repositories.ProductoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    public Producto crear(Producto producto) {
        String nombreNuevo = producto.getNombre().trim();
        productoRepository.findByNombreIgnoreCase(nombreNuevo).ifPresent(p -> {
            throw new IllegalArgumentException("El nombre del producto ya existe");
        });

        producto.setNombre(nombreNuevo);
        return productoRepository.save(producto);
    }

    public void eliminar(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }

    public List<Producto> filtrarPorCategoria(String categoria) {
        return productoRepository.findByCategoria_TituloIgnoreCase(categoria);
    }

    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Producto no encontrado"));
    }
}
