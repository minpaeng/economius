package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Savings {

    private Integer savingsId;
    private String name;
    private Integer monthlyDeposit;
    private Integer finishCount;
    private Integer finishRate;
}
