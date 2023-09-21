package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.SavingVisitResponse;
import com.ssafy.economius.game.dto.response.SavingResponse;
import com.ssafy.economius.game.service.SavingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SavingController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final SavingService savingService;

    @MessageMapping(value = "/{roomId}/bank")
    public void visitBank(@DestinationVariable int roomId, SavingRequest savingRequest) {
        SavingVisitResponse savingVisitResponse = savingService.visitBank(roomId, savingRequest);
        template.convertAndSend("/sub/" + roomId, savingVisitResponse);
    }

    @MessageMapping(value = "/{roomId}/bank/join")
    public void joinSavings(@DestinationVariable int roomId, SavingRequest savingRequest) {
        SavingResponse savingResponse = savingService.joinSavings(roomId, savingRequest);
        template.convertAndSend("/sub/" + roomId, savingResponse);
    }


    @MessageMapping(value = "/{roomId}/bank/stop")
    public void stopSavings(@DestinationVariable int roomId, SavingRequest savingRequest) {
        SavingResponse savingResponse = savingService.stopSavings(roomId, savingRequest);
        template.convertAndSend("/sub/" + roomId, savingResponse);
    }

}
