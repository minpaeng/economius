package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Builder
@Getter
public class Saving {
    //private int bankId;
    private String name;
    private int monthlyDeposit;
    private int finishCount;
    private int rate;

}
