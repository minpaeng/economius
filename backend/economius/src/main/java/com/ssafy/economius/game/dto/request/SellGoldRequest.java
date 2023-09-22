package com.ssafy.economius.game.dto.request;

import lombok.Data;

@Data
public class SellGoldRequest {
    private Long player;
    private int goldAmount;
}
