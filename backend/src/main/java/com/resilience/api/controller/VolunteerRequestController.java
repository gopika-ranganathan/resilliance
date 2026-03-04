package com.resilience.api.controller;

import com.resilience.api.model.User;
import com.resilience.api.model.VolunteerRequest;
import com.resilience.api.repository.UserRepository;
import com.resilience.api.repository.VolunteerRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/volunteer-requests")
public class VolunteerRequestController {

    @Autowired
    private VolunteerRequestRepository volunteerRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<VolunteerRequest> getAllVolunteerRequests() {
        return volunteerRequestRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createVolunteerRequest(@RequestBody VolunteerRequest volunteerRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        volunteerRequest.setUser(user);
        VolunteerRequest savedRequest = volunteerRequestRepository.save(volunteerRequest);
        return ResponseEntity.ok(savedRequest);
    }
}
