package com.review.config;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.review.models.Usuario;

@Service
public class TokenService {
    @Value("${jwt.secret}")
    private String secret;

    private Instant generateExpirationDate() {
        LocalDateTime dateTime = LocalDateTime.now().plusMinutes(60);
        ZoneId zoneId = ZoneId.systemDefault();
        ZonedDateTime zoneDateTime = dateTime.atZone(zoneId);
        return zoneDateTime.toInstant();
    }

    public String generateToken(Usuario usuario) {
        Algorithm alg = Algorithm.HMAC256(secret);
        String token = JWT.create()
                          .withIssuer("Review")
                          .withSubject(usuario.getNomeUsuario())
                          .withClaim("nomeCompleto", usuario.getNomeCompleto())
                          .withClaim("papel", usuario.getPapel().name())
                          .withClaim("dataLimiteRenovacao", LocalDate.now().toString())
                          .withExpiresAt(generateExpirationDate())
                          .sign(alg);
        return token;
    }

    public String validateToken(String token) {
        Algorithm alg = Algorithm.HMAC256(secret);
        DecodedJWT tokenValidado = JWT.require(alg)
                                      .withIssuer("Review")
                                      .build()
                                      .verify(token);
        return tokenValidado.getSubject();
    }
}
