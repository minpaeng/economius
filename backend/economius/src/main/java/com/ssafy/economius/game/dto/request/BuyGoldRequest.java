package com.ssafy.economius.game.dto.request;

import lombok.Data;
import lombok.Getter;

@Getter
public class BuyGoldRequest {

    private String player;
    private int goldAmount;
}
