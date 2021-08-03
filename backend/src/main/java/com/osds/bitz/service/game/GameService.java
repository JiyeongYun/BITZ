package com.osds.bitz.service.game;

import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.gym.Gym;
import com.osds.bitz.model.network.request.GameRequest;
import com.osds.bitz.repository.game.GameRepository;
import com.osds.bitz.repository.gym.GymRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GymRepository gymRepository;

    // 게임 등록
    public Game createGame(GameRequest gameRequest) {

        // 체육관 이름을 통해 Gym객체를 받아온다.
        Gym gym = this.gymRepository.getGymByName(gameRequest.getGymName());

        // game테이블 내용 설정하기
        Game game = Game.builder()
                .gym(gym)
                .date(gameRequest.getDate())
                .startTime(gameRequest.getStartTime())
                .endTime(gameRequest.getEndTime())
                .minPeople(gameRequest.getMinPeople())
                .maxPeople(gameRequest.getMaxPeople())
                .participationFee(gameRequest.getParticipationFee())
                .build();

        return this.gameRepository.save(game); // 작업중

    }

}
