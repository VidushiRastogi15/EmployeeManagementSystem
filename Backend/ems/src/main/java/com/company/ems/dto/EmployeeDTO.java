package com.company.ems.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long id;
    private String name;
    private String department;
    private String email;
    private String phone;
    private String reportingManager;
}
