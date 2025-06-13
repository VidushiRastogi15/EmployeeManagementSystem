package com.company.ems.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private String email;
    private String phone;
    private String reportingManager;
    
    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;
    
    @Transient
    private String username;
    @Transient
    private String password;
    
    
}