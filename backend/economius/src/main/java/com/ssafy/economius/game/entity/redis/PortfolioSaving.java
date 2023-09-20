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
    private String bankId;
    private String savingName;
    private int monthlyDeposit;
    private int currentPrice;
    private int currentCount;
    private int finishCount;
    private int rate;

    @Override
    public String toString() {
        return "PortfolioSaving{" +
                "bankId='" + bankId + '\'' +
                ", savingName='" + savingName + '\'' +
                ", monthlyDeposit=" + monthlyDeposit +
                ", currentPrice=" + currentPrice +
                ", currentCount=" + currentCount +
                ", totalCount=" + finishCount +
                ", rate=" + rate +
                '}';
    }

    public void updateCurrentCount() {
        this.currentPrice += this.currentPrice * ((double) rate / 100);
        this.currentCount++;
    }

    public boolean checkSavingFinish() {
        return this.finishCount == this.currentCount;
    }
}
