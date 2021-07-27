package com.osds.bitz.model.entity.account.user;

import lombok.*;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "position")
@Builder
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;        // 유저ID

    private boolean guard;      // 가드

    private boolean center;     // 센터

    private boolean forward;    // 포워드

    @Column(nullable = false)
    private String userId; // 유저 ID
}
