package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyStockRequest;
import com.ssafy.economius.game.dto.request.SellStockRequest;
import com.ssafy.economius.game.dto.response.BuyGoldResponse;
import com.ssafy.economius.game.dto.response.BuyStockResponse;
import com.ssafy.economius.game.dto.response.SellStockResponse;
import com.ssafy.economius.game.service.StockService;
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
public class StockController {

    private final SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
    private final StockService stockService;

    @MessageMapping(value = "/{roomId}/buyStock")
    public void buyStock(@DestinationVariable int roomId, BuyStockRequest buyStockRequest) {
        BuyStockResponse buyGoldResponse = stockService.buyStock(roomId,
            buyStockRequest.getStockId(),
            buyStockRequest.getStockAmount(), buyStockRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, buyGoldResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/sellStock")
    public void sellStock(@DestinationVariable int roomId, SellStockRequest sellStockRequest) {
        log.info("sellStock 호출");
        SellStockResponse sellStockResponse = stockService.sellStock(roomId,
            sellStockRequest.getStockId(), sellStockRequest.getStockAmount(),
            sellStockRequest.getPlayer());

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, sellStockResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/buyItem")
    public void buyItem() {
        template.convertAndSend("");
    }

    @MessageMapping(value = "/{roomId}/selectStock")
    public void selectStock() {
        template.convertAndSend("");
    }


    @MessageMapping(value = "/{roomId}/companyDetail")
    public void companyDetail() {
        template.convertAndSend("");
    }

}
