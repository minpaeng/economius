package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyBuildingRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingRequest;
import com.ssafy.economius.game.dto.request.VisitBuildingRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingResponse;
import com.ssafy.economius.game.dto.response.VisitBuildingResponse;
import com.ssafy.economius.game.service.BuildingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BuildingController {

    private final SimpMessagingTemplate template;
    private final BuildingService buildingService;

    @MessageMapping(value = "/{roomId}/buyBuilding")
    public void buyBuilding(@DestinationVariable int roomId,
                             @Payload BuyBuildingRequest buyBuildingRequest) {

        BuyBuildingResponse responseDto = buildingService.buyBuilding(roomId, buyBuildingRequest);

        Map<String, Object> headers = Map.of("success", true, "type", "buyBuilding");
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/sellBuilding")
    public void sellBuilding(@DestinationVariable int roomId,
                              @Payload SellBuildingRequest sellBuildingRequest) {
        log.info(sellBuildingRequest.toString());
        SellBuildingResponse responseDto = buildingService.sellBuilding(roomId, sellBuildingRequest);

        Map<String, Object> headers = Map.of("success", true, "type", "sellBuilding");
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/visitBuilding")
    public void visitBuilding(@DestinationVariable int roomId,
                               @Payload VisitBuildingRequest visitBuildingRequest) {

        log.info("roomId: " + roomId + ", dto: " + visitBuildingRequest);
        VisitBuildingResponse responseDto = buildingService.visitBuilding(roomId, visitBuildingRequest);

        Map<String, Object> headers = Map.of("success", true, "type", "visitBuilding");
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/selectBuilding")
    public void selectBuilding(@DestinationVariable int roomId,
                               @Payload SelectBuildingRequest selectBuildingRequest) {
        log.info(selectBuildingRequest.toString());
        SelectBuildingResponse responseDto = buildingService.selectBuilding(roomId, selectBuildingRequest);

        Long player = selectBuildingRequest.getPlayer();
        Map<String, Object> headers = Map.of("success", true, "type", "selectBuilding");
        template.convertAndSend("/sub/" + roomId + "/" + player, responseDto, headers);
    }
}
