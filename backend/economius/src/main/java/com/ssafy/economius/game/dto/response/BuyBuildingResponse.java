package com.ssafy.economius.game.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class BuyBuildingResponse {

    private Long player;
    private int changeAmount;
    private int moneyResult;
    private int buildingId;
}
