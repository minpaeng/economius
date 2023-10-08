package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.message.DiceTurnMessage;
import com.ssafy.economius.game.dto.request.MovePlayerRequest;
import com.ssafy.economius.game.dto.request.ViewMovementCardRequest;
import com.ssafy.economius.game.dto.response.MovePlayerResponse;
import com.ssafy.economius.game.dto.response.ViewMovementCardResponse;
import com.ssafy.economius.game.repository.redis.GameRepository;
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
    private final GameRepository gameRepository;

    @MessageMapping(value = "/{roomId}/diceSequence")
    public void getDiceSequence(@DestinationVariable int roomId) {
        log.info(roomId + ": diceSequence 호출");

        DiceTurnMessage diceSequence = diceService.getDiceSequence(roomId);

        log.info(roomId + ": diceSequence 결과 -> " + diceSequence.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "diceSequence");
        template.convertAndSend("/sub/" + roomId, diceSequence, headers);
    }

    @MessageMapping(value = "/{roomId}/viewMovementCard")
    public void viewMovementCard(@DestinationVariable int roomId,
        ViewMovementCardRequest viewMovementCardRequest) {
        log.info(roomId + ": viewMovementCard 호출 -> " + viewMovementCardRequest.toString());

        ViewMovementCardResponse viewMovementCardResponse = diceService.makeMovementCard(
            viewMovementCardRequest.getPlayer());

        log.info(roomId + ": viewMovementCard 결과 -> " + viewMovementCardResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "viewMovementCard");
        template.convertAndSend("/sub/" + roomId, viewMovementCardResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/movePlayer")
    public void movePlayer(@DestinationVariable int roomId, MovePlayerRequest movePlayerRequest) {
        log.info(roomId + ": movePlayer 호출 -> " + movePlayerRequest.toString());

        MovePlayerResponse movePlayerResponse = diceService.movePlayer(roomId,
            movePlayerRequest.getPlayer(), movePlayerRequest.getMovementCount());

        log.info(roomId + ": movePlayer 결과 -> " + movePlayerResponse.toString() +
                ", 다음 차례: " + gameRepository.findById(roomId).get().getCurrentPlayerToRoll());
        Map<String, Object> headers = Map.of("success", true, "type", "movePlayer");
        template.convertAndSend("/sub/" + roomId, movePlayerResponse, headers);
    }

}
