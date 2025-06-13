package com.company.ems.service;

import com.company.ems.entities.Employee;
import com.company.ems.entities.User;
import com.company.ems.repository.EmployeeRepository;
import com.company.ems.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Employee createEmployee(Employee employee) {
        // Check if user name is already taken
        if (userRepository.findByUsername(employee.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create and save User
        User user = new User();
        user.setUsername(employee.getUsername());
        user.setPassword(passwordEncoder.encode(employee.getPassword()));
        user.setRole(User.Role.EMPLOYEE);
        User savedUser= userRepository.save(user);

        // Link user to employee
        employee.setUser(savedUser);
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existing = employeeRepository.findById(id).orElseThrow();
        existing.setName(updatedEmployee.getName());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setPhone(updatedEmployee.getPhone());
        existing.setReportingManager(updatedEmployee.getReportingManager());
        return employeeRepository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}