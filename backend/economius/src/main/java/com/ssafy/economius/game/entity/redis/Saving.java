package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class Saving {

    private String name;
    private int rate;
    private int price;
    private int finishCount;
}
