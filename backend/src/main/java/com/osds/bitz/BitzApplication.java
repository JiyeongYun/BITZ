package com.osds.bitz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class BitzApplication {

    public static void main(String[] args) {
        SpringApplication.run(BitzApplication.class, args);
    }

}
