package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
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
        this.totalPrice += building.getBuildingFee();
        addBuilding(buildingId, building);
        this.amount = this.building.size();
        setEarnings();
    }

    public void sellBuilding(int buildingId, Building building) {
        this.totalPrice += building.getBuildingFee();
        this.building.remove(buildingId);
        this.amount = this.building.size();
        setEarnings();
    }

    private void addBuilding(int buildingId, Building building) {
        if (this.building == null) this.building = new HashMap<>();

        PortfolioBuilding portfolioBuilding = PortfolioBuilding.builder()
                .buildingId(buildingId)
                .buildingName(building.getName())
                .buyPrice(building.getPrice())
                .building(building)
                .build();

        this.building.put(buildingId, portfolioBuilding);
    }

    public void updateBuildingInfo(int buildingId, Building building) {
        this.building.get(buildingId).setBuilding(building);
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
        if (totalBoughtPrice != 0) newEarningRate = (gap / totalBoughtPrice) * 100;
        this.earningRate = newEarningRate;
        this.earningPrice = gap;

        if (totalBoughtPrice > totalCurrentPrice) {
            this.earningRate = newEarningRate * -1;
            this.earningPrice = gap * -1;
        }
    }
}
