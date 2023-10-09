package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.BuildingValidator;
import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.VisitBuildingDto;
import com.ssafy.economius.game.dto.request.BuyBuildingRequest;
import com.ssafy.economius.game.dto.request.VisitBuildingRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.VisitBuildingResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingResponse;
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

    public BuyBuildingResponse buyBuilding(int roomId, BuyBuildingRequest buyBuildingRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Long player = buyBuildingRequest.getPlayer();
        Portfolio portfolio = game.getPortfolios().get(player);
        int buildingId = buyBuildingRequest.getBuildingId();
        Building building = game.getBuildings().get(buildingId);

        BuyBuildingResponse response = makeBuyBuildingResponse(roomId, player, portfolio, buildingId, building);
        gameRepository.save(game);
        return response;
    }

    public SellBuildingResponse sellBuilding(int roomId, SellBuildingRequest sellBuildingRequest) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Long player = sellBuildingRequest.getPlayer();
        Portfolio portfolio = game.getPortfolios().get(player);
        int buildingId = sellBuildingRequest.getBuildingId();
        Building building = game.getBuildings().get(buildingId);

        SellBuildingResponse response = makeSellBuildingResponse(roomId, player, portfolio, buildingId, building);
        gameRepository.save(game);
        return response;
    }

    private BuyBuildingResponse makeBuyBuildingResponse(int roomId, Long player, Portfolio portfolio,
                                            int buildingId, Building building) {
        buildingValidator.checkBuildingBuyingStatus(player, roomId, building);
        gameValidator.canBuy(roomId, portfolio.getMoney(), building.getPrice());
        portfolio.buyBuilding(player, buildingId, building);

        return BuyBuildingResponse.builder()
                .player(portfolio.getPlayer())
                .buildingId(buildingId)
                .changeAmount(building.getPrice())
                .moneyResult(portfolio.getMoney())
                .build();
    }

    private SellBuildingResponse makeSellBuildingResponse(int roomId, Long player, Portfolio portfolio,
                                              int buildingId, Building building) {
        buildingValidator.checkBuildingSellingStatus(player, roomId, building);
        portfolio.sellBuilding(buildingId, building);

        return SellBuildingResponse.builder()
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

        int changeAmount = payBuildingFee(playerId, ownerId, roomId, buildingId, game);
        gameRepository.save(game);
        return makeVisitBuildingResponse(playerId, ownerId, buildingId, changeAmount, game);
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

    private int payBuildingFee(Long player, Long owner, int roomId, int buildingId, Game game) {
        checkBankruptcy(player, owner, roomId, buildingId, game);
        return game.payBuildingFee(player, owner, buildingId);
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

    private VisitBuildingResponse makeVisitBuildingResponse(Long playerId, Long ownerId, int buildingId,
                                                            int changeAmount, Game game) {
        VisitBuildingDto visitor = makeVisitBuildingDto(playerId, game);
        VisitBuildingDto owner = makeVisitBuildingDto(ownerId, game);

        return VisitBuildingResponse.builder()
                .player(playerId)
                .buildingId(buildingId)
                .buildingPrice(game.getBuildings().get(buildingId).getPrice())
                .changeAmount(changeAmount)
                .visitor(visitor)
                .owner(owner)
                .build();
    }

    private VisitBuildingDto makeVisitBuildingDto(Long player, Game game) {
        if (player == null) return null;
        int moneyResult = game.getPortfolios().get(player).getMoney();
        return VisitBuildingDto.builder()
                .player(player)
                .moneyResult(moneyResult)
                .build();
    }
}
