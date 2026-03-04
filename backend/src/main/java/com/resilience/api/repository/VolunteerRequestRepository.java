package com.resilience.api.repository;

import com.resilience.api.model.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolunteerRequestRepository extends JpaRepository<VolunteerRequest, Long> {
}
