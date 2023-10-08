package com.ssafy.economius.common.handler;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.CustomWebsocketRoomException;
import com.ssafy.economius.common.exception.NotPlayerToRollException;
import com.ssafy.economius.common.exception.message.GameRoomMessage;
import com.ssafy.economius.common.exception.response.AlreadyJoinResponse;
import com.ssafy.economius.common.exception.response.NotPlayerToRollResponse;
import com.ssafy.economius.common.exception.response.WebsocketErrorResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Map;

@RequiredArgsConstructor
@ControllerAdvice
public class WebSocketExceptionHandler {

    private final SimpMessagingTemplate template;
    private final GameRepository gameRepository;

    @MessageExceptionHandler(NotPlayerToRollException.class)
    public void handleNotPlayerToRollException(NotPlayerToRollException e) {
        Game game = gameRepository.findById(e.getRoomId()).get();

        template.convertAndSend(
            "/sub/" + e.getRoomId(),
            NotPlayerToRollResponse.builder()
                    .code(e.getCode())
                    .message(e.getMessage())
                    .roomId(e.getRoomId())
                    .requestPlayer(e.getRequestPlayer())
                    .playerToRoll(e.getPlayerToRoll()),
            Map.of("success", false, "type", "finishTurn"));
    }

    @MessageExceptionHandler(CustomWebsocketException.class)
    public void handleCustomException(CustomWebsocketException e) {
        template.convertAndSend(
            "/sub/" + e.getRoomId(),
            WebsocketErrorResponse.builder()
                .code(e.getCode())
                .message(e.getMessage())
                .build(),
            Map.of("success", false));
    }

    @MessageExceptionHandler(CustomWebsocketRoomException.class)
    public void handleRoomJoinException(CustomWebsocketRoomException e) {
        if (e.getCode() == GameRoomMessage.GAME_NOT_EXIST.getCode()) sendGameNotExist(e);
        else if (e.getCode() == GameRoomMessage.ALREADY_JOIN_PLAYER.getCode()) sendAlreadyJoinPlayer(e);
    }

    private void sendGameNotExist(CustomWebsocketRoomException e) {
        template.convertAndSend(
                "/sub/player/" + e.getPlayer(),
                WebsocketErrorResponse.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build(),
                Map.of("success", false));
    }

    private void sendAlreadyJoinPlayer(CustomWebsocketRoomException e) {
        template.convertAndSend(
                "/sub/player/" + e.getPlayer(),
                AlreadyJoinResponse.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .players(e.getPlayers())
                        .nicknames(e.getNicknames())
                        .hostPlayer(e.getHostPlayer())
                        .build(),
                Map.of("success", false));
    }
}
