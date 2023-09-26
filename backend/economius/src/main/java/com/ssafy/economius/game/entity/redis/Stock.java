package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Stock {

    private Integer stockId;
    private String name;
    private Integer stockIndustryId;
    private String companyCategory;
    private String companySubCategory;
    // 아이디, 보유량
    private Map<Long, Integer> owners;
    private int remainingAmount;
    private int price;
    private int rate;
    private List<Price> priceHistory;
    private List<Integer> rateHistory;

    public boolean checkStockAvailableToPurchase(int buyStockAmount) {
        return buyStockAmount <= remainingAmount;
    }


    public void dealStock(Long player, int amount) {
        owners.compute(player, (key, value) -> value + amount);
        remainingAmount -= amount;
    }

    public void updateStockPriceAndRate(int closingRate, int round) {
        updatePrice(closingRate, round);
        updateRate(closingRate, round);
    }

    public void initializeOwners(List<Long> players) {
        owners = new HashMap<>();
        players.forEach(player -> owners.put(player, 0));

    }

    private void updateRate(int closingRate, int round) {
        rate = closingRate;

        rateHistory.add(round, rate);
    }

    private void updatePrice(int closingRate, int round) {
        int closingPrice = calculatePrice(closingRate);
        if (round == priceHistory.size()) {
            priceHistory.add(Price.builder()
                .openingPrice(priceHistory.get(round - 1).getClosingPrice())
                .highPrice(priceHistory.get(round - 1).getClosingPrice())
                .lowPrice(priceHistory.get(round - 1).getClosingPrice())
                .closingPrice(priceHistory.get(round - 1).getClosingPrice())
                .build()
            );
        }
        priceHistory.set(round,
            Price.builder()
                .closingPrice(closingPrice)
                .lowPrice(Math.min(closingPrice, priceHistory.get(round).getLowPrice()))
                .highPrice(Math.max(closingPrice, priceHistory.get(round).getHighPrice()))
                .openingPrice(priceHistory.get(round).getOpeningPrice())
                .build()
        );

        price = calculatePrice(closingRate);
    }

    private int calculatePrice(int rate) {
        return (int) (price * (double) (100 + rate) / 100);
    }

}
