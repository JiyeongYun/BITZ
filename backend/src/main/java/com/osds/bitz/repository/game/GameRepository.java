
package com.osds.bitz.repository.game;


import com.osds.bitz.model.entity.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;

public interface GameRepository extends JpaRepository<Game, String> {

    // 게임 아이디로 게임정보
    Game getGameById(Long id);

    // 날짜로 게임목록 찾아오기
    ArrayList<Game> getGamesByDate(Date date);

    // 게임 아이디로 삭제
    @Transactional
    void deleteAllById(Long id);
}
