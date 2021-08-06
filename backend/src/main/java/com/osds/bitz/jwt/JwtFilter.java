package com.osds.bitz.jwt;

import com.osds.bitz.model.entity.account.user.UserAuth;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");

        // /authenticate 경로를 제외한 모든 경로는 filter를 통해 인증받아야함
        String token = null;
        String userEmail = null;


        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);

            try {
                jwtUtil.validateToken(token);
                httpServletResponse.setStatus(200);
            } catch (ExpiredJwtException ae) { // access token이 만료된 경우 헤더의 email을 통해 refresh token 확인
                userEmail = ae.getClaims().getSubject();
                UserAuth userAuth = customUserDetailsService.getUserAuthByUserEmail(userEmail);

                String refreshToken = customUserDetailsService.getRefreshTokenByEmail(userEmail);
                try {
                    if (jwtUtil.validateToken(refreshToken)) { // access 토큰 X, refresh 토큰 O
                        httpServletResponse.setStatus(206);
                        String newAccessToken = jwtUtil.createToken(userAuth, "access");
                        httpServletResponse.setHeader("accessresult", newAccessToken);
                    }
                    return;
                } catch (ExpiredJwtException re) { // access 토큰 X, refresh 토큰 X
                    String newRefreshToken = jwtUtil.createToken(userAuth, "refresh");
                    httpServletResponse.setHeader("refreshresult", newRefreshToken);
                    // TODO : DB에 업데이트 구현 필요
                    return;
                }
            }
        }

        /*if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(userEmail);

            if (jwtUtil.validateToken(token)) {
                // header에서 추출한 토큰이 유효하면 유저 아이디,비밀번호를 이용해서 Spring Security Authentication에 필요한 정보를 setting 한다.
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }*/
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

}
