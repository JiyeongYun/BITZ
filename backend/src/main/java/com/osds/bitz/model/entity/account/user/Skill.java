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

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserAuth userAuth;  // 사용자ID

    private int winCnt;         // 이긴 횟수

    private int loseCnt;        // 진 횟수

    private int tieCnt;         // 무승부 횟수

    private int mvpCnt;         // mvp 횟수

}
