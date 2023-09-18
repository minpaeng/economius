package com.ssafy.economius.game.entity.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
public class Insurance {

    @Id
    private String code;
    private String name;
    private String category;
    private int benefitRate;
    private int price;

}
