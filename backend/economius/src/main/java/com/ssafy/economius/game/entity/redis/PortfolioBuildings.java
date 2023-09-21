package com.ssafy.economius.game.entity.redis;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PortfolioBuildings {

    private int totalPrice;
    private int earningRate;
    private int earningPrice;
    private int amount;

    private Map<Integer, PortfolioBuilding> building;

    public void buyBuilding(int buildingId, Building building) {
        this.totalPrice += building.getPrice();
        amount += 1;
        addBuilding(buildingId, building);
        setEarnings();
    }

    private void addBuilding(int buildingId, Building building) {
        PortfolioBuilding portfolioBuilding = PortfolioBuilding.builder()
            .buildingId(buildingId)
            .buildingName(building.getName())
            .buyPrice(building.getPrice())
            .building(building)
            .build();

        this.building.put(buildingId, portfolioBuilding);
    }

    private void setEarnings() {
        int totalBoughtPrice = 0;
        int totalCurrentPrice = 0;

        for (PortfolioBuilding portfolioBuilding : building.values()) {
            totalBoughtPrice += portfolioBuilding.getBuyPrice();
            totalCurrentPrice += portfolioBuilding.getBuilding().getPrice();
        }

        calculateEarnings(totalBoughtPrice, totalCurrentPrice);
    }

    private void calculateEarnings(int totalBoughtPrice, int totalCurrentPrice) {
        int gap = Math.abs(totalCurrentPrice - totalBoughtPrice);
        int newEarningRate = 0;
        if (totalBoughtPrice != 0) {
            newEarningRate = (gap / totalBoughtPrice) * 100;
        }
        this.earningRate = newEarningRate;
        this.earningPrice = gap;
        if (totalBoughtPrice > totalCurrentPrice) {
            this.earningRate = newEarningRate * -1;
            this.earningPrice = gap * -1;
        }
    }
}
