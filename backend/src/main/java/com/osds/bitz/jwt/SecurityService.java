package com.osds.bitz.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Slf4j
@Service
public class SecurityService implements InitializingBean {

    private static final String SECRET_KEY = "asdfqwersadgklwehjsfghkasdbvfhcvsxkvdsafhjwlkjdsag"; // 일단 하드코딩

    private Key signingKey;

    public String createToken(String subject, String kind) { // 로그인 서비스 때 같이 사용

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        int expTime = kind.equals("access") ? 6 * 1000 * 10 : 6 * 1000 * 24 * 14;

        if (kind.equals("access")) { // 엑세스 토큰 반환
            return Jwts.builder()
                    .setSubject(subject)
                    .signWith(signingKey, signatureAlgorithm)
                    .setExpiration(new Date(System.currentTimeMillis() + expTime))
                    .compact();
        } else if (kind.equals("refresh")) { // 리프레시 토큰 반환
            return Jwts.builder()
                    .setSubject(subject)
                    .signWith(signingKey, signatureAlgorithm)
                    .setExpiration(new Date(System.currentTimeMillis() + expTime))
                    .compact();
        }

        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY)).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    public String getSubject(String token) { // 토큰 내의 정보 확인 -> 토큰을 검증하는 메서드를 만들어서 boolean으로 리턴해서 실제 토큰을 검증해보면 된다
        Claims claims = Jwts.parserBuilder() // Claims: 페이로드에 담긴 정보
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();

        System.out.println("만료시간 : " + claims.getExpiration());
        return claims.getSubject();
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);

    }
}
