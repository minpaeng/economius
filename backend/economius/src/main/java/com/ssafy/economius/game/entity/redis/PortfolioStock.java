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

    private int costPerStock;
    private int amount;
    private int totalCost;
    private int earningRate;
    private Stock stock;

    // 주식의 현제 가치를 구하기
    public int calculateStock() {
        int totalMarketValue = stock.getPrice() * amount;
        this.earningRate = (int) ((double) (totalMarketValue - totalCost) / (totalCost) * 100);

        return totalMarketValue;
    }

    public void updateStockAmount(int changeAmount){
        this.amount += changeAmount;
    }
}
