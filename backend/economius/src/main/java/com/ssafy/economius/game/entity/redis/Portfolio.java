package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Portfolio {

    private Long player;
    private int money;
    private int totalMoney;
    private PortfolioGold gold;
    private PortfolioSavings savings;
    private PortfolioBuildings building;
    private PortfolioStocks stocks;
}
