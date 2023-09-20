package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.message.DiceTurnMessage;
import com.ssafy.economius.game.dto.message.PlayerToRollDiceMessage;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Server
@Slf4j
@RequiredArgsConstructor
public class DiceService {

    private final GameRepository gameRepository;

    public void diceRoll(){

    }

    // 주사위 순서 표출
    public DiceTurnMessage getDiceSequence(int roomId){
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );

        return new DiceTurnMessage(game.getPlayerSequence());
    }

    // 주사위 굴릴턴인 사람에게 메시지 전송
    public PlayerToRollDiceMessage messagePlayerToRoll(int roomId) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );
        int gameTurn = game.getGameTurn();
        List<Long> playerSequence = game.getPlayerSequence();
        Long player = playerSequence.get(gameTurn % 4);

        return new PlayerToRollDiceMessage(player);
    }
}
