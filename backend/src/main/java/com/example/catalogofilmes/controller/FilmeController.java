package com.example.catalogofilmes.controller;

import com.example.catalogofilmes.dto.FilmeDTO;
import com.example.catalogofilmes.model.Diretor;
import com.example.catalogofilmes.model.Filme;
import com.example.catalogofilmes.model.Genero;
import com.example.catalogofilmes.repository.DiretorRepository;
import com.example.catalogofilmes.repository.FilmeRepository;
import com.example.catalogofilmes.repository.GeneroRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filmes")
@CrossOrigin(origins = "*")
public class FilmeController {

    private final FilmeRepository filmeRepository;
    private final GeneroRepository generoRepository;
    private final DiretorRepository diretorRepository;

    public FilmeController(FilmeRepository filmeRepository,
                           GeneroRepository generoRepository,
                           DiretorRepository diretorRepository) {
        this.filmeRepository = filmeRepository;
        this.generoRepository = generoRepository;
        this.diretorRepository = diretorRepository;
    }

    // Busca todos ou filtra por título
    @GetMapping
    public List<Filme> listar(@RequestParam(required = false) String titulo) {
        if (titulo != null && !titulo.isBlank()) {
            return filmeRepository.buscarTodosPorTitulo(titulo);
        }
        return filmeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filme> buscarPorId(@PathVariable Long id) {
        return filmeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody @Valid FilmeDTO dto) {
        Genero genero = generoRepository.findById(dto.generoId()).orElse(null);
        Diretor diretor = diretorRepository.findById(dto.diretorId()).orElse(null);

        if (genero == null) {
            return ResponseEntity.badRequest().body("Gênero não encontrado.");
        }

        if (diretor == null) {
            return ResponseEntity.badRequest().body("Diretor não encontrado.");
        }

        Filme filme = new Filme();
        filme.setTitulo(dto.titulo());
        filme.setDescricao(dto.descricao());
        filme.setGenero(genero);
        filme.setDiretor(diretor);
        Filme salvo = filmeRepository.save(filme);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                       @RequestBody @Valid FilmeDTO dto) {
        return filmeRepository.findById(id).map(filme -> {
            Genero genero = generoRepository.findById(dto.generoId()).orElse(null);
            Diretor diretor = diretorRepository.findById(dto.diretorId()).orElse(null);

            if (genero == null) {
                return ResponseEntity.badRequest().body("Gênero não encontrado.");
            }

            if (diretor == null) {
                return ResponseEntity.badRequest().body("Diretor não encontrado.");
            }

            filme.setTitulo(dto.titulo());
            filme.setDescricao(dto.descricao());
            filme.setGenero(genero);
            filme.setDiretor(diretor);
            filmeRepository.save(filme);
            return ResponseEntity.ok(filme);
        }).orElse(ResponseEntity.status(404).body("Filme não encontrado."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (filmeRepository.existsById(id)) {
            filmeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}