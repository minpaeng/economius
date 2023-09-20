package com.ssafy.economius.common.exception.validator;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.message.GameRoomMessage;
import com.ssafy.economius.game.entity.redis.Game;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class GameValidator {

    public Game checkValidGameRoom(Optional<Game> game, int roomId) {
        if (game.isEmpty()) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.GAME_NOT_EXIST.getCode())
                    .message(GameRoomMessage.GAME_NOT_EXIST.getMessage())
                    .build();
        }

        return game.get();
    }

    public void  canBuy(int roomId, int money, int price) {
        if (money < price) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.CANNOT_BUY.getCode())
                    .message(GameRoomMessage.CANNOT_BUY.getMessage())
                    .build();
        }
    }
}
