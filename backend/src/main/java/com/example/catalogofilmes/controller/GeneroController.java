package com.example.catalogofilmes.controller;

import com.example.catalogofilmes.model.Genero;
import com.example.catalogofilmes.repository.GeneroRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/generos")
@CrossOrigin(origins = "*")
public class GeneroController {
    private final GeneroRepository generoRepository;

    public GeneroController(GeneroRepository generoRepository) {
        this.generoRepository = generoRepository;
    }

    @GetMapping
    public List<Genero> listar() {
        return generoRepository.findAll();
    }
}
