package com.resilience.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "food_centers")
public class FoodCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization_name", nullable = false)
    private String organizationName;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "food_type")
    private String foodType;

    @Column(name = "distribution_time")
    private String distributionTime;

    private String contact;

    private Double latitude;

    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
