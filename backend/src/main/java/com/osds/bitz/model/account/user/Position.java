package com.osds.bitz.model.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="position")
public class Position {

    @Id
    private String uID; // 유저ID

    @Column
    private int guard; // 가드
    private int center; // 센터
    private int forward; // 포워드

}
