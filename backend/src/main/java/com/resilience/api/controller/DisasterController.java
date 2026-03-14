package com.resilience.api.controller;

import com.resilience.api.model.Disaster;
import com.resilience.api.model.User;
import com.resilience.api.repository.DisasterRepository;
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
@RequestMapping("/api/disasters")
public class DisasterController {

    @Autowired
    private DisasterRepository disasterRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Disaster> getAllDisasters(@RequestParam(required = false) String type) {
        if (type != null && !type.isEmpty()) {
            return disasterRepository.findByDisasterType(type);
        }
        return disasterRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disaster> getDisasterById(@PathVariable Long id) {
        Optional<Disaster> disasterData = disasterRepository.findById(id);
        return disasterData.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createDisaster(@RequestBody Disaster disaster) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        disaster.setUser(user);
        Disaster savedDisaster = disasterRepository.save(disaster);
        return ResponseEntity.ok(savedDisaster);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDisaster(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Optional<Disaster> disasterOptional = disasterRepository.findById(id);
        if (disasterOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Disaster disaster = disasterOptional.get();
        if (disaster.getUser() != null && disaster.getUser().getId().equals(user.getId())) {
            disasterRepository.delete(disaster);
            return ResponseEntity.ok().body("Disaster deleted successfully");
        } else {
            return ResponseEntity.status(403).body("You are not authorized to delete this post");
        }
    }
}
