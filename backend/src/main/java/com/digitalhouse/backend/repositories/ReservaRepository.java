package com.digitalhouse.backend.repositories;

import com.digitalhouse.backend.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Busca reservas por el ID del usuario vinculado
    List<Reserva> findByUsuarioId(Long usuarioId);
    
    List<Reserva> findByProductoId(Long productoId);
}