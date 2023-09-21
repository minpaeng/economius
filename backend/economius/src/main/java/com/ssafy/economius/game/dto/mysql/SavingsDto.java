package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavingsDto {

    private Integer bankId;
    private String savingName;
    private Integer monthlyDeposit;
    private Integer finishCount;
    private Integer rate;
}
