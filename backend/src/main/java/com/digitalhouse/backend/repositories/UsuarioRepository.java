package com.digitalhouse.backend.repositories;

import com.digitalhouse.backend.models.Usuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE Usuario u SET u.rol = :nuevoRol WHERE u.id = :id")
    void actualizarRol(@Param("id") Long id, @Param("nuevoRol") String nuevoRol);
}
