package com.resilience.api.controller;

import com.resilience.api.model.Shelter;
import com.resilience.api.model.User;
import com.resilience.api.repository.ShelterRepository;
import com.resilience.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shelters")
public class ShelterController {

    @Autowired
    private ShelterRepository shelterRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createShelter(@RequestBody Shelter shelter) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        shelter.setUser(user);
        return ResponseEntity.ok(shelterRepository.save(shelter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShelter(@PathVariable Long id, @RequestBody Shelter updatedShelter) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<Shelter> opt = shelterRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        Shelter shelter = opt.get();
        if (shelter.getUser() == null || !shelter.getUser().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Not authorized");
        shelter.setName(updatedShelter.getName());
        shelter.setCapacity(updatedShelter.getCapacity());
        shelter.setAvailableBeds(updatedShelter.getAvailableBeds());
        shelter.setContact(updatedShelter.getContact());
        if (updatedShelter.getImageUrl() != null)
            shelter.setImageUrl(updatedShelter.getImageUrl());
        return ResponseEntity.ok(shelterRepository.save(shelter));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShelter(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<Shelter> opt = shelterRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        Shelter shelter = opt.get();
        if (shelter.getUser() != null && shelter.getUser().getId().equals(user.getId())) {
            shelterRepository.delete(shelter);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Not authorized");
    }
}
