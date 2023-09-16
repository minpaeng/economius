package com.ssafy.economius.game.entity;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    private int roomId;
    // 0번 index 가 호스트
    private List<String> players;
    private int gameTurn;
    private Map<String, Portfolio> portfolios;

    // 경제 asset
    private Gold gold;
    private List<Building> buildings;
    private List<Stock> stocks;
    private List<Insurance> insurances;
    private List<Saving> savings;
    private InterestRate interestRate;
}
