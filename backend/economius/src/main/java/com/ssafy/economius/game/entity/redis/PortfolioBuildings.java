package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
        addBuilding(buildingId, building);
        if (this.building == null) this.amount = 0;
        else this.amount = this.building.size();
        setEarnings();
    }

    public void sellBuilding(int buildingId, Building building) {
        if (this.building == null || this.building.get(buildingId) == null) {
            log.error("판매 요청이 들어왔으나 소유한 빌딩이 없음: 빌딩 아이디 " + buildingId);
            return;
        }
        this.totalPrice -= building.getPrice();
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
        if (this.building == null || this.building.get(buildingId) == null) {
            log.error("소유한 빌딩에 대한 가격 재조정 요청이 들어왔지만 소유하고 있는 빌딩이 없음: 빌딩 아이디 " + buildingId);
            building.setOwnerId(null);
            return;
        }
        this.building.get(buildingId).setBuilding(building);
        updateTotalBuildingPrice();
        setEarnings();
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
        int gap = totalCurrentPrice - totalBoughtPrice;
        int newEarningRate = 0;
        if (totalBoughtPrice != 0) newEarningRate = (int)((gap / (float)totalBoughtPrice) * 100);
        log.info("부동산 earning price 계산중 -> totalBoughtPrice: " + totalBoughtPrice
                + ", totalCurrentPrice: " + totalCurrentPrice
                + ", gap: " + gap
        + ", newEarningRate: " + newEarningRate);
        this.earningRate = newEarningRate;
        this.earningPrice = gap;
    }

    private void updateTotalBuildingPrice() {
        int totalBuildingPrice = 0;
        for (PortfolioBuilding p : this.building.values()) {
            totalBuildingPrice += p.getBuilding().getPrice();
        }
        this.totalPrice = totalBuildingPrice;
    }
}
