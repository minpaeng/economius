package com.ssafy.economius.game.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SellGoldRequest {
    private Long player;
    private int goldAmount;
}
