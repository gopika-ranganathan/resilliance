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
import java.util.Optional;

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
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        volunteerRequest.setUser(user);
        return ResponseEntity.ok(volunteerRequestRepository.save(volunteerRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVolunteerRequest(@PathVariable Long id, @RequestBody VolunteerRequest updated) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<VolunteerRequest> opt = volunteerRequestRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        VolunteerRequest vr = opt.get();
        if (vr.getUser() == null || !vr.getUser().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Not authorized");
        vr.setOrganizationName(updated.getOrganizationName());
        vr.setHelpType(updated.getHelpType());
        vr.setVolunteersNeeded(updated.getVolunteersNeeded());
        vr.setContact(updated.getContact());
        if (updated.getImageUrl() != null)
            vr.setImageUrl(updated.getImageUrl());
        return ResponseEntity.ok(volunteerRequestRepository.save(vr));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVolunteerRequest(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<VolunteerRequest> opt = volunteerRequestRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        VolunteerRequest vr = opt.get();
        if (vr.getUser() != null && vr.getUser().getId().equals(user.getId())) {
            volunteerRequestRepository.delete(vr);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Not authorized");
    }
}
