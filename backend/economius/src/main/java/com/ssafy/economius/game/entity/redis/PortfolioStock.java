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
    private int earningPrice;
    private Stock stock;


    // 주식의 현제 가치를 구하기
    public int evaluateStock() {
        earningPrice = stock.getPrice() * amount;
        this.earningRate = (int) ((double) (earningPrice - totalCost) / (totalCost) * 100);
        return earningPrice;
    }

    public void updateStockAmount(int changeAmount, Stock stock) {
        this.stock = stock;

        totalCost += stock.getPrice() * changeAmount;
        this.amount += changeAmount;
        this.costPerStock = totalCost / amount;
    }
}
