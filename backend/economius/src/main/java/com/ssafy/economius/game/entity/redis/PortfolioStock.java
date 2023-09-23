package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioStock {

    private int stockId;
    private String companyName;
    private String costPerStock;
    private int amount;
    private int totalCost;
    private int rate;
    private int earningRate;
    private Stock stock;
}
