package com.osds.bitz.model.network.response.game;

import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.gym.Gym;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.sql.Date;
import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameListResponse { // 메인에서 게임목록 보여주기 객체

    Game gameInfo; // 게임 정보

    Gym gymInfo; // 체육관 정보

}
