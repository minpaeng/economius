package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@ToString
@Getter
public class Insurance {
    private String category; //H M
    private String categoryCode; // X S
    private String productCode; //HX HS
    private String productName; // 상해보험 상해보험특

    private int guaranteeRate;  //
    private int monthlyDeposit;

}
