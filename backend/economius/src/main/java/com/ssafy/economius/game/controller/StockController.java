package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyItemRequest;
import com.ssafy.economius.game.dto.request.BuyStockRequest;
import com.ssafy.economius.game.dto.request.SelectStockRequest;
import com.ssafy.economius.game.dto.request.SellStockRequest;
import com.ssafy.economius.game.dto.response.BuyItemResponse;
import com.ssafy.economius.game.dto.response.BuyStockResponse;
import com.ssafy.economius.game.dto.response.SelectStockResponse;
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
        log.info(roomId + ": buyStock 호출 -> " + buyStockRequest.toString());

        BuyStockResponse buyStockResponse = stockService.buyStock(roomId,
            buyStockRequest.getStockId(), buyStockRequest.getStockAmount(),
            buyStockRequest.getPlayer());

        log.info(roomId + ": buyStock 결과 -> " + buyStockResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "buyStock");
        template.convertAndSend("/sub/" + roomId, buyStockResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/sellStock")
    public void sellStock(@DestinationVariable int roomId, SellStockRequest sellStockRequest) {
        log.info(roomId + ": sellStock 호출 -> " + sellStockRequest.toString());

        SellStockResponse sellStockResponse = stockService.sellStock(roomId,
            sellStockRequest.getStockId(), sellStockRequest.getStockAmount(),
            sellStockRequest.getPlayer());

        log.info(roomId + ": sellStock 결과 -> " + sellStockResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "sellStock");
        template.convertAndSend("/sub/" + roomId, sellStockResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/buyItem")
    public void buyItem(@DestinationVariable int roomId, BuyItemRequest buyItemRequest) {
        log.info(roomId + ": buyItem 호출 -> " + buyItemRequest.toString());

        BuyItemResponse buyItemResponse = stockService.buyItem(roomId, buyItemRequest.getStockId(),
            buyItemRequest.getPlayer());

        log.info(roomId + ": buyItem 결과 -> " + buyItemResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "buyItem");
        template.convertAndSend("/sub/" + roomId, buyItemResponse, headers);
    }

    @MessageMapping(value = "/{roomId}/stockDetail")
    public void selectStock(@DestinationVariable int roomId,
        SelectStockRequest selectStockRequest) {
        log.info(roomId + ": stockDetail 호출 -> " + selectStockRequest.toString());

        SelectStockResponse selectStockResponse = stockService.stockDetail(roomId,
            selectStockRequest.getStockId());

        log.info(roomId + ": stockDetail 결과 -> " + selectStockResponse.toString());
        Map<String, Object> headers = Map.of("success", true, "type", "stockDetail");
        template.convertAndSend("/sub/" + roomId + "/" + selectStockRequest.getPlayer(),
            selectStockResponse, headers);
    }

}
