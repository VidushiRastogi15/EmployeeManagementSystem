package com.company.ems.config;

import com.company.ems.entities.User;
import com.company.ems.entities.User.Role;
import com.company.ems.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("ADMIN").isEmpty()) {
                userRepository.save(User.builder()
                        .username("ADMIN")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build());
            }

            if (userRepository.findByUsername("HR").isEmpty()) {
                userRepository.save(User.builder()
                        .username("HR")
                        .password(passwordEncoder.encode("hr123"))
                        .role(Role.HR)
                        .build());
            }
        };
    }
}