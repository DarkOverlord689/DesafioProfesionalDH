package com.digitalhouse.backend.services;

import com.digitalhouse.backend.models.Reserva;
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

        // Dirección de correo del usuario
        message.setTo(usuario.getEmail());
        message.setSubject("¡Registro Exitoso en Darksishop! 🏨");

        // Mensaje claro, nombre de usuario y enlace de login
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

    public void enviarCorreoReserva(Reserva reserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(reserva.getUsuario().getEmail());
        message.setSubject("Confirmación de tu Reserva en Darksishop 🏨✨");

        String cuerpo = "¡Hola " + reserva.getUsuario().getNombre() + "!\n\n" +
                "Tu reserva se ha realizado con éxito. Aquí tienes los detalles principales:\n\n" +
                "🏨 Producto: " + reserva.getProducto().getNombre() + "\n" +
                "📅 Fecha de Inicio: " + reserva.getFechaInicio() + "\n" +
                "📅 Fecha de Fin: " + reserva.getFechaFin() + "\n\n" +
                "Puedes revisar la ubicación exacta y el contacto del proveedor en la sección 'Mis Reservas'.\n\n" +
                "¡Gracias por elegir Darksishop!";

        message.setText(cuerpo);
        mailSender.send(message);
    }
}