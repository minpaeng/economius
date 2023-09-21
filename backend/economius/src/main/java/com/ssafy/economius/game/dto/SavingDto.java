package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class SavingDto {
    private int bankId;
    private String name;
    private int monthlyDeposit;
    private Integer currentPrice;
    private Integer currentCount;
    private int finishCount;
    private int rate;


}
