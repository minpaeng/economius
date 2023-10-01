package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.response.FinishTurnResponse;
import com.ssafy.economius.game.entity.redis.AssetChange;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.enums.VolatileEnum;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.ssafy.economius.game.enums.RateEnum.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class FinishTurnService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;
    private final ModelMapper modelMapper;

    public FinishTurnResponse finish(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        int gameTurn = game.updateGameTurn();
        int round = gameTurn / 4; // 1턴이 끝나면 -> gameTurn 1, round 0
        log.info("===" + gameTurn + "턴 종료, " + round + "라운드 시작 준비중===");

        // todo 각종 이벤트 로직 구현
        // 주식가격 재 산정
        stockRearrange(game, round);
        // 새로운 라운드일경우
        if (gameTurn % 4 == 0) {
            log.info("새로운 라운드 시작: " + round);
            goldRearrange(game);
            buildingRearrange(game);
            interestRateRearrange(game);

            changePrevIssue(game, round);
            checkIssueRound(game, round);
            applyIssueEffect(game, round);
        }

        gameRepository.save(game);
        return modelMapper.map(game, FinishTurnResponse.class);
    }

    private void changePrevIssue(Game game, int round) {
        // 0, 4, 8, 12, 16,
        if (round % 4 != 0) return;
        int idx = game.getIssueIdx() + 1;
        if (idx >= ISSUE_COUNT.getValue()) {
            game.setCurrentPrevIssues(null);
            return;
        }
        game.setIssueIdx(idx);
        game.setCurrentPrevIssues(
                InitialData.getPrevIssue(game.getIssues().get(idx).getIssueId()));
        game.setCurrentIssue(null);
    }

    private void checkIssueRound(Game game, int round) {
        if (round % 4 != 1 || game.getIssueIdx() >= ISSUE_COUNT.getValue()) return;
        game.setCurrentPrevIssues(null);
        game.setCurrentIssue(game.getIssues().get(game.getIssueIdx()));
    }

    private void applyIssueEffect(Game game, int round) {
        if (round % 4 == 0 || game.getIssueIdx() >= ISSUE_COUNT.getValue()) return;
        List<AssetChange> assetChanges = game.getIssues().get(game.getIssueIdx()).getCurrentAssetChanges();
        log.info("발생한 이슈: " + game.getIssues().get(game.getIssueIdx()).getName());
        for (AssetChange assetChange : assetChanges) {
            applyChanges(game, assetChange, round);
        }
    }

    private void applyChanges(Game game, AssetChange assetChange, int round) {
        String type = assetChange.getAssetType();
        int changeRate = assetChange.getChangeRate().getValue();
        log.info("경제 이슈 발생으로 인한 변동률: " + changeRate + "%, 변동 자산: "
                + type + ", 자산 아이디: " + assetChange.getAssetId());

        if (type.equals(VolatileEnum.GOLD.getValue())) {
            game.getGold().updateGoldPrice(changeRate);
        } else if (type.equals(VolatileEnum.INTEREST_RATE.getValue())) {
            game.getInterestRate().updateBuildingPrice(changeRate);
        } else if (type.equals(VolatileEnum.BUIDING.getValue())) {
            applyBuildingChanges(game, changeRate);
        } else if (type.equals(VolatileEnum.STOCK.getValue())) {
            applyStockChanges(game, assetChange.getAssetId(), changeRate, round);
        }
    }

    private void applyBuildingChanges(Game game, int changeRate) {
        log.info("이슈 발생 전 부동산 가격: " + game.getBuildings());
        for (int buildingId : game.getBuildings().keySet()) {
            updateBuildingPrice(changeRate, game, buildingId);
        }
        log.info("이슈 발생 후 부동산 가격: " + game.getBuildings());
    }

    private void applyStockChanges(Game game, int assetId, int changeRate, int round) {
        Stock stock = game.getStocks().get(assetId);
        updateStock(game, stock, changeRate, round);
    }

    private void interestRateRearrange(Game game) {
        int newPrice = RandomUtil.getRanges(INTEREST_RATE_LOWER_BOUND.getValue(),
                INTEREST_RATE_UPPER_BOUND.getValue());
        game.getInterestRate().updateBuildingPrice(newPrice);
    }

    private void buildingRearrange(Game game) {
        for (int buildingId : game.getBuildings().keySet()) {
            int newRate = RandomUtil.getRanges(BUILDING_RATE_LOWER_BOUND.getValue(),
                    BUILDING_RATE_UPPER_BOUND.getValue());
            updateBuildingPrice(newRate, game, buildingId);
        }
    }

    private void updateBuildingPrice(int newRate, Game game, int buildingId) {
        Building building = game.getBuildings().get(buildingId);
        building.updateBuildingPrice(newRate);
        if (building.getOwnerId() == null) return;
        game.getPortfolios().get(building.getOwnerId())
                .getBuildings().updateBuildingInfo(buildingId, building);
    }

    private void goldRearrange(Game game) {
        int newRate = RandomUtil.getRanges(GOLD_RATE_LOWER_BOUND.getValue(),
                GOLD_RATE_UPPER_BOUND.getValue());
        Gold gold = game.getGold();
        gold.updateGoldPrice(newRate);

        game.getPortfolios().values()
            .forEach(portfolio -> portfolio.getGold().updatePortfolioGold(gold.getPrice()));
    }

    private void stockRearrange(Game game, int round) {
        game.getStocks().values().forEach(stock -> {
            int newRate = RandomUtil.getRanges
                    (STOCK_RATE_LOWER_BOUND.getValue(), STOCK_RATE_UPPER_BOUND.getValue());
            updateStock(game, stock, newRate, round);
        });
    }

    private void updateStock(Game game, Stock stock, int newRate, int round) {
        stock.updateStockPriceAndRate(newRate, round);
        game.getPortfolios().values()
                .forEach(portfolio -> portfolio.getStocks().updatePortfolioStockByStockChange(stock));
    }
}
