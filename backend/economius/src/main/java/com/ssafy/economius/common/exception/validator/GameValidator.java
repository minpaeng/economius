package com.ssafy.economius.common.exception.validator;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.message.GameRoomMessage;
import com.ssafy.economius.game.entity.redis.Game;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class GameValidator {

    public Game checkValidGameRoom(Optional<Game> game, int roomId) {
        log.error("방이 존재하지 않음: " + roomId);
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
            log.warn("보유 현금 부족: {보유한 현금: " + money + ", 금액: " + price + "}");
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.CANNOT_BUY.getCode())
                    .message(GameRoomMessage.CANNOT_BUY.getMessage())
                    .build();
        }
    }

    public void throwBankruptcyResponse(int roomId, Long player) {
        log.warn("플레이어 파산: " + player);
        throw CustomWebsocketException.builder()
                .roomId(roomId)
                .code(GameRoomMessage.PLAYER_BANKRUPTCY.getCode())
                .message(GameRoomMessage.PLAYER_BANKRUPTCY.getMessage() + ": 플레이어 아이디 " + player)
                .build();
    }

    public void throwNotExistPlayerResponse(int roomId, Long player) {
        log.error("플레이어가 존재하지 않음: " + player);
        throw CustomWebsocketException.builder()
                .roomId(roomId)
                .code(GameRoomMessage.PLAYER_NOT_EXIST.getCode())
                .message(GameRoomMessage.PLAYER_NOT_EXIST.getMessage() + ": 플레이어 아이디 " + player)
                .build();
    }

    public void checkCanJoin(Game game, int roomId, Long player) {
        checkRoomLimit(game, roomId);
        checkPlayer(game, roomId, player);
    }

    public void canStartGame(List<Long> players, Long hostPlayer, int roomId) {
        notHostRequest(roomId, hostPlayer, players);
        underStartLimit(players.size(), roomId);
    }

    private void checkRoomLimit(Game game, int roomId) {
        log.error(roomId + "번 방 인원 제한 초과");
        if (game.getPlayers().size() >= 4) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.ROOM_LIMIT.getCode())
                    .message(GameRoomMessage.ROOM_LIMIT.getMessage())
                    .build();
        }
    }

    private void checkPlayer(Game game, int roomId, Long player) {
        log.error("이미 참여중인 플레이어: {roomId: " + roomId + ", player: " + player + "}");
        if (game.getNicknames().containsKey(player)) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.ALREADY_JOIN_PLAYER.getCode())
                    .message(GameRoomMessage.ALREADY_JOIN_PLAYER.getMessage())
                    .build();
        }
    }

    private void notHostRequest(int roomId, Long hostPlayer, List<Long> players) {
        if (!players.get(0).equals(hostPlayer)) {
            log.error("호스트가 아닌 사용자의 요청: {요청자: " + hostPlayer + ", 방 호스트: " + players.get(0));
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.NOT_HOST_PLAYER.getCode())
                    .message(GameRoomMessage.NOT_HOST_PLAYER.getMessage())
                    .build();
        }
    }

    private void underStartLimit(int limit, int roomId) {
        if (limit != 4) {
            log.error("인원 부족: " + limit);
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(GameRoomMessage.UNDER_GAME_START_LIMIT.getCode())
                    .message(GameRoomMessage.UNDER_GAME_START_LIMIT.getMessage())
                    .build();
        }
    }
}
