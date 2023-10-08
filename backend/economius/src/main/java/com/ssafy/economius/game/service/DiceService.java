package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.message.DiceTurnMessage;
import com.ssafy.economius.game.dto.response.MovePlayerResponse;
import com.ssafy.economius.game.dto.response.ViewMovementCardResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DiceService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    private List<Integer> cardFixList = new ArrayList<>(Arrays.asList(3, 4, 16));
    public ViewMovementCardResponse makeMovementCard(Long player) {
        /**
         * 플레이어의 턴이 맞는지 확인하는 로직
         * 게임 발리데이터에 할당
         */
//        return new ViewMovementCardResponse(player,
//            RandomUtil.getUniqueRandomNumbers(MOVEMENT_CARD_SIZE.getValue(),
//                MOVEMENT_CARD_LOWER_BOUND.getValue(), MOVEMENT_CARD_UPPER_BOUND.getValue()));
        return new ViewMovementCardResponse(player, cardFixList);
    }


    // 주사위 순서 표출
    public DiceTurnMessage getDiceSequence(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        return new DiceTurnMessage(game.getPlayerSequence());
    }

    public synchronized MovePlayerResponse movePlayer(int roomId, Long player, int movementCount) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        gameValidator.checkMovePlayerStatus(player, roomId, game.getCurrentPlayerToRoll());

        int nextLocation = game.rearrangePlayer(movementCount, player);
        game.updatePlayerToRoll();
        gameRepository.save(game);

        return MovePlayerResponse.builder()
            .location(nextLocation)
            .movementCount(movementCount)
            .player(player)
            .build();
    }
}
