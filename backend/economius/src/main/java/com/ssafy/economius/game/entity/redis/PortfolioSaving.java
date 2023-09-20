package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioSaving {

    private String savingCode;
    private String savingName;
    private int monthlyDeposit;
    private int currentPrice;
    private int currentCount;
    private int totalCount;
    private int rate;

    public void updateCurrentCount() {
        this.currentPrice += this.currentPrice * ((double) rate / 100);
        this.currentCount++;
    }

    public boolean checkSavingFinish() {
        return this.totalCount == this.currentCount;
    }
}
