package com.ssafy.economius.game.entity.redis;

import static com.ssafy.economius.game.enums.RateEnum.*;

import com.ssafy.economius.game.enums.RateEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Portfolio {

    private Long player;
    private int money;
    private int totalMoney;
    private PortfolioGold gold;
    private PortfolioSavings savings;
    private PortfolioBuildings buildings;
    private PortfolioStocks stocks;
    private PortfolioInsurances insurances;

    public void spendMoney(int price) {
        this.money -= price;
        updateTotalMoney();
    }

    public void updateMoneyAndTotalMoneyByStockDividends(int stockAmount, int stockPrice) {
        this.money += (int) ((double) stockAmount / STOCK_DIVIDENDS_RATE.getValue() * stockPrice);
        updateTotalMoney();
    }

    public void updateTotalMoney() {
        this.totalMoney =
            gold.getTotalPrice() +
                savings.getTotalPrice() +
                buildings.getTotalPrice() +
                stocks.getTotalPrice() +
                money;
    }

    public void buyBuilding(Long player, int buildingId, Building building) {
        building.setOwnerId(player);
        this.money -= building.getPrice();
        this.buildings.buyBuilding(buildingId, building);
    }

    public void sellBuilding(int buildingId, Building building) {
        building.setOwnerId(null);
        this.money += building.getPrice();
        this.buildings.sellBuilding(buildingId, building);
    }

    @Override
    public String toString() {
        return "Portfolio{" +
            "player=" + player +
            ", money=" + money +
            ", totalMoney=" + totalMoney +
            ", gold=" + gold +
            ", savings=" + savings +
            ", buildings=" + buildings +
            ", stocks=" + stocks +
            ", insurances=" + insurances +
            '}';
    }
}
