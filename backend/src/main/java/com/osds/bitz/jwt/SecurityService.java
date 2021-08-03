package com.osds.bitz.jwt;

import com.osds.bitz.model.entity.account.user.UserAuth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityService {
    private static final String SECRET_KEY = "asdfqwersadgklwehjsfghkasdbvfhcvsxkvdsafhjwlkjdsaf"; // 일단 하드코딩

    public String createToken(String subject, long expTime) { // 로그인 서비스 때 같이 사용
        if (expTime <= 0) {
            throw new RuntimeException("만료시간이 0보다 커야합니다.");
        }

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject)
                .signWith(signingKey, signatureAlgorithm    )
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String userEmail = this.getSubject(token);
        // 토큰에서 얻은 subject(subject로 이메일을 넣었다고 가정)과 현재 로그인한 userAuth 이메일이 같으면
        System.out.println("유저 디테일 getUserName : "  + userDetails.getUsername());

        return (userEmail.equals(userDetails.getUsername()) && userDetails.isAccountNonExpired());
    }


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
