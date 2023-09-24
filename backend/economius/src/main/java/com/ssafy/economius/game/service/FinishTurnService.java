package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.ssafy.economius.game.enums.RateEnum.*;

@Component
@RequiredArgsConstructor
public class FinishTurnService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public Game finish(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        int gameTurn = game.updateGameTurn();
        int round = gameTurn / 4;

        // todo 각종 이벤트 로직 구현
        // 주식가격 재 산정
        stockRearrange(game, round);
        // 새로운 라운드일경우
        if (gameTurn % 4 == 0) {
            goldRearrange(game);
            buildingRearrange(game);
            interestRateRearrange(game);

            changePrevIssue(game, round);
            checkIssueRound(game, round);
        }

        gameRepository.save(game);
        return game;
    }

    private void changePrevIssue(Game game, int round) {
        if (round % 4 != 3) return;
        int idx = game.getIssueIdx() + 1;
        game.setIssueIdx(idx);
        game.setCurrentPrevIssue(
                InitialData.getPrevIssue(game.getIssues().get(idx).getIssueId()));
        game.setCurrentIssue(null);
    }

    private void checkIssueRound(Game game, int round) {
        if (round % 4 != 0) return;
        game.setCurrentIssue(game.getIssues().get(game.getIssueIdx()));
    }

    private void interestRateRearrange(Game game) {
        int newPrice = RandomUtil.getRanges(INTEREST_RATE_LOWER_BOUND.getValue(),
            INTEREST_RATE_UPPER_BOUND.getValue());
        game.getInterestRate().updateBuildingPrice(newPrice);
    }

    private void buildingRearrange(Game game) {
        game.getBuildings().values().forEach(building -> building.updateBuildingPrice(
            RandomUtil.getRanges(BUILDING_RATE_LOWER_BOUND.getValue(),
                BUILDING_RATE_UPPER_BOUND.getValue())));
    }

    private void goldRearrange(Game game) {
        int newRate = RandomUtil.getRanges(GOLD_RATE_LOWER_BOUND.getValue(),
            GOLD_RATE_UPPER_BOUND.getValue());
        game.getGold().updateGoldPrice(newRate);
    }

    private void stockRearrange(Game game, int round) {
        game.getStocks().values().forEach(
            stock -> stock.updateStockPriceAndRate(RandomUtil.getRanges
                (STOCK_RATE_LOWER_BOUND.getValue(), STOCK_RATE_UPPER_BOUND.getValue()), round));
    }
}
