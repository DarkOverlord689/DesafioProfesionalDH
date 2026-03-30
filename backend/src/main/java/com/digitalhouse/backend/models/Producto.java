package com.digitalhouse.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "productos")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    // 1. CAMBIO: De String a Relación con la clase Categoria
    @ManyToOne
    @JoinColumn(name = "categoria_id") // Hibernate creará esta columna como FK
    private Categoria categoria;

    private String imagenUrl;

    // 2. ADICIÓN: Relación para las características (HU #17)
    @ManyToMany
    @JoinTable(
        name = "producto_caracteristica", // Nombre de la tabla intermedia
        joinColumns = @JoinColumn(name = "producto_id"),
        inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private List<Caracteristica> caracteristicas;
}