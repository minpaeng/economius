package com.ssafy.economius.game.controller;

import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.PayFeeRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.PayFeeResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingsResponse;
import com.ssafy.economius.game.service.BuildingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class BuildingController {

    private final SimpMessagingTemplate template;
    private final BuildingService buildingService;

    @MessageMapping(value = "/{roomId}/payFee")
    public void payFee(@DestinationVariable int roomId,
                       @Payload PayFeeRequest payFeeRequest) {

        PayFeeResponse responseDto = buildingService.payFee(roomId, payFeeRequest);
        template.convertAndSend(roomId + "/payFee", responseDto);
    }

    @MessageMapping(value = "/{roomId}/buyBuildings")
    public void buyBuildings(@DestinationVariable int roomId,
                             @Payload BuyBuildingsRequest buyBuildingsRequest) {

        BuyBuildingResponse responseDto = buildingService.buyBuildings(roomId, buyBuildingsRequest);
        template.convertAndSend(roomId + "/buyBuildings", responseDto);
    }

    @MessageMapping(value = "/{roomId}/sellBuildings")
    public void sellBuildings(@DestinationVariable int roomId,
                              @Payload SellBuildingsRequest sellBuildingsRequest) {

        SellBuildingsResponse responseDto = buildingService.sellBuildings(roomId, sellBuildingsRequest);
        template.convertAndSend(roomId + "/sellBuildings", responseDto);
    }

    @MessageMapping(value = "/{roomId}/selectBuilding")
    public void selectBuilding(@DestinationVariable int roomId,
                               @Payload SelectBuildingRequest selectBuildingRequest) {

        SelectBuildingResponse responseDto = buildingService.selectBuilding(roomId, selectBuildingRequest);
        template.convertAndSend(roomId + "/selectBuilding", responseDto);
    }
}
