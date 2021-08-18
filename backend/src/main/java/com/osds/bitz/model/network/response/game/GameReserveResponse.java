package com.osds.bitz.model.network.response.game;


import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.game.GameParticipant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameReserveResponse {

    Game gameInfo;

    GameParticipant gameParticipant;
}
