package com.resilience.api.repository;

import com.resilience.api.model.FoodCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodCenterRepository extends JpaRepository<FoodCenter, Long> {
}
