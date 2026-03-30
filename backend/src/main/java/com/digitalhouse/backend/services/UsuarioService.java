package com.digitalhouse.backend.services;

import com.digitalhouse.backend.dto.LoginRequest;
import com.digitalhouse.backend.models.Usuario;
import com.digitalhouse.backend.repositories.UsuarioRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService; // Inyectamos el servicio de correo

    public Usuario registrarUsuario(Usuario usuario) {
        // 1. Encriptar contraseña (HU #13 - Seguridad)
        String passwordEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncriptada);

        // 2. Asignar rol por defecto si viene vacío
        if (usuario.getRol() == null) {
            usuario.setRol("USER");
        }

        // 3. Guardar en la base de datos
        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        // 4. DISPARAR EL DESAFÍO #19 (Email de confirmación)
        try {
            emailService.enviarCorreoConfirmacion(usuarioGuardado);
            System.out.println("Email de confirmación enviado a: " + usuarioGuardado.getEmail());
        } catch (Exception e) {
            // Si el mail falla, el usuario ya está guardado, así que solo avisamos en
            // consola
            System.err.println("Error al enviar el email de bienvenida: " + e.getMessage());
        }

        System.out.println("DEBUG: Intentando enviar correo a: " + usuarioGuardado.getEmail());

        try {
            emailService.enviarCorreoConfirmacion(usuarioGuardado);
            System.out.println("DEBUG: ¡Correo enviado sin errores de Java!");
        } catch (Exception e) {
            System.out.println("DEBUG: Error al enviar: " + e.getMessage());
            e.printStackTrace();
        }

        return usuarioGuardado;
    }

    public Usuario login(LoginRequest request) {
        // 1. Buscar al usuario por email
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Verificar la contraseña (suponiendo que usas BCrypt)
        // Si NO usas encriptación aún, sería:
        // if(usuario.getPassword().equals(request.getPassword()))
        if (passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return usuario;
        } else {
            throw new RuntimeException("Contraseña incorrecta");
        }
    }

    public void cambiarPermisos(Long id, String nuevoRol) {
        usuarioRepository.actualizarRol(id, nuevoRol);
    }

    public void actualizarRol(Long id, String nuevoRol) {
        usuarioRepository.actualizarRol(id, nuevoRol);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
}