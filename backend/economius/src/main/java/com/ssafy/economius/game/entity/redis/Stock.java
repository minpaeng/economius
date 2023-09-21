package com.ssafy.economius.game.entity.redis;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Stock {

    private String name;
    private String companyCategory;
    private String companySubCategory;
    // 아이디, 보유량
    private Map<Long, Integer> owners;
    private int price;
    private int rate;
    private List<Price> priceHistory;
    private List<Integer> rateHistory;

    public void updateStockPriceAndRate(int closingRate, int round) {
        updatePrice(closingRate, round);
        updateRate(closingRate, round);
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
