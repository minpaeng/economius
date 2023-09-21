package com.ssafy.economius.game.entity.redis;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Stock {

        private String name;
        private String companyCategory;
        private String companySubCategory;
        // 아이디, 보유량
        private Map<Long, Integer> owners;
        private int price;
        private int rate;
        private List<Integer> priceHistory;
        private List<Integer> rateHistory;

}
