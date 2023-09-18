package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Building {

    private String name;
    private Long ownerId;
    private int price;
    private List<Integer> priceHistory;
    private int rate;
    private List<Integer> rateHistory;
}
