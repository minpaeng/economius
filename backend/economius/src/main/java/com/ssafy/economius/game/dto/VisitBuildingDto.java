package com.ssafy.economius.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class VisitBuildingDto {
    private long player;
    private int moneyResult;
}
