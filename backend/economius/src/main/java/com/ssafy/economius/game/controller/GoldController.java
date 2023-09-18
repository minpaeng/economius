package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyGoldRequest;
import com.ssafy.economius.game.dto.response.BuyGoldResponse;
import com.ssafy.economius.game.service.GoldService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GoldController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final GoldService goldService;

    @MessageMapping(value = "/{roomId}/buyGolds")
    public void buyGolds(@DestinationVariable int roomId, BuyGoldRequest buyGoldRequest) {
        BuyGoldResponse buyGoldResponse = goldService.buyGold(roomId, buyGoldRequest);
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
