package com.osds.bitz.model.network.response.game;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.osds.bitz.model.entity.account.business.BusinessProfile;
import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.game.GameParticipant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameDetailResponse {                   // 게임상세 페이지 객체

    ArrayList<GameParticipant> gameParticipantList; // 게임 참여자들 정보

    Game gameInfo;                                  // 게임정보

    BusinessProfile businessProfile;                // 체육관 관장 정보
}
