package com.osds.bitz.service.account;

import com.osds.bitz.repository.log.LoginLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;
import java.util.Random;

public class BaseAuthService<T> {

    public JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

    @Bean
    public JavaMailSenderImpl mailSender() {
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

    // 7자리 난수 만들기
    public String generateRandomNumber(boolean isGeneral) {
        int length = 7;

        Random random = new Random(System.currentTimeMillis());
        int range = (int)Math.pow(10,length);
        int trim = (int)Math.pow(10, length-1);
        int result = random.nextInt(range) + trim;

        if(result > range) result = result - trim;

        String id = String.valueOf(result);

        if(isGeneral) return "S" + id;      // 일반 사용자
        else return "B" + id;               // 관리자
    }


}
