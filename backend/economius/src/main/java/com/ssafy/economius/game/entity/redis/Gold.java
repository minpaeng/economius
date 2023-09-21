package com.ssafy.economius.game.entity.redis;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gold {

    private int price;
    private int rate;
    private List<Price> priceHistory;
    private List<Integer> rateHistory;

    // history 넣는 로직
    public void updateGold(int lowRate, int highRate, int closingRate) {
        updatePrice(lowRate, highRate, closingRate);
        updateRate(closingRate);
    }

    private void updateRate(int closingRate) {
        if (rateHistory == null) {
            rateHistory = new ArrayList<>();
        }
        rate = closingRate;

        rateHistory.add(rate);
    }

    private void updatePrice(int lowRate, int highRate, int closingRate) {
        if (priceHistory == null) {
            priceHistory = new ArrayList<>();
        }

        priceHistory.add(
            Price.builder()
                .closingPrice(calculatePrice(closingRate))
                .lowPrice(calculatePrice(lowRate))
                .highPrice(calculatePrice(highRate))
                .openingPrice(price)
                .build()
        );

        price = calculatePrice(closingRate);
    }

    private int calculatePrice(int rate) {
        return (int) (price * (double) (100 + rate) / 100);
    }
}
