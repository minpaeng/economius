package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.GOLD_RATE_UPPER_BOUND;

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
public class GameEngine {

    // 다음 플레이어가 누구인지
    // 게임이 긑났는지
    // 새로운 정산이 있는지 전송
    private final SimpMessagingTemplate template;


    // 주사위가 굴려질때마다 확인해서 알맞은 서버 메시지 전송
    // 전송해야할 메시지를 구하는 컴포넌트

    // 경제 이슈 전조증상

    // 경제 이슈

    // 금리 등 가격 변동

    // 각 턴마다 금리, 주시, 금, 부동산 가격 변동

    public void run(Game game) {
        int gameTurn = game.updateGameTurn();
        if (gameTurn < 0){
            // todo: 게임 종료 로직
        }
        // 골드 변경
        updateNextGoldRate(game);

        // 금리 변동

        // 주식 변동

        // 부동산 가격 변동

        // 경제 이슈 전조증상
    }

    private void updateNextGoldRate(Game game) {
        Gold gold = game.getGold();

        RateRange range = RearrangeRateUtil.getRanges(
            GOLD_RATE_LOWER_BOUND.getValue(), GOLD_RATE_UPPER_BOUND.getValue());

        gold.updateGold(range.getLowRate(), range.getHighRate(), range.getClosingRate());
    }

}
