package com.digitalhouse.backend.models;

import jakarta.persistence.*;
import lombok.Data; // Si usas Lombok, si no, genera Getters/Setters a mano

@Entity
@Table(name = "categorias")
@Data
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    private String descripcion;
    private String imagenUrl;
}