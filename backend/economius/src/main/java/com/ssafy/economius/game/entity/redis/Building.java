package com.ssafy.economius.game.entity.redis;

import java.util.List;

import com.ssafy.economius.game.enums.BuildingEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
public class Building {

    private String name;
    private Long ownerId;
    private int price;
    private List<Integer> priceHistory;
    private int rate;
    private List<Integer> rateHistory;

    public void updateBuildingPrice(int newRate) {
        price += price * newRate / 100;
        rate = newRate;
        priceHistory.add(price);
        rateHistory.add(newRate);
    }

    public int getBuildingFee() {
        return this.price / 100 * BuildingEnum.Building_FEE_RATE.getValue();
    }
}
