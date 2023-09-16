package com.ssafy.economius.game.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioStocks {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private List<PortfolioStock> stocks;
}
