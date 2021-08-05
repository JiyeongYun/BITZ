package com.osds.bitz.jwt;


import com.osds.bitz.model.entity.token.Token;
import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.network.request.account.ReadAuthRequest;
import com.osds.bitz.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/")
public class SecurityController {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/test")
    public String welcome() {
        return "Welcome to javatechie !!";
    }

    @PostMapping("/login")
    public Token generateToken(@RequestBody ReadAuthRequest readAuthRequest) throws Exception {
        try {

            // 유저 정보를 이용하여 인증용 객체(토큰)을 생성
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(readAuthRequest.getEmail(), readAuthRequest.getPassword());

            // Spring Secuirty의 매니저에 위에서 생성한 객체를 권한을 준다.(등록한다.)
            authenticationManager.authenticate(token);

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new Exception("inavalid username/password");
        }

        UserAuth userAuth = this.userService.readUser(readAuthRequest);

        Token userToken = new Token();
        userToken.setAccessToken(jwtUtil.createToken(userAuth, "access"));
        userToken.setRefreshToken(jwtUtil.createToken(userAuth, "refresh"));

        return userToken;
    }

    @GetMapping("/get/subject")
    public Map<String, Object> getSubject(@RequestParam(value = "token") String token) {
        String subject = jwtUtil.getSubject(token);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", subject);


        return map;
    }

}
