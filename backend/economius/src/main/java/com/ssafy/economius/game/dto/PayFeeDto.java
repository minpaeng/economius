package com.ssafy.economius.game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class PayFeeDto {
    private int changeAmount;
    private int moneyResult;
}
