package com.ssafy.economius.game.dto.request;

import lombok.Getter;

@Getter
public class SellStockRequest {

    private Long player;
    private int stockId;
    private int stockAmount;
}
