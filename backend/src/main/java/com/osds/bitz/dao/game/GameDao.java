package com.osds.bitz.dao.game;

import com.osds.bitz.model.game.Game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameDao extends JpaRepository<Game, String> {
}
