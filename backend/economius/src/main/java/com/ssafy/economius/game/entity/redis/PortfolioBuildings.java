package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioBuildings {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private List<PortfolioBuilding> building;
}
