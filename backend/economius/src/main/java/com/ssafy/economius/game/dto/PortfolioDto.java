package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PortfolioDto {

    private Long player;
    private int money;
    private int totalMoney;
    private GoldDto gold;
    private SavingsDto saving;
    private BuildingsDto building;
    private StocksDto stocks;
}
