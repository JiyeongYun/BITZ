package com.osds.bitz.model.gym;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gymReview")
public class GymReview {

    @Id
    // PK 키

    @Column
    private String gymID; // 체육관ID
    private String uID; // 유저ID
    private String text; // 리뷰내용
    private int rate; // 평점
    private LocalDateTime date; // 날짜

}
