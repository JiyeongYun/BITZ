package com.osds.bitz.model.entity.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="skill")
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;            // 기술점수ID

    @Column(nullable = false)
    private String userId;      // 사용자ID

    @Column(nullable = false)
    private int winCnt;         // 이긴 횟수

    @Column(nullable = false)
    private int loseCnt;        // 진 횟수

    @Column(nullable = false)
    private int score;          // 점수

}
