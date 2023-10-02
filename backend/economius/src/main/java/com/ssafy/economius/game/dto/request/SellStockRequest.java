package com.ssafy.economius.game.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SellStockRequest {

    private Long player;
    private int stockId;
    private int stockAmount;
}
