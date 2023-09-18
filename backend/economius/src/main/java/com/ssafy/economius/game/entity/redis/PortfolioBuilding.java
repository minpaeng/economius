package com.ssafy.economius.game.entity.redis;

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
