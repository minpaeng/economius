package com.ssafy.economius.game.service;

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
        int newPrice = RearrangeRateUtil.getRanges(STOCK_RATE_LOWER_BOUND.getValue(),
            STOCK_RATE_UPPER_BOUND.getValue());

        game.getStocks().values().forEach(
            stock -> stock.updateStockPriceAndRate(newPrice, round));

//        if (gameTurn % 4 == 0) {
//
//        }

        gameRepository.save(game);
        return game;
    }
}
