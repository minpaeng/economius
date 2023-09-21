package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.request.VisitBuildingRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingsResponse;
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

    @MessageMapping(value = "/{roomId}/buyBuildings")
    public void buyBuildings(@DestinationVariable int roomId,
                             @Payload BuyBuildingsRequest buyBuildingsRequest) {

        BuyBuildingResponse responseDto = buildingService.buyBuildings(roomId, buyBuildingsRequest);

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/sellBuildings")
    public void sellBuildings(@DestinationVariable int roomId,
                              @Payload SellBuildingsRequest sellBuildingsRequest) {

        SellBuildingsResponse responseDto = buildingService.sellBuildings(roomId, sellBuildingsRequest);

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/visitBuilding")
    public void visitBuilding(@DestinationVariable int roomId,
                               @Payload VisitBuildingRequest visitBuildingRequest) {

        VisitBuildingResponse responseDto = buildingService.visitBuilding(roomId, visitBuildingRequest);

        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId, responseDto, headers);
    }

    @MessageMapping(value = "/{roomId}/selectBuilding")
    public void selectBuilding(@DestinationVariable int roomId,
                               @Payload SelectBuildingRequest selectBuildingRequest) {

        SelectBuildingResponse responseDto = buildingService.selectBuilding(roomId, selectBuildingRequest);

        Long player = selectBuildingRequest.getPlayer();
        Map<String, Object> headers = Map.of("success", true);
        template.convertAndSend("/sub/" + roomId + "/" + player, responseDto, headers);
    }
}
