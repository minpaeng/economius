package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.PayFeeRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.PayFeeResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingsResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BuildingService {
    private final GameValidator gameValidator;
    private final GameRepository gameRepository;

    public PayFeeResponse payFee(int roomId, PayFeeRequest payFeeRequest) {

        return PayFeeResponse.builder().build();
    }

    public BuyBuildingResponse buyBuildings(int roomId, BuyBuildingsRequest buyBuildingsRequest) {
        return BuyBuildingResponse.builder().build();
    }

    public SellBuildingsResponse sellBuildings(int roomId, SellBuildingsRequest sellBuildingsRequest) {
        return SellBuildingsResponse.builder()
                .build();
    }

    public SelectBuildingResponse selectBuilding(int roomId, SelectBuildingRequest selectBuildingRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        int buildingId = selectBuildingRequest.getBuildingId();
        Long buildingOwnerPlayer = game.getBuildings().get(buildingId).getOwnerId();

        return SelectBuildingResponse.builder()
                .player(selectBuildingRequest.getPlayer())
                .buildingId(selectBuildingRequest.getBuildingId())
                .buildingOwnerPlayer(buildingOwnerPlayer)
                .build();
    }
}
