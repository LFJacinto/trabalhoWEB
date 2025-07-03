package com.example.catalogofilmes.repository;

import com.example.catalogofilmes.model.Genero;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GeneroRepository extends JpaRepository<Genero, Long> {
}
