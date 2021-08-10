package com.osds.bitz.model.entity.gym;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gymreview")
@Builder
public class GymReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;           // 체육관리뷰ID

    @Column(nullable = false)
    private Long gymId;         // 체육관ID

    @Column(nullable = false)
    private String userId;      // 유저ID

    private int rate;           // 평점

    @Column(nullable = false)
    private LocalDateTime date; // 날짜

}
