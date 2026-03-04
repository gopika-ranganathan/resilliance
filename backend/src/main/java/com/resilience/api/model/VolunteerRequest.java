package com.resilience.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "volunteer_requests")
public class VolunteerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "organization_name", nullable = false)
    private String organizationName;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "help_type")
    private String helpType;

    @Column(name = "volunteers_needed")
    private Integer volunteersNeeded;

    private String contact;

    private Double latitude;

    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
