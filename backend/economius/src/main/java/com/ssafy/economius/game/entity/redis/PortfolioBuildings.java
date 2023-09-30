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
        this.totalPrice += building.getBuildingFee();
        addBuilding(buildingId, building);
        this.amount = this.building.size();
        setEarnings();
    }

    public void sellBuilding(int buildingId, Building building) {
        if (this.building == null) log.error("판매 요청이 들어왔으나 소유한 빌딩이 없음: 빌딩 아이디 " + buildingId);
        this.totalPrice += building.getBuildingFee();
        if (this.building.get(buildingId) == null) log.error("판매 요청 빌딩을 소유하고 있지 않음: 빌딩 아이디 " + building);
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
        if (this.building == null) {
            log.error("소유한 빌딩에 대한 가격 재조정 요청이 들어왔지만 소유하고 있는 빌딩이 없음: 빌딩 아이디 " + buildingId);
            this.building = new HashMap<>();
        }
        if (this.building.get(buildingId) == null) {
            log.error("소유한 빌딩에 대한 가격 재조정 요청이 들어왔지만 소유하고 있는 빌딩이 없음: 빌딩 아이디 " + buildingId);
            addBuilding(buildingId, building);
        }
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
