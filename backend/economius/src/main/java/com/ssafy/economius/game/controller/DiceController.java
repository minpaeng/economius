package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.MovePlayerRequest;
import com.ssafy.economius.game.dto.request.ViewMovementCardRequest;
import com.ssafy.economius.game.dto.response.MovePlayerResponse;
import com.ssafy.economius.game.dto.response.ViewMovementCardResponse;
import com.ssafy.economius.game.service.DiceService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class DiceController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final DiceService diceService;

    @MessageMapping(value = "/{roomId}/viewMovementCard")
    public void viewMovementCard(@DestinationVariable int roomId,
        ViewMovementCardRequest viewMovementCardRequest) {
        log.info("roomId : " + roomId + " -> viewMovementCard 호출");

        ViewMovementCardResponse viewMovementCardResponse = diceService.makeMovementCard(
            viewMovementCardRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, viewMovementCardResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/movePlayer")
    public void movePlayer(@DestinationVariable int roomId, MovePlayerRequest movePlayerRequest) {
        log.info("roomId : " + roomId + " -> movePlayer 호출");

        MovePlayerResponse movePlayerResponse = diceService.movePlayer(roomId,
            movePlayerRequest.getPlayer(), movePlayerRequest.getMovementCount());

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, movePlayerResponse, headers);
    }

}
