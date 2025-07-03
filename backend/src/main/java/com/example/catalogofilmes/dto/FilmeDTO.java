package com.example.catalogofilmes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FilmeDTO(
        @NotBlank String titulo,
        String descricao,
        @NotNull Long generoId,
        @NotNull Long diretorId
) {}
