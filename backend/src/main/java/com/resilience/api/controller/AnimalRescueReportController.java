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

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        animalRescueReport.setUser(user);
        AnimalRescueReport savedReport = animalRescueReportRepository.save(animalRescueReport);
        return ResponseEntity.ok(savedReport);
    }
}
