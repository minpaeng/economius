package com.ssafy.economius.game.entity.redis;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class Price {

    private Integer openingPrice;
    private Integer closingPrice;
    private Integer highPrice;
    private Integer lowPrice;
}
