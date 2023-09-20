package com.ssafy.economius.game.entity.redis;

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
public class PortfolioGold {

    private int totalPrice;
    private int amount;

    @Override
    public String toString() {
        return "PortfolioGold{" +
                "totalPrice=" + totalPrice +
                ", amount=" + amount +
                '}';
    }
}
