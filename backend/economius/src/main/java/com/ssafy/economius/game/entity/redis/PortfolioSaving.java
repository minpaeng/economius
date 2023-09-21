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

    @Override
    public String toString() {
        return "PortfolioSaving{" +
                "bankId='" + bankId + '\'' +
                ", savingName='" + name + '\'' +
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

    public SavingDto toDto() {
        return SavingDto.builder()
                .bankId(this.bankId)
                .name(this.name)
                .monthlyDeposit(this.monthlyDeposit)
                .currentPrice(this.currentPrice)
                .currentCount(this.currentCount)
                .finishCount(this.finishCount)
                .rate(this.rate)
                .build();
    }

}
