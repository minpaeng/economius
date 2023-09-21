package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SavingInfoDto {

    private Integer bankId;
    private String name;
    private Integer monthlyDeposit;
    private Integer finishCount;
    private Integer rate;

    @Override
    public String toString() {
        return "SavingInfoDto{" +
                "bankId=" + bankId +
                ", name='" + name + '\'' +
                ", monthlyDeposit=" + monthlyDeposit +
                ", finishCount=" + finishCount +
                ", rate=" + rate +
                '}';
    }
}
