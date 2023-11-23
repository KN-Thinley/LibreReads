package com.librereads.server.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AdminController {

    @PostMapping("/admin/login")
    public boolean adminLogin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Check credentials using AdminCredentials class
        return AdminCredentials.isValidCredentials(username, password);
    }
}
