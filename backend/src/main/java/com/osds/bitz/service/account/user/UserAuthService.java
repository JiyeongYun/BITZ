package com.osds.bitz.service.account.user;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.network.request.ReadUserAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.UserAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

@Service
@Slf4j
public class UserAuthService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private JavaMailSender mailSender;


    @Bean
    public JavaMailSenderImpl mailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setProtocol("smtp");
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("angpang1106@gmail.com");
        javaMailSender.setPassword("rozqumdjyahhtaui");
        javaMailSender.setDefaultEncoding("UTF-8");
        Properties properties = javaMailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", true);
        properties.put("mail.smtp.auth", true);
        properties.put("mail.debug", true);
        javaMailSender.setJavaMailProperties(properties);
        return javaMailSender;
    }

    public UserAuth createUser(UserAuthRequest userAuthRequest) {
        UserAuth userAuth = UserAuth.builder()
                .email(userAuthRequest.getEmail())
                .birth(userAuthRequest.getBirth())
                .password(userAuthRequest.getPassword())
                .build();
        return this.userAuthRepository.save(userAuth);
    }

    public UserAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = new UserAuth();
        newUserAuth = this.userAuthRepository.getUserAuthByEmail(updatePasswordRequest.getEmail());

        // 변경할 비밀번호 설정하기
        newUserAuth.setPassword(updatePasswordRequest.getNewPassword());
        return this.userAuthRepository.save(newUserAuth);
    }

    public UserAuth readUser(ReadUserAuthRequest readUserAuthRequest) {
        // 이메일과 비밀번호로 객체 찾아오기
        return this.userAuthRepository.findUserAuthByEmailAndPassword(readUserAuthRequest.getEmail(), readUserAuthRequest.getPassword());
    }

    public UserAuth readPassword(UserAuthRequest userAuthRequest) {
        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = new UserAuth();
        newUserAuth = this.userAuthRepository.getUserAuthByEmail(userAuthRequest.getEmail());

        // 임시 비밀번호 생성 및 메일 전송
        String code = "";
        try {
            for (int i = 0; i < 10; i++)
                code = code + String.valueOf(new Random().nextInt(9) + 1);
            String msg = "<p><b> " + newUserAuth.getEmail() + " </b>님의 임시 비밀번호입니다.</p> <p style=color:red;> <h1>" + code + "</h1> </p>\n \n 로 새롭게 로그인 후 비밀번호를 변경해주세요!";
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("OSDS"); // 보내는 사람
            helper.setTo(newUserAuth.getEmail());
            helper.setText(msg);
            message.setContent(msg, "text/html; charset=UTF-8");
            helper.setSubject("[OSDS] 비밀번호 찾기 요청에 대한 임시 비밀번호를 보내드립니다.");
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 임시 비밀번호로 비밀번호 변경하기
        newUserAuth.setPassword(code);
        return this.userAuthRepository.save(newUserAuth);

    }

}
