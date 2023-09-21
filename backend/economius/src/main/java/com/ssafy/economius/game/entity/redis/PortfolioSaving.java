package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.dto.SavingDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioSaving {
    private int bankId;
    private String name;
    private int monthlyDeposit;
    private int currentPrice;
    private int currentCount;
    private int finishCount;
    private int rate;

    public void updateCurrentCount() {
        this.currentPrice += this.currentPrice * ((double) rate / 100);
        this.currentCount++;
    }

    public boolean checkSavingFinish() {
        return this.finishCount == this.currentCount;
    }


}
