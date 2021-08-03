package com.osds.bitz.service.game;

import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.network.request.GameRequest;
import com.osds.bitz.repository.game.GameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    // 게임 등록
    public Game createGame(GameRequest gameRequest) {

        return null; // 작업중
    }

}
