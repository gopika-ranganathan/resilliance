package com.resilience.api.repository;

import com.resilience.api.model.AnimalRescueReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalRescueReportRepository extends JpaRepository<AnimalRescueReport, Long> {
}
