package com.digitalhouse.backend.repositories;
import com.digitalhouse.backend.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{
    
}
