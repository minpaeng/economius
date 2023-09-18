package com.ssafy.economius.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Slf4j
@org.springframework.stereotype.Controller
@RequiredArgsConstructor
public class InsuranceController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @MessageMapping(value = "/{roomId}/joinInsurance")
    public void joinInsurance() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/finishInsurance")
    public void finishInsurance() {
        template.convertAndSend("");
    }

}
