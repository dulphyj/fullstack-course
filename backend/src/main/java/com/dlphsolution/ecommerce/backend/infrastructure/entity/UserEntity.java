package com.dlphsolution.ecommerce.backend.infrastructure.entity;

import com.dlphsolution.ecommerce.backend.domain.model.UserType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    //@Column(name = "name")
    private String userName;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String address;
    private String cellphone;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserType userType;
    @CreationTimestamp
    private LocalDateTime dateCreated;
    @UpdateTimestamp
    private LocalDateTime dateUpdate;
}
