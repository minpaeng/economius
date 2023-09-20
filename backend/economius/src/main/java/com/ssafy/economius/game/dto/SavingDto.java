package com.ssafy.economius.game.dto;

import lombok.Builder;

@Builder
public class SavingDto {
    private String bankId;
    private String savingName;
    private int perPrice;
    private int currentPrice;
    private int currentCount;
    private int totalCount;
    private int rate;
}
