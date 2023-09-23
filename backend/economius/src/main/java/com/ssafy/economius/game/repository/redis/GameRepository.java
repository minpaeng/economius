package com.ssafy.economius.game.repository.redis;

import com.ssafy.economius.game.entity.redis.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Integer> {

}
