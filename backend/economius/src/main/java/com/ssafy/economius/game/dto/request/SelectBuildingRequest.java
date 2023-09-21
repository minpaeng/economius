package com.ssafy.economius.game.dto.request;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class SelectBuildingRequest {

    private Long player;
    private int buildingId;
}
