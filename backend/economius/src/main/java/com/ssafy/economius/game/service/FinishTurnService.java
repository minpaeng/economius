package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.BUILDING_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.BUILDING_RATE_UPPER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_UPPER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.INTEREST_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.INTEREST_RATE_UPPER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.STOCK_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.STOCK_RATE_UPPER_BOUND;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RearrangeRateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

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
        }

        gameRepository.save(game);
        return game;
    }

    private void interestRateRearrange(Game game) {
        int newPrice = RearrangeRateUtil.getRanges(INTEREST_RATE_LOWER_BOUND.getValue(),
            INTEREST_RATE_UPPER_BOUND.getValue());
        game.getInterestRate().updateBuildingPrice(newPrice);
    }

    private void buildingRearrange(Game game) {
        int newRate = RearrangeRateUtil.getRanges(BUILDING_RATE_LOWER_BOUND.getValue(),
            BUILDING_RATE_UPPER_BOUND.getValue());
        game.getBuildings().values().forEach(building -> building.updateBuildingPrice(newRate));
    }

    private void goldRearrange(Game game) {
        int newRate = RearrangeRateUtil.getRanges(GOLD_RATE_LOWER_BOUND.getValue(),
            GOLD_RATE_UPPER_BOUND.getValue());
        game.getGold().updateGoldPrice(newRate);
    }

    private void stockRearrange(Game game, int round) {
        int newPrice = RearrangeRateUtil.getRanges(STOCK_RATE_LOWER_BOUND.getValue(),
            STOCK_RATE_UPPER_BOUND.getValue());
        game.getStocks().values().forEach(
            stock -> stock.updateStockPriceAndRate(newPrice, round));
    }
}
