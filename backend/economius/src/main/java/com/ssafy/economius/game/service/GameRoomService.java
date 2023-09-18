package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.InterestRate;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRepository gameRepository;

    private static final int INITIAL_INTEREST_RATE = 3;

    public CreateRoomResponse createRoom(Long memberId) {
        // Redis에서 현제 키값들을 다 불러오는 기능
        Iterable<Game> all = gameRepository.findAll();

        // 새로운 keySet을 구현하는 방식을 통해 최적화 가능
        int roomId = 0;
        for (Game game : all) {
            roomId = Math.max(game.getRoomId(), roomId);
        }
        roomId++;
        creatRoomOnRedis(roomId, memberId);

        return new CreateRoomResponse(roomId);
    }

    private void creatRoomOnRedis(int roomId, Long player) {
        Game.builder()
            .players(new ArrayList<>(List.of(player)))
            .gameTurn(0)
            .roomId(roomId)
            .portfolios(new HashMap<>())
            .interestRate(InterestRate.builder()
                .rate(INITIAL_INTEREST_RATE)
                .rateHistory(new ArrayList<>())
                .build())
            .gold(null)
            .stocks(null)
            .savings(null)
            .insurances(null)
            .buildings(null)
            .build();
    }
}
