package com.osds.bitz.repository.game;

import com.osds.bitz.model.game.GameRecord;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRecordRepository extends JpaRepository<GameRecord, String> {
}
