package com.resilience.api.controller;

import com.resilience.api.model.FoodCenter;
import com.resilience.api.model.User;
import com.resilience.api.repository.FoodCenterRepository;
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
@RequestMapping("/api/food-centers")
public class FoodCenterController {

    @Autowired
    private FoodCenterRepository foodCenterRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<FoodCenter> getAllFoodCenters() {
        return foodCenterRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createFoodCenter(@RequestBody FoodCenter foodCenter) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        foodCenter.setUser(user);
        return ResponseEntity.ok(foodCenterRepository.save(foodCenter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFoodCenter(@PathVariable Long id, @RequestBody FoodCenter updatedCenter) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<FoodCenter> opt = foodCenterRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        FoodCenter center = opt.get();
        if (center.getUser() == null || !center.getUser().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Not authorized");
        center.setOrganizationName(updatedCenter.getOrganizationName());
        center.setFoodType(updatedCenter.getFoodType());
        center.setDistributionTime(updatedCenter.getDistributionTime());
        center.setContact(updatedCenter.getContact());
        center.setAvailabilityType(updatedCenter.getAvailabilityType());
        center.setStockQuantity(updatedCenter.getStockQuantity());
        if (updatedCenter.getImageUrl() != null)
            center.setImageUrl(updatedCenter.getImageUrl());
        return ResponseEntity.ok(foodCenterRepository.save(center));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFoodCenter(@PathVariable Long id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);
        if (user == null)
            return ResponseEntity.badRequest().body("User not found");
        Optional<FoodCenter> opt = foodCenterRepository.findById(id);
        if (opt.isEmpty())
            return ResponseEntity.notFound().build();
        FoodCenter center = opt.get();
        if (center.getUser() != null && center.getUser().getId().equals(user.getId())) {
            foodCenterRepository.delete(center);
            return ResponseEntity.ok("Deleted successfully");
        }
        return ResponseEntity.status(403).body("Not authorized");
    }
}
