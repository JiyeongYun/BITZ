package com.osds.bitz.jwt;


import com.osds.bitz.model.entity.account.Token;
import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/")
public class SecurityController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private UserAuthRepository test;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to javatechie !!";
    }

    @PostMapping("/login")
    public Token generateToken(@RequestBody ReadAuthRequest readAuthRequest) throws Exception {
        log.info("{}", "login Request : " + readAuthRequest);
        try {

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(readAuthRequest.getEmail(), readAuthRequest.getPassword());

            // 유저 정보를 이용하여 인증용 객체(토큰)을 생성
            log.info("{}", "token : " + token);

            // Spring Secuirty의 매니저에 위에서 생성한 객체를 권한을 준다.(등록한다.)
            authenticationManager.authenticate(token);

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new Exception("inavalid username/password");
        }

        Token userToken = new Token();
        userToken.setAccessToken(securityService.createToken(readAuthRequest.getEmail(), "access"));
        userToken.setRefreshToken(securityService.createToken(readAuthRequest.getEmail(), "refresh"));

        return userToken;
    }


    @GetMapping("/authenticate/create/token")
    public Map<String, Object> createToken(@RequestParam(value = "subject") String subject) {
        String token = securityService.createToken(subject, "access");
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", token);

        return map;
    }

    @GetMapping("/get/subject")
    public Map<String, Object> getSubject(@RequestParam(value = "token") String token) {
        String subject = securityService.getSubject(token);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("result", subject);


        return map;
    }

}
