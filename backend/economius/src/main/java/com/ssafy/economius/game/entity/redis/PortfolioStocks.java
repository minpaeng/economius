package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@Builder
public class PortfolioStocks {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private List<PortfolioStock> stocks;

    @Override
    public String toString() {
        return "PortfolioStocks{" +
                "totalPrice=" + totalPrice +
                ", earningRate=" + earningRate +
                ", earningPrice=" + earningPrice +
                ", amount=" + amount +
                ", stocks=" + stocks +
                '}';
    }
}
