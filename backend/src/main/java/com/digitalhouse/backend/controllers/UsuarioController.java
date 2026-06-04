package com.digitalhouse.backend.controllers;

import com.digitalhouse.backend.dto.AuthResponse;
import com.digitalhouse.backend.dto.LoginRequest;
import com.digitalhouse.backend.dto.UsuarioRequest;
import com.digitalhouse.backend.dto.UsuarioResponse;
import com.digitalhouse.backend.models.Usuario;
import com.digitalhouse.backend.security.JwtService;
import com.digitalhouse.backend.services.UsuarioService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioResponse> registrar(@Valid @RequestBody UsuarioRequest usuario) {
        return ResponseEntity.ok(usuarioService.registrarUsuario(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.login(request);
        String token = jwtService.generarToken(usuario);
        return ResponseEntity.ok(new AuthResponse(token, UsuarioResponse.fromEntity(usuario)));
    }

    @PutMapping("/{id}/rol")
    public ResponseEntity<Void> cambiarRol(@PathVariable Long id, @RequestBody String nuevoRol) {
        usuarioService.actualizarRol(id, nuevoRol.replace("\"", ""));
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }
}
