package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.BuildingValidator;
import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.PayFeeRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.PayFeeResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingsResponse;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BuildingService {

    private final BuildingValidator buildingValidator;
    private final GameValidator gameValidator;
    private final GameRepository gameRepository;

    public PayFeeResponse payFee(int roomId, PayFeeRequest payFeeRequest) {

        return PayFeeResponse.builder().build();
    }

    public BuyBuildingResponse buyBuildings(int roomId, BuyBuildingsRequest buyBuildingsRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Long player = buyBuildingsRequest.getPlayer();
        Portfolio portfolio = game.getPortfolios().get(player);
        int buildingId = buyBuildingsRequest.getBuildingId();
        Building building = game.getBuildings().get(buildingId);

        buildingValidator.checkBuildingBuyingStatus(player, roomId, building);
        gameValidator.canBuy(roomId, portfolio.getMoney(), building.getPrice());
        BuyBuildingResponse response = buyBuilding(portfolio, buildingId, building);
        gameRepository.save(game);
        return response;
    }

    public SellBuildingsResponse sellBuildings(int roomId, SellBuildingsRequest sellBuildingsRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Long player = sellBuildingsRequest.getPlayer();
        Portfolio portfolio = game.getPortfolios().get(player);
        int buildingId = sellBuildingsRequest.getBuildingId();
        Building building = game.getBuildings().get(buildingId);

        buildingValidator.checkBuildingSellingStatus(player, roomId, building);
        SellBuildingsResponse response = sellBuilding(portfolio, buildingId, building);
        gameRepository.save(game);
        return response;
    }

    private BuyBuildingResponse buyBuilding(Portfolio portfolio, int buildingId, Building building) {
        int beforeMoney = portfolio.getMoney();
        portfolio.buyBuilding(buildingId, building);
        int afterMoney = portfolio.getMoney();

        return BuyBuildingResponse.builder()
                .player(portfolio.getPlayer())
                .buildingId(buildingId)
                .changeAmount(beforeMoney - afterMoney)
                .moneyResult(afterMoney)
                .build();
    }

    private SellBuildingsResponse sellBuilding(Portfolio portfolio, int buildingId, Building building) {
        int beforeMoney = portfolio.getMoney();
        portfolio.sellBuilding(buildingId, building);
        int afterMoney = portfolio.getMoney();

        return SellBuildingsResponse.builder()
                .player(portfolio.getPlayer())
                .buildingId(buildingId)
                .changeAmount(beforeMoney - afterMoney)
                .moneyResult(afterMoney)
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
