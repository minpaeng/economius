package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRepository gameRepository;

    public CreateRoomResponse createRoom(String memberId) {
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

    private void creatRoomOnRedis(int roomId, String memberId) {
        // 상수 확립 이후 구현
    }
}
