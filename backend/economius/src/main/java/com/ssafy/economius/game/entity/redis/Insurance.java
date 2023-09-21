package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class Insurance {

    private String code;
    private String name;
    private String type;
    private String category;
    private int benefitRate;
    private int price;

}
