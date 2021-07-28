package com.osds.bitz.service.account;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

public class MailSender<T> {

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

}
