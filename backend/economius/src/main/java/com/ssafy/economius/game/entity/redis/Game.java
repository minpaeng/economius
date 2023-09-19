package com.ssafy.economius.game.entity.redis;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    private int roomId;
    // 0번 index 가 호스트
    private List<Long> players;
    private int gameTurn;
    private Map<Long, Portfolio> portfolios;

    // 경제 asset
    private Gold gold;
    private List<Building> buildings;
    private List<Stock> stocks;
    private List<Insurance> insurances;
    private List<Saving> savings;
    private InterestRate interestRate;

    public void initializePortfolio(Map<Long, Portfolio> portfolios) {
        this.portfolios = portfolios;
    }
}
