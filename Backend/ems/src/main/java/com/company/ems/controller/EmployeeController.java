package com.company.ems.controller;

import com.company.ems.entities.Employee;
import com.company.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ADMIN
    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')")
    public Employee create(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    // ADMIN & HR
    @GetMapping("/")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    //ADMI HR EMP
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR', 'EMPLOYEE')")
    public Employee getById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id).orElseThrow();
    }

    //ADMIN
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Employee update(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    //ADMIN
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    //EMP
    @GetMapping("/profile/me")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public Employee getMyProfile(Authentication authentication) {
        String username = authentication.getName();
        return employeeService.getAllEmployees()
                .stream()
                .filter(emp -> emp.getUser()!= null && emp.getUser().getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElseThrow();
    }
}