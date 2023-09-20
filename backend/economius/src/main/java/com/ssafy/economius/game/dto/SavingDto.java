package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class SavingDto {
    private String bankId;
    private String savingName;
    private int monthlyDeposit;
    private int currentPrice;
    private int currentCount;
    private int totalCount;
    private int rate;

    @Override
    public String toString() {
        return "SavingDto{" +
                "bankId='" + bankId + '\'' +
                ", savingName='" + savingName + '\'' +
                ", monthlyDeposit=" + monthlyDeposit +
                ", currentPrice=" + currentPrice +
                ", currentCount=" + currentCount +
                ", totalCount=" + totalCount +
                ", rate=" + rate +
                '}';
    }
}
