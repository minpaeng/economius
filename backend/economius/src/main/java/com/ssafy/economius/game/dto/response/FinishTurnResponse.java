package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.mysql.PrevIssueDto;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.entity.redis.Insurance;
import com.ssafy.economius.game.entity.redis.InterestRate;
import com.ssafy.economius.game.entity.redis.Issue;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.Saving;
import com.ssafy.economius.game.entity.redis.Stock;
import java.util.List;
import java.util.Map;
import lombok.Data;

@Data
public class FinishTurnResponse {

    private int roomId;
    private List<Long> bankruptcyPlayers;
    private List<Long> players;
    private Map<Long, Integer> characters;
    private List<Long> playerSequence;
    private Long currentPlayerToRoll;
    private int gameTurn;
    private int maxGameTurn;
    private Map<Long, Portfolio> portfolios;
    private Map<Long, Integer> locations;

    // 경제 asset
    private Gold gold;
    private Map<Integer, Building> buildings;
    private Map<Integer, Insurance> insurances;
    private Map<Integer, Stock> stocks;
    private Map<Integer, Saving> savings;
    private InterestRate interestRate;

    // 경제 이슈, 전조증상
    private Issue currentIssue;
    private List<PrevIssueDto> currentPrevIssues;
}
