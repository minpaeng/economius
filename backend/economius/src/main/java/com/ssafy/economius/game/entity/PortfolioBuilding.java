package com.ssafy.economius.game.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioBuilding {

    private String buildingCode;
    private String buildingName;
    private int buyPrice;
    private int currentPrice;
}
