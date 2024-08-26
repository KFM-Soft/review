package com.review.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.review.config.PerfilUsuario;
import com.review.config.TokenService;
import com.review.models.Usuario;
import com.review.service.UsuarioService;

@RestController
public class LoginController {
    
    private final AuthenticationManager authManager;
    private final TokenService tokenService;
    private final UsuarioService usuarioService;

    public LoginController(
            AuthenticationManager authManager,
            TokenService tokenService,
            UsuarioService usuarioService) {
        this.authManager = authManager;
        this.tokenService = tokenService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {

        UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(usuario.getNomeUsuario(), usuario.getSenha());
        Authentication auth = authManager.authenticate(loginToken);
        PerfilUsuario principal = (PerfilUsuario) auth.getPrincipal();

        Usuario usuarioAutenticado = usuarioService.getByNomeUsuario(principal.getUsername());
        String token = tokenService.generateToken(usuarioAutenticado);

        return ResponseEntity.ok(token);
    }

}
