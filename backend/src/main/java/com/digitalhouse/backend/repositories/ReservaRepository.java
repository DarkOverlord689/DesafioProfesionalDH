package com.digitalhouse.backend.repositories;

import com.digitalhouse.backend.models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Esto nos servirá luego para mostrar las reservas de un usuario específico
    List<Reserva> findByUsuarioId(Long usuarioId);

    // Esto servirá para bloquear fechas ya reservadas de un producto
    List<Reserva> findByProductoId(Long productoId);
}
