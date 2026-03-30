package com.digitalhouse.backend.services;

import com.digitalhouse.backend.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreoConfirmacion(Usuario usuario) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // ➔ Criterio: Dirección de correo del usuario
        message.setTo(usuario.getEmail());
        message.setSubject("¡Registro Exitoso en Darksishop! 🏨");

        // ➔ Criterio: Mensaje claro, nombre de usuario y enlace de login
        String cuerpo = "Hola " + usuario.getNombre() + " " + usuario.getApellido() + ",\n\n" +
                "Bienvenido a Darksishop. Tu cuenta ha sido creada con éxito.\n\n" +
                "Detalles de tu cuenta:\n" +
                "- Usuario: " + usuario.getNombre() + "\n" +
                "- Email: " + usuario.getEmail() + "\n\n" +
                "Ya puedes iniciar sesión y comenzar a reservar aquí:\n" +
                "http://localhost:5173/login\n\n" +
                "¡Gracias por confiar en nosotros!";

        message.setText(cuerpo);
        
        mailSender.send(message);
    }
}