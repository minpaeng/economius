package com.ssafy.economius.game.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PortfolioSavings {

    private int totalPrice;
    private int amount;
    private List<PortfolioSaving> savings;
}
