package com.example.catalogofilmes.repository;

import com.example.catalogofilmes.model.Diretor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiretorRepository extends JpaRepository<Diretor, Long> {
}
