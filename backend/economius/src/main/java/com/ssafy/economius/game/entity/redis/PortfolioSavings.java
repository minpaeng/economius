package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioSavings {

    private int totalPrice;
    private int amount;
    private List<PortfolioSaving> saving;

    @Override
    public String toString() {
        return "PortfolioSavings{" +
                "totalPrice=" + totalPrice +
                ", amount=" + amount +
                ", saving=" + saving +
                '}';
    }
}
