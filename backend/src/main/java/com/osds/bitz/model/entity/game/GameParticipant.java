package com.osds.bitz.model.entity.game;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.enumclass.UserState;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="gameparticipant")
@Builder
public class GameParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                // 게임참가자ID

    @Column(nullable = false)
    private Long gameId;            // 게임ID

    @OneToOne
    @JoinColumn(name="user_id")
    private UserAuth userId;          // 사용자

    @Enumerated(EnumType.STRING)
    private UserState state;        // 상태

    @Column(nullable = false)
    private int team;               // 팀

}
