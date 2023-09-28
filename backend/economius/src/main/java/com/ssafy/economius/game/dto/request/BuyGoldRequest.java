package com.ssafy.economius.game.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BuyGoldRequest {

    private Long player;
    private int goldAmount;
}
