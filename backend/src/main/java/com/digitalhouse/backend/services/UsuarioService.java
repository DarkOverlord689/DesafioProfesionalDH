package com.digitalhouse.backend.services;

import com.digitalhouse.backend.dto.LoginRequest;
import com.digitalhouse.backend.dto.UsuarioRequest;
import com.digitalhouse.backend.dto.UsuarioResponse;
import com.digitalhouse.backend.models.Usuario;
import com.digitalhouse.backend.repositories.UsuarioRepository;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public UsuarioResponse registrarUsuario(UsuarioRequest request) {
        String email = request.getEmail().trim().toLowerCase(Locale.ROOT);
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya se encuentra registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre().trim());
        usuario.setApellido(request.getApellido().trim());
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setRol("USER");

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        try {
            emailService.enviarCorreoConfirmacion(usuarioGuardado);
            System.out.println("Email de confirmacion enviado a: " + usuarioGuardado.getEmail());
        } catch (Exception e) {
            System.err.println("Error al enviar el email de bienvenida: " + e.getMessage());
        }

        return UsuarioResponse.fromEntity(usuarioGuardado);
    }

    public Usuario login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new BadCredentialsException("Credenciales incorrectas"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }

        return usuario;
    }

    public void actualizarRol(Long id, String nuevoRol) {
        String rolNormalizado = nuevoRol.trim().toUpperCase(Locale.ROOT);
        if (!rolNormalizado.equals("USER") && !rolNormalizado.equals("ADMIN")) {
            throw new IllegalArgumentException("Rol invalido");
        }
        usuarioRepository.actualizarRol(id, rolNormalizado);
    }

    public List<UsuarioResponse> listarTodos() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioResponse::fromEntity)
                .toList();
    }
}
