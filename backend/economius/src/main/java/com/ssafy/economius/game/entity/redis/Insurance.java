package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@AllArgsConstructor
public class Insurance {

    private String code;
    private String name;
    private String category;
    private int benefitRate;
    private int price;

}
