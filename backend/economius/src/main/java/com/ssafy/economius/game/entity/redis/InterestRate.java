package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Builder
@AllArgsConstructor
@Data
@Slf4j
public class InterestRate {

    private double rate;
    private List<Double> rateHistory;

    public void updateInterestRate(int newRate) {
        log.info("newRate : " + newRate);

        rate += rate * newRate / 100;
        rate = Math.round(rate * 100) / 100.0;
        rateHistory.add(rate);
    }
}
