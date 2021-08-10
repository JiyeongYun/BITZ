package com.osds.bitz.repository.game;


import com.osds.bitz.model.entity.game.GameRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface GameRecordRepository extends JpaRepository<GameRecord, String> {

    ArrayList<GameRecord> getGameRecordsByGameId(Long gameId);
}
