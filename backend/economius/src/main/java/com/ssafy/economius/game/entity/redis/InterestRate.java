package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class InterestRate {

    private int rate;
    private List<Integer> rateHistory;

    public void updateBuildingPrice(int newRate) {
        rate += rate * newRate / 100;
        rateHistory.add(rate);
    }
}
