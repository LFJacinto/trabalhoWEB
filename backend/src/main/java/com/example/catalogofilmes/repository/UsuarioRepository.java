package com.example.catalogofilmes.repository;

import com.example.catalogofilmes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
