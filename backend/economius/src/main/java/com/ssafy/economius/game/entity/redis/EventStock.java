package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Builder
@Getter
@ToString
public class EventStock {
    private int eventStockId;
    private int stockIndustryId;
    private String industry;
    private String name;
    private String description;
    private int rate;
    private String url;
}
