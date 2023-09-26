package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.CalculateRequest;
import com.ssafy.economius.game.dto.request.GameJoinRequest;
import com.ssafy.economius.game.dto.request.GameRoomExitRequest;
import com.ssafy.economius.game.dto.request.GameStartRequest;
import com.ssafy.economius.game.dto.response.CalculateResponse;
import com.ssafy.economius.game.dto.response.FinishTurnResponse;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.dto.response.GameRoomExitResponse;
import com.ssafy.economius.game.service.GameService;
import com.ssafy.economius.game.service.FinishTurnService;

import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GameController {

    private final SimpMessagingTemplate template;
    private final GameService gameService;

    // todo 추후에 하나의 서비스로 통합 예정
    private final FinishTurnService finishTurnService;

    @MessageMapping(value = "/{roomId}/join")
    public void join(@DestinationVariable int roomId, GameJoinRequest gameJoinRequest) {
        GameJoinResponse gameJoinResponse = gameService.join(
                roomId,
                gameJoinRequest.getPlayer(),
                gameJoinRequest.getNickname());

        Map<String, Object> headers = Map.of("success", true, "type", "join");
        template.convertAndSend("/sub/" + roomId, gameJoinResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/start")
    public void start(@DestinationVariable int roomId, GameStartRequest gameStartRequest) {
        FinishTurnResponse gameStartResponse = gameService.start(roomId,
                gameStartRequest.getHostPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "start");
        template.convertAndSend("/sub/" + roomId, gameStartResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/exit")
    public void exit(@DestinationVariable int roomId, GameRoomExitRequest gameRoomExitRequest) {
        GameRoomExitResponse gameRoomExitResponse = gameService.exit(roomId,
                gameRoomExitRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "exit");
        template.convertAndSend("/sub/" + roomId, gameRoomExitResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/calculate")
    public void calculate(@DestinationVariable int roomId, CalculateRequest calculateRequest) {
        CalculateResponse calculateResponse = gameService.calculate(
                roomId, calculateRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true, "type", "calculate");
        template.convertAndSend("/sub/" + roomId, calculateResponse, headers);
    }


    @MessageMapping(value = "/{roomId}/finishTurn")
    public void finishTurn(@DestinationVariable int roomId) {
        FinishTurnResponse finishTurnResponse = finishTurnService.finish(roomId);

        Map<String, Object> headers = Map.of("success", true, "type", "finishTurn");
        template.convertAndSend("/sub/" + roomId, finishTurnResponse, headers);
    }
}
