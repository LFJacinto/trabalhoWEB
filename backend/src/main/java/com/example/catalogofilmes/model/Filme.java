package com.example.catalogofilmes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Filme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String titulo;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "genero_id")
    @NotNull
    private Genero genero;

    @ManyToOne
    @JoinColumn(name = "diretor_id")
    @NotNull
    private Diretor diretor;

    @OneToMany(mappedBy = "filme", cascade = CascadeType.ALL)
    private List<Avaliacao> avaliacoes;
}
