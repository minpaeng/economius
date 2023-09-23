package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.EventCardRequest;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.EventCardResponse;
import com.ssafy.economius.game.service.EventService;
import com.sun.jdi.request.EventRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class EventController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final EventService eventService;

    @MessageMapping(value = "/{roomId}/eventCard")
    public void visitEventCard(@DestinationVariable int roomId, EventCardRequest eventCardRequest) {
        Map<String, Object> headers = Map.of("success", true);
        EventCardResponse eventCardResponse = eventService.visitEventCard(roomId, eventCardRequest);
        template.convertAndSend("/sub/" + roomId, eventCardResponse, headers);
    }


}
