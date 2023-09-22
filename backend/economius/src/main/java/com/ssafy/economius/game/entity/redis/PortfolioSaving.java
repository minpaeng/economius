package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.dto.SavingDto;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
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
