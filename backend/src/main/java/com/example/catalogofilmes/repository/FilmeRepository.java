package com.example.catalogofilmes.repository;

import com.example.catalogofilmes.model.Filme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FilmeRepository extends JpaRepository<Filme, Long> {

    @Query(value = "SELECT * FROM filme WHERE LOWER(titulo) LIKE LOWER(CONCAT('%', :titulo, '%'))", nativeQuery = true)
    List<Filme> buscarTodosPorTitulo(@Param("titulo") String titulo);
}