package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.GoldDto;
import lombok.Data;

@Data
public class BuyGoldResponse {

    private String memberId;
    private int money;
    private GoldDto gold;
}
