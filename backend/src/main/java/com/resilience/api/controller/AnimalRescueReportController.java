package com.resilience.api.controller;

import com.resilience.api.model.AnimalRescueReport;
import com.resilience.api.model.User;
import com.resilience.api.repository.AnimalRescueReportRepository;
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
@RequestMapping("/api/animal-rescue")
public class AnimalRescueReportController {

    @Autowired
    private AnimalRescueReportRepository animalRescueReportRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<AnimalRescueReport> getAllAnimalRescueReports() {
        return animalRescueReportRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createAnimalRescueReport(@RequestBody AnimalRescueReport animalRescueReport) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        animalRescueReport.setUser(user);
        return ResponseEntity.ok(animalRescueReportRepository.save(animalRescueReport));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAnimalRescueReport(@PathVariable Long id, @RequestBody AnimalRescueReport updated) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<AnimalRescueReport> opt = animalRescueReportRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        AnimalRescueReport report = opt.get();
        if (report.getUser() == null || !report.getUser().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Not authorized");
        report.setAnimalType(updated.getAnimalType());
        report.setDescription(updated.getDescription());
        report.setContact(updated.getContact());
        if (updated.getImageUrl() != null)
            report.setImageUrl(updated.getImageUrl());
        return ResponseEntity.ok(animalRescueReportRepository.save(report));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnimalRescueReport(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<AnimalRescueReport> opt = animalRescueReportRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        AnimalRescueReport report = opt.get();
        if (report.getUser() != null && report.getUser().getId().equals(user.getId())) {
            animalRescueReportRepository.delete(report);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Not authorized");
    }
}
