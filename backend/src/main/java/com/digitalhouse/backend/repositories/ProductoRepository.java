package com.digitalhouse.backend.repositories;

import com.digitalhouse.backend.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // HU #3: Para validar si ya existe un hotel con ese nombre antes de guardar
    Optional<Producto> findByNombre(String nombre);

    // HU #4: Para que al hacer clic en "Hoteles" o "Cabañas" traiga solo esos
    List<Producto> findByCategoriaIgnoreCase(String categoria);

    // HU #8: El buscador. El "Containing" hace que busque coincidencias parciales 
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    @Query(value = "SELECT * FROM productos ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Producto> findRandomProductos();
}