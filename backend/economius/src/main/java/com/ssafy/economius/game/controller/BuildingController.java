package com.ssafy.economius.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BuildingController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달


    @MessageMapping(value = "/{roomId}/payFee")
    public void payFee() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/buyBuildings")
    public void buyBuildings() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/sellBuildings")
    public void sellBuildings() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectBuilding")
    public void selectBuilding() {
        template.convertAndSend("");
    }



}
