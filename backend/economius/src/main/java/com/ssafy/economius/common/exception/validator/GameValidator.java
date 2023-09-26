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

    public void canBuy(int roomId, int money, int price) {
        if (money < price) {
            System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.CANNOT_BUY.getCode())
                    .message(GameRoomMessage.CANNOT_BUY.getMessage())
                    .build();
        }
    }

    public void throwBankruptcyResponse(int roomId, Long player) {
        throw CustomWebsocketException.builder()
                .roomId(roomId)
                .code(GameRoomMessage.PLAYER_BANKRUPTCY.getCode())
                .message(GameRoomMessage.PLAYER_BANKRUPTCY.getMessage() + ": 플레이어 아이디 " + player)
                .build();
    }

    public void throwNotExistPlayerResponse(int roomId, Long player) {
        throw CustomWebsocketException.builder()
                .roomId(roomId)
                .code(GameRoomMessage.PLAYER_NOT_EXIST.getCode())
                .message(GameRoomMessage.PLAYER_NOT_EXIST.getMessage() + ": 플레이어 아이디 " + player)
                .build();
    }
}
