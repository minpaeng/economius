package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_LOWER_BOUND;
import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_SIZE;
import static com.ssafy.economius.game.enums.RateEnum.MOVEMENT_CARD_UPPER_BOUND;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.message.DiceTurnMessage;
import com.ssafy.economius.game.dto.response.MovePlayerResponse;
import com.ssafy.economius.game.dto.response.ViewMovementCardResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
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
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        return new DiceTurnMessage(game.getPlayerSequence());
    }

    public MovePlayerResponse movePlayer(int roomId, Long player, int movementCount) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        int nextLocation = game.rearrangePlayer(movementCount, player);

        gameRepository.save(game);

        return MovePlayerResponse.builder()
            .location(nextLocation)
            .movementCount(movementCount)
            .player(player)
            .build();
    }
}
