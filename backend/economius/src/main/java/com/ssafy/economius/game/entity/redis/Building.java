package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Building {

    private String name;
    private Long ownerId;
    private int price;
    private List<Integer> priceHistory;
    private int rate;
    private List<Integer> rateHistory;

    public void updateBuildingPrice(int newPrice) {
        rate = (int) ((double) (newPrice - price) / price) / 100;
        priceHistory.add(newPrice);
        rateHistory.add(rate);
    }
}
