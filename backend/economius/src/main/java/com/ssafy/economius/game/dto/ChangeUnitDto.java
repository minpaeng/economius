package com.ssafy.economius.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
@Builder
public class ChangeUnitDto {

    private final int value;
    private final String message;
}
