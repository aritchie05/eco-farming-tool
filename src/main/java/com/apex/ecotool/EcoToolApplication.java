package com.apex.ecotool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableMongoRepositories(basePackages = {"com.apex.ecotool.repository"})
@EnableWebMvc
public class EcoToolApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcoToolApplication.class, args);
    }
}
