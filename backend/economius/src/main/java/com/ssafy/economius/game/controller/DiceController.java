package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.GameJoinRequest;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DiceController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GameService diceService;

//    @MessageMapping(value = "/{roomId}/join")
//    public void join(@DestinationVariable int roomId, GameJoinRequest gameJoinRequest) {
//        template.convertAndSend("/sub/" + roomId);
//    }

}
