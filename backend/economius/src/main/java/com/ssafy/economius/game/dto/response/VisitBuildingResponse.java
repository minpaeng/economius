package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.VisitBuildingDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class VisitBuildingResponse {

    private int buildingId;
    private int buildingPrice;
    private int changeAmount;
    private VisitBuildingDto visitor;
    private VisitBuildingDto owner;
}
