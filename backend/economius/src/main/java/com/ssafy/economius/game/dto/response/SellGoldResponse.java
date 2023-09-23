package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.GoldDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellGoldResponse {

    private Long player;
    private int money;
    private GoldDto gold;
}
