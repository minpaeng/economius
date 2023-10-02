package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Getter
@Builder
@Slf4j
public class PortfolioStocks {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private Map<Integer, PortfolioStock> stocks;

    public void updatePortfolioStockByStockChange(Stock stock){
//        log.info("updateStock : " + stock.getStockId() + " : " + stock);
        if (stocks == null) {
            return;
        }
        if (stocks.containsKey(stock.getStockId())){
            changePortfolioStock(stock, 0);
        }
    }

    public void updatePortfolioStockByDeal(Stock stock, int changeAmount) {
        totalPrice += stock.getPrice() * changeAmount;
        amount += changeAmount;

        updateStockMap(stock, changeAmount);
    }

    private void updateStockMap(Stock stock, int changeAmount) {
        if (stocks == null) {
            stocks = new HashMap<>();
            log.info("stock map 생성");
        }

        if (stocks.containsKey(stock.getStockId())) {
            changePortfolioStock(stock, changeAmount);
        } else {
            createPortfolioStock(stock, changeAmount);
        }
    }

    private void createPortfolioStock(Stock stock, int changeAmount) {
        log.info("stock 키 존재 X -> 새로만듬");
        stocks.put(stock.getStockId(),
            PortfolioStock.builder()
                .costPerStock(stock.getPrice())
                .amount(changeAmount)
                .earningRate(0)
                .totalCost(stock.getPrice() * changeAmount)
                .earningPrice(stock.getPrice() * changeAmount)
                .stock(stock)
                .build()
        );
        log.info("stock 키 존재 X -> 결과" + stocks);
    }

    private void changePortfolioStock(Stock stock, int changeAmount) {
        log.info("stock 키 존재 -> 업데이트 진행");
        if (!stocks.get(stock.getStockId()).updateStockAmount(changeAmount, stock)) {
            this.stocks.remove(stock.getStockId());
        }
        calculatePortfolioStock();
    }


    private void calculatePortfolioStock() {
        earningPrice = stocks.values().stream()
            .mapToInt(PortfolioStock::evaluateStock)
            .sum();

        earningRate = (int) (((double) (earningPrice - totalPrice) / totalPrice) * 100.0);
    }
}
