package com.ssafy.economius.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GoldController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @MessageMapping(value = "/{roomId}/buyGolds")
    public void buyGolds() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/sellGolds")
    public void sellGolds() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectGolds")
    public void selectGolds() {
        template.convertAndSend("");
    }


}
