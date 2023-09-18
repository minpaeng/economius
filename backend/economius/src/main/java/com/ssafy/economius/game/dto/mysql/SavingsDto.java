package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavingsDto {

    private Integer savingsId;
    private String name;
    private Integer monthlyDeposit;
    private Integer finishCount;
    private Integer finishRate;
}
