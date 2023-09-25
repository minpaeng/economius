package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyGoldRequest;
import com.ssafy.economius.game.dto.request.GoldSelectRequest;
import com.ssafy.economius.game.dto.request.SellGoldRequest;
import com.ssafy.economius.game.dto.response.BuyGoldResponse;
import com.ssafy.economius.game.dto.response.GoldSelectResponse;
import com.ssafy.economius.game.dto.response.SellGoldResponse;
import com.ssafy.economius.game.service.GoldService;
import java.util.Map;
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
        log.info(roomId + ": buyGolds 호출 -> " + buyGoldRequest.toString());

        BuyGoldResponse buyGoldResponse = goldService.buyGold(
            roomId, buyGoldRequest.getPlayer(), buyGoldRequest.getGoldAmount());

        log.info(roomId + ": buyGolds 결과 -> " + buyGoldResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "buyGolds");
        template.convertAndSend("/sub/" + roomId, buyGoldResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/sellGolds")
    public void sellGolds(@DestinationVariable int roomId, SellGoldRequest sellGoldRequest) {
        log.info(roomId + ": sellGolds 호출 -> " + sellGoldRequest.toString());

        SellGoldResponse sellGoldResponse = goldService.sellGold(
            roomId, sellGoldRequest.getPlayer(), sellGoldRequest.getGoldAmount());

        log.info(roomId + ": sellGolds 결과 -> " + sellGoldResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "sellGolds");
        template.convertAndSend("/sub/" + roomId, sellGoldResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/selectGolds")
    public void selectGolds(@DestinationVariable int roomId, GoldSelectRequest goldSelectRequest) {
        log.info(roomId + ": selectGolds 호출 -> " + goldSelectRequest.toString());

        GoldSelectResponse goldSelectResponse = goldService.selectGold(roomId,
            goldSelectRequest.getPlayer());

        log.info(roomId + ": selectGolds 결과 -> " + goldSelectResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "selectGolds");
        template.convertAndSend("/sub/" + roomId + "/" + goldSelectRequest.getPlayer(),
            goldSelectResponse, headers);
    }


}
