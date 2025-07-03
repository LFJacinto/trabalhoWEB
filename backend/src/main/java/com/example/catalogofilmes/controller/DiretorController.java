package com.example.catalogofilmes.controller;

import com.example.catalogofilmes.model.Diretor;
import com.example.catalogofilmes.repository.DiretorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/diretores")
@CrossOrigin(origins = "http://localhost:3000")
public class DiretorController {
    private final DiretorRepository diretorRepository;

    public DiretorController(DiretorRepository diretorRepository) {
        this.diretorRepository = diretorRepository;
    }

    @GetMapping
    public List<Diretor> listar() {
        return diretorRepository.findAll();
    }
}
