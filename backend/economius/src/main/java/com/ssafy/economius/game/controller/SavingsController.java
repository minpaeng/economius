package com.ssafy.economius.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SavingsController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달


    @MessageMapping(value = "/{roomId}/joinSavings")
    public void joinSavings() {
        template.convertAndSend("");
    }


    @MessageMapping(value = "/{roomId}/stopSavings")
    public void earlyFinishSavings() {
        template.convertAndSend("");
    }

}
