package com.resilience.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "shelters")
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    private Integer capacity;

    @Column(name = "available_beds")
    private Integer availableBeds;

    private String contact;

    private Double latitude;

    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
