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

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        foodCenter.setUser(user);
        FoodCenter savedFoodCenter = foodCenterRepository.save(foodCenter);
        return ResponseEntity.ok(savedFoodCenter);
    }
}
