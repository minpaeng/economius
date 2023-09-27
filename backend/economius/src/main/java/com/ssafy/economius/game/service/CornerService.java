package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.response.OracleResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Issue;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CornerService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public OracleResponse oracle(int roomId) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Issue nextIssue = game.getNextIssue();

        return makeOracleResponse(nextIssue);
    }

    private OracleResponse makeOracleResponse(Issue nextIssue) {
        if (nextIssue == null){
            return null;
        }

        return OracleResponse.builder()
            .url(nextIssue.getUrl())
            .description(nextIssue.getDescription())
            .issueId(nextIssue.getIssueId())
            .name(nextIssue.getName())
            .country(nextIssue.getCountry())
            .type(nextIssue.getType())
            .year(nextIssue.getYear())
            .build();
    }
}
