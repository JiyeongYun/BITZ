package com.osds.bitz.jwt;


import com.osds.bitz.model.network.request.ReadAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import com.sun.org.apache.xml.internal.security.utils.Base64;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.xml.bind.DatatypeConverter;
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

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody ReadAuthRequest readAuthRequest) throws Exception {
        System.out.println(test.getUserAuthByEmail(readAuthRequest.getEmail()));
        log.info("{}", "login Request : " + readAuthRequest);
        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            log.info("{}", "확인");
            log.info("{}", "passwordEncoder : " + passwordEncoder.encode(readAuthRequest.getPassword()));
//            byte[] passBytes = DatatypeConverter.parseBase64Binary(readAuthRequest.getPassword());
//            String changePass = Base64.encode(passBytes);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(readAuthRequest.getEmail(),passwordEncoder.encode(readAuthRequest.getPassword()) );
            log.info("{}", "token : " + token);
            authenticationManager.authenticate(token);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.info("{}", "에러 : " + ex.fillInStackTrace());
            throw new Exception("inavalid username/password");
        }
        return securityService.createToken(readAuthRequest.getEmail(), 60 * 1000 * 5);
    }


    @GetMapping("/authenticate/create/token")
    public Map<String, Object> createToken(@RequestParam(value = "subject") String subject) {
        String token = securityService.createToken(subject, (2 * 1000 * 60));
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
