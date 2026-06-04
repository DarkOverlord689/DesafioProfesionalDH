package com.digitalhouse.backend.security;

import com.digitalhouse.backend.models.Usuario;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final String HMAC_ALGORITHM = "HmacSHA256";

    @Value("${app.jwt.secret:desafio-profesional-dh-secret-key-change-me}")
    private String secret;

    @Value("${app.jwt.expiration-seconds:86400}")
    private long expirationSeconds;

    public String generarToken(Usuario usuario) {
        try {
            Map<String, Object> header = Map.of("alg", "HS256", "typ", "JWT");
            Map<String, Object> payload = new LinkedHashMap<>();
            payload.put("sub", usuario.getEmail());
            payload.put("id", usuario.getId());
            payload.put("rol", usuario.getRol());
            payload.put("exp", Instant.now().getEpochSecond() + expirationSeconds);

            String encodedHeader = base64Url(OBJECT_MAPPER.writeValueAsBytes(header));
            String encodedPayload = base64Url(OBJECT_MAPPER.writeValueAsBytes(payload));
            String signature = firmar(encodedHeader + "." + encodedPayload);

            return encodedHeader + "." + encodedPayload + "." + signature;
        } catch (Exception e) {
            throw new IllegalStateException("No se pudo generar el token", e);
        }
    }

    public boolean tokenValido(String token) {
        try {
            Map<String, Object> claims = obtenerClaims(token);
            Number exp = (Number) claims.get("exp");
            return exp != null && exp.longValue() > Instant.now().getEpochSecond();
        } catch (Exception e) {
            return false;
        }
    }

    public String obtenerEmail(String token) {
        return (String) obtenerClaims(token).get("sub");
    }

    public String obtenerRol(String token) {
        return (String) obtenerClaims(token).get("rol");
    }

    private Map<String, Object> obtenerClaims(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Token invalido");
            }

            String expectedSignature = firmar(parts[0] + "." + parts[1]);
            if (!constantTimeEquals(expectedSignature, parts[2])) {
                throw new IllegalArgumentException("Firma invalida");
            }

            byte[] payload = Base64.getUrlDecoder().decode(parts[1]);
            return OBJECT_MAPPER.readValue(payload, new TypeReference<>() {});
        } catch (Exception e) {
            throw new IllegalArgumentException("Token invalido", e);
        }
    }

    private String firmar(String data) throws Exception {
        Mac mac = Mac.getInstance(HMAC_ALGORITHM);
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM));
        return base64Url(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
    }

    private String base64Url(byte[] data) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(data);
    }

    private boolean constantTimeEquals(String expected, String actual) {
        byte[] expectedBytes = expected.getBytes(StandardCharsets.UTF_8);
        byte[] actualBytes = actual.getBytes(StandardCharsets.UTF_8);
        if (expectedBytes.length != actualBytes.length) {
            return false;
        }

        int result = 0;
        for (int i = 0; i < expectedBytes.length; i++) {
            result |= expectedBytes[i] ^ actualBytes[i];
        }
        return result == 0;
    }
}
