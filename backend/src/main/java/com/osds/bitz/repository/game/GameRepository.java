
package com.osds.bitz.repository.game;


import com.osds.bitz.model.entity.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, String> {

}
