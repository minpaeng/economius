package com.ssafy.economius.game.entity.redis;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash
public class Saving {

    @Id
    private String code;
    private String name;
    private int rate;
    private int price;
}
