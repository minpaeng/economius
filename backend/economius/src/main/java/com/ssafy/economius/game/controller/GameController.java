package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.GameStartRequest;
import com.ssafy.economius.game.service.GameService;
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

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GameService gameService;

    @MessageMapping(value = "/{roomId}/start")
    public void start(@DestinationVariable int roomId, GameStartRequest gameStartRequest) {
        template.convertAndSend("");
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
