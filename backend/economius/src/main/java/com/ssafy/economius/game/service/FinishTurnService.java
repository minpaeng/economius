package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_UPPER_BOUND;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RearrangeRateUtil;
import com.ssafy.economius.game.util.RearrangeRateUtil.RateRange;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FinishTurnService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

//    public void run(Game game) {
//        int gameTurn = game.updateGameTurn();
//        if (gameTurn < 0){
//            // todo: 게임 종료 로직
//        }
//        // 골드 변경
//        updateNextGoldRate(game);
//    }
//
//    private void updateNextGoldRate(Game game) {
//        Gold gold = game.getGold();
//
//        RateRange range = RearrangeRateUtil.getRanges(
//            GOLD_RATE_LOWER_BOUND.getValue(), GOLD_RATE_UPPER_BOUND.getValue());
//
//        gold.updateGold(range.getLowRate(), range.getHighRate(), range.getClosingRate());
//    }

    public Game finish(int roomId){
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        int gameTurn = game.updateGameTurn();

        // todo 각종 이벤트 로직 구현


        gameRepository.save(game);
        return game;
    }
}
