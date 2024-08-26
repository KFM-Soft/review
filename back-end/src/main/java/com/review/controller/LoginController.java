package com.review.controller;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

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

        UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(
            usuario.getNomeUsuario(), usuario.getSenha());
        Authentication auth = authManager.authenticate(loginToken);
        PerfilUsuario principal = (PerfilUsuario) auth.getPrincipal();

        Usuario usuarioAutenticado = usuarioService.getByNomeUsuario(principal.getUsername());
        String token = tokenService.generateToken(usuarioAutenticado);

        return ResponseEntity.ok(token);

    }

    @GetMapping("/refresh")
    public ResponseEntity<String> refresh(
            @RequestHeader("Authorization") String authHeader) {
        
        String token = authHeader.replace("Bearer ", "");
        DecodedJWT tokenDecodificado = JWT.decode(token);
        Claim claimDataLimite = tokenDecodificado.getClaim("dataLimiteRenovacao");
        LocalDate dataLimite = LocalDate.parse(claimDataLimite.asString());
        LocalDate hoje = LocalDate.now();
        if (hoje.isAfter(dataLimite)) {
            return ResponseEntity.badRequest().build();
        }

        String nomeUsuario = tokenDecodificado.getSubject();
        Usuario usuario = usuarioService.getByNomeUsuario(nomeUsuario);
        String tokenNovo = tokenService.generateToken(usuario);

        return ResponseEntity.ok(tokenNovo);

    }

}