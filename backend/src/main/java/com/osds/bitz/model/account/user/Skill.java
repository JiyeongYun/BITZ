package com.osds.bitz.model.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="skill")
public class Skill {

    @Id
    private String uID; // 유저ID

    @Column
    private int winCnt; // 이긴 횟수
    private int loseCnt; // 진 횟수
    private int score; // 점수

}
