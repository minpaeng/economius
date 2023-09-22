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

    private String code;
    private String name;
    private String type;
    private String category;
    private int benefitRate;
    private int price;

}
