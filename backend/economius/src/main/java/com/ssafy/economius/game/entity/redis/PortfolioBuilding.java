package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PortfolioBuilding {

    private int buildingId;
    private String buildingName;
    private int earningRate;
    private int earningPrice;
    private int buyPrice;
    private int priceChange;
    private Building building;

    public void setEarnings() {
        int gap = building.getPrice() - this.buyPrice;
        this.earningRate = (int) ((gap / (double) this.buyPrice) * 100);
        this.earningPrice = gap;
    }
}
