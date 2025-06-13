package com.company.ems.controller;

import com.company.ems.dto.AuthRequest;
import com.company.ems.dto.AuthResponse;
import com.company.ems.entities.User;
import com.company.ems.repository.UserRepository;
import com.company.ems.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            String token = jwtUtil.generateToken(authRequest.getUsername());
            String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(r -> r.equals("ROLE_HR") || r.equals("ROLE_EMPLOYEE") || r.equals("ROLE_ADMIN"))
                .findFirst()
                .orElse("ROLE_EMPLOYEE"); // Default role if none found

            return new AuthResponse(token, role);

        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }
 
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public String register(@RequestBody AuthRequest authRequest) {
        if (userRepository.findByUsername(authRequest.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User newUser = new User();
        newUser.setUsername(authRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        newUser.setRole(User.Role.EMPLOYEE); 

        userRepository.save(newUser);

        return "User registered successfully!";
    }
}