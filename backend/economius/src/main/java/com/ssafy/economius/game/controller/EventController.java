package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.EventCardRequest;
import com.ssafy.economius.game.dto.response.EventCardResponse;
import com.ssafy.economius.game.service.EventService;
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

    private final SimpMessagingTemplate template;
    private final EventService eventService;

    @MessageMapping(value = "/{roomId}/eventCard")
    public void visitEventCard(@DestinationVariable int roomId) {
        Map<String, Object> headers = Map.of("success", true);
        EventCardResponse eventCardResponse = eventService.visitEventCard(roomId);
        template.convertAndSend("/sub/" + roomId, eventCardResponse, headers);
    }
}
