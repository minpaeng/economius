package com.ssafy.economius.game.entity.redis;

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
    private List<Integer> priceHistory;
    private List<Integer> rateHistory;

    public void updateGoldPrice(int newRate) {
        price += price * newRate / 100;
        rate = newRate;
        priceHistory.add(price);
        rateHistory.add(newRate);
    }
}
