package com.ssafy.economius.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GameController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

    @MessageMapping(value = "/{roomId}/enter")
    public void enter() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/calculate")
    public void calculate() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/buyStock")
    public void buyStock(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/sellStock")
    public void sellStock(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/buyItem")
    public void buyItem(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectStock")
    public void selectStock(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/joinSavings")
    public void joinSavings(){
        template.convertAndSend("");
    }


    @MessageMapping(value = "/{roomId}/stopSavings")
    public void earlyFinishSavings(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/joinInsurance")
    public void joinInsurance(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/finishInsurance")
    public void finishInsurance(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/payFee")
    public void payFee(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/buyBuildings")
    public void buyBuildings(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/sellBuildings")
    public void sellBuildings(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectBuilding")
    public void selectBuilding(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/buyGolds")
    public void buyGolds(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/sellGolds")
    public void sellGolds(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectGolds")
    public void selectGolds(){
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/companyDetail")
    public void companyDetail(){
        template.convertAndSend("");
    }

}
