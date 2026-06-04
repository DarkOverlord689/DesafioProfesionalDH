package com.digitalhouse.backend.services;

import com.digitalhouse.backend.models.Categoria;
import com.digitalhouse.backend.repositories.CategoriaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria crear(Categoria categoria) {
        categoria.setTitulo(categoria.getTitulo().trim());
        categoria.setDescripcion(categoria.getDescripcion().trim());
        categoria.setImagenUrl(categoria.getImagenUrl().trim());
        return categoriaRepository.save(categoria);
    }

    public void eliminar(Long id) {
        categoriaRepository.deleteById(id);
    }
}
