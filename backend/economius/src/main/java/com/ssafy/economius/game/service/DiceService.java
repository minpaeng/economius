package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_SIZE;
import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_UPPER_BOUND;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.message.DiceTurnMessage;
import com.ssafy.economius.game.dto.response.DiceRollResponse;
import com.ssafy.economius.game.dto.response.ViewMovementCardResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiceService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public ViewMovementCardResponse makeMovementCard(Long player) {
        /**
         * 플레이어의 턴이 맞는지 확인하는 로직
         * 게임 발리데이터에 할당
         */
        return new ViewMovementCardResponse(player,
            RandomUtil.getUniqueRandomNumbers(MOVEMENT_CARD_SIZE.getValue(),
                MOVEMENT_CARD_LOWER_BOUND.getValue(), MOVEMENT_CARD_UPPER_BOUND.getValue()));
    }


    // 주사위 순서 표출
    public DiceTurnMessage getDiceSequence(int roomId) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );

        return new DiceTurnMessage(game.getPlayerSequence());
    }

    public DiceRollResponse rollDice(int roomId, Long player) {
        Random random = new Random();
        int diceNumber = random.nextInt(6) + 1;

        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        int nextLocation = game.rearrangePlayer(diceNumber, player);

        gameRepository.save(game);
        return DiceRollResponse.builder()
            .location(nextLocation)
            .moveCount(diceNumber)
            .player(player)
            .build();
    }
}
