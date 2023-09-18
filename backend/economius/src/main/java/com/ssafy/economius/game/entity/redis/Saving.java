package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Builder
@AllArgsConstructor
public class Saving {

    private String code;
    private String name;
    private int rate;
    private int price;
}
