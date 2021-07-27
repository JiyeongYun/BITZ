package com.osds.bitz.model.entity.account.user;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="favoritelocation")
@Builder
public class FavoriteLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;        // 선호지역ID

    @Column(nullable = false)
    private String userId;  // 유저ID

    private String sido1;   // 관심지역 시/도 - 1

    private String gugun1;  // 관심지역 구/군 - 1

    private String sido2;   // 관심지역 시/도 - 2

    private String gugun2;  // 관심지역 구/군 - 2

    private String sido3;   // 관심지역 시/도 - 3

    private String gugun3;  // 관심지역 구/군 - 3

}
