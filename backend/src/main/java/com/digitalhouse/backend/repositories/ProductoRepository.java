package com.digitalhouse.backend.repositories;

import com.digitalhouse.backend.models.Producto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findByNombreIgnoreCase(String nombre);
    List<Producto> findByCategoria_TituloIgnoreCase(String categoria);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    @Query(value = "SELECT * FROM productos ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> findRandomProductos();
}
