
package com.osds.bitz.repository.game;


import com.osds.bitz.model.entity.game.Game;
import com.osds.bitz.model.entity.gym.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.ArrayList;

public interface GameRepository extends JpaRepository<Game, Long> {

    // 게임 아이디로 게임정보
    Game getGameById(Long id);

    // 체육관으로 게임 리스트 가져오기
    ArrayList<Game> getGamesByGym(Gym gym);

    // 날짜로 게임 리스트 가져오기
    ArrayList<Game> getGamesByDate(Date date);

    // 게임 아이디로 삭제
    @Transactional
    void deleteAllById(Long id);


}
