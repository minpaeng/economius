package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.BuildingValidator;
import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.VisitBuildingDto;
import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.VisitBuildingRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.VisitBuildingResponse;
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
        portfolio.buyBuilding(buildingId, building);

        return BuyBuildingResponse.builder()
                .player(portfolio.getPlayer())
                .buildingId(buildingId)
                .changeAmount(building.getPrice())
                .moneyResult(portfolio.getMoney())
                .build();
    }

    private SellBuildingsResponse sellBuilding(Portfolio portfolio, int buildingId, Building building) {
        portfolio.sellBuilding(buildingId, building);

        return SellBuildingsResponse.builder()
                .player(portfolio.getPlayer())
                .buildingId(buildingId)
                .changeAmount(building.getPrice())
                .moneyResult(portfolio.getMoney())
                .build();
    }

    public VisitBuildingResponse visitBuilding(int roomId, VisitBuildingRequest visitBuildingRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Long playerId = visitBuildingRequest.getPlayer();
        int buildingId = visitBuildingRequest.getBuildingId();
        Building building = game.getBuildings().get(buildingId);
        Long ownerId = building.getOwnerId();

        payBuildingFee(playerId, ownerId, roomId, buildingId, game);
        VisitBuildingDto visitor = makeVisitBuildingDto(playerId, game.getPortfolios().get(playerId).getMoney());
        VisitBuildingDto owner = null;
        if (ownerId != null) owner = makeVisitBuildingDto(ownerId, game.getPortfolios().get(ownerId).getMoney());

        return VisitBuildingResponse.builder()
                .buildingId(buildingId)
                .changeAmount(building.getPrice())
                .visitor(visitor)
                .owner(owner)
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

    private void payBuildingFee(Long player, Long owner, int roomId, int buildingId, Game game) {
        if (owner == null || owner.equals(player)) return;
        checkBankruptcy(player, owner, roomId, buildingId, game);
        game.payBuildingFee(player, owner, buildingId);
        gameRepository.save(game);
    }

    private void checkBankruptcy(Long player, Long owner, int roomId, int buildingId, Game game) {
        int playerMoney = game.getPortfolios().get(player).getMoney();
        int buildingPrice = game.getBuildings().get(buildingId).getPrice();

        if (owner != null && !owner.equals(player) && playerMoney < buildingPrice) {
            game.proceedBankruptcy(player);
            gameRepository.save(game);
            gameValidator.throwBankruptcyResponse(roomId, player);
        }
    }

    private VisitBuildingDto makeVisitBuildingDto(Long player, int moneyResult) {
        return VisitBuildingDto.builder()
                .player(player)
                .moneyResult(moneyResult)
                .build();
    }
}
