package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.GameJoinRequest;
import com.ssafy.economius.game.dto.request.GameStartRequest;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.dto.response.GameStartResponse;
import com.ssafy.economius.game.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GameController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GameService gameService;

    @MessageMapping(value = "/{roomId}/join")
    public void join(@DestinationVariable int roomId, GameJoinRequest gameJoinRequest) {
        GameJoinResponse gameJoinResponse = gameService.join(roomId, gameJoinRequest.getPlayer());

        template.convertAndSend("/sub/" + roomId, gameJoinResponse);
    }

    @MessageMapping(value = "/{roomId}/start")
    public void start(@DestinationVariable int roomId, GameStartRequest gameStartRequest) {
        GameStartResponse gameStartResponse = gameService.start(roomId, gameStartRequest.getHostPlayer());
        template.convertAndSend("/sub/" + roomId, gameStartResponse);
    }

    @MessageMapping(value = "/{roomId}/enter")
    public void enter() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/calculate")
    public void calculate() {
        template.convertAndSend("");
    }

}
