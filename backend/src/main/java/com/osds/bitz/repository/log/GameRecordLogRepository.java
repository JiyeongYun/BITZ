package com.osds.bitz.repository.log;

import com.osds.bitz.model.entity.log.GameRecordLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRecordLogRepository extends JpaRepository<GameRecordLog, Long> {
    GameRecordLog getGameRecordLogByGameId(Long gameId);
}
