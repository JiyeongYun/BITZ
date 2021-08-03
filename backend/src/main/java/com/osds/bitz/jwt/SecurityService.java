package com.osds.bitz.jwt;

import com.osds.bitz.model.entity.account.user.UserAuth;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SecurityService {
    private static final String SECRET_KEY = "asdfqwersadgklwehjsfghkasdbvfhcvsxkvdsafhjwlkjdsag"; // 일단 하드코딩


    public String createToken(String subject, String kind) { // 로그인 서비스 때 같이 사용

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

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

    /*public Boolean validateToken(String token, UserDetails userDetails) {
        final String userEmail = this.getSubject(token);
        // 토큰에서 얻은 subject(subject로 이메일을 넣었다고 가정)과 현재 로그인한 userAuth 이메일이 같으면
        System.out.println("유저 디테일 getUserName : "  + userDetails.getUsername());

        return (userEmail.equals(userDetails.getUsername()) && userDetails.isCredentialsNonExpired());
    }
*/

    public String getSubject(String token) { // 토큰 내의 정보 확인 -> 토큰을 검증하는 메서드를 만들어서 boolean으로 리턴해서 실제 토큰을 검증해보면 된다
        Claims claims = Jwts.parserBuilder() // Claims 페이로드에 담긴 정보
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();

        System.out.println("만료시간 : " + claims.getExpiration());


        return claims.getSubject();
    }


}
