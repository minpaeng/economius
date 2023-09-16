package com.ssafy.economius.game.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioSaving {

    private String savingCode;
    private String savingName;
    private int perPrice;
    private int currentPrice;
    private int currentCount;
    private int totalCount;
    private int rate;
}
