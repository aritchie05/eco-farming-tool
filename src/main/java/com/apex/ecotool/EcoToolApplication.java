package com.apex.ecotool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class EcoToolApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoToolApplication.class, args);
    }
}
