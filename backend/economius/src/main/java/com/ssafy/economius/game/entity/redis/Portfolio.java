package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Portfolio {

    @Id
    private String memberId;
    private int money;
    private PortfolioGold gold;
    private PortfolioSavings savings;
    private PortfolioBuildings building;
    private PortfolioStocks stocks;
}
