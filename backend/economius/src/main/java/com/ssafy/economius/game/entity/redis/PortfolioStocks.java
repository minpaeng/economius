package com.ssafy.economius.game.entity.redis;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class PortfolioStocks {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private Map<Integer, PortfolioStock> stocks;

    public void updatePortfolioStock(Stock stock, int changeAmount) {
        totalPrice += stock.getPrice() * changeAmount;
        amount += changeAmount;

        updateStockMap(stock, changeAmount);
        calculatePortfolioStock();
    }

    private void updateStockMap(Stock stock, int changeAmount) {
        if (stocks.containsKey(stock.getStockId())) {
            stocks.get(stock.getStockId()).updateStockAmount(changeAmount);
        } else {
            stocks.put(stock.getStockId(),
                PortfolioStock.builder()
                    .costPerStock(stock.getPrice())
                    .amount(changeAmount)
                    .earningRate(0)
                    .totalCost(stock.getPrice() * changeAmount)
                    .stock(stock)
                    .build()
            );
        }
    }


    private void calculatePortfolioStock(){
        earningPrice = stocks.values().stream()
            .mapToInt(PortfolioStock::calculateStock)
            .sum();

        earningRate = (int) ((double) (earningPrice - totalPrice) / totalPrice * 100);
    }
}
