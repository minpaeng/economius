package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FinishTurnService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public Game finish(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        int gameTurn = game.updateGameTurn();
        int size = game.getPlayers().size();

        // todo 각종 이벤트 로직 구현



        if (gameTurn % size == 0) {

        }

        gameRepository.save(game);
        return game;
    }
}
