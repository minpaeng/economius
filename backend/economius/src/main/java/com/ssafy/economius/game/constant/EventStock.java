package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventStock {

    private Integer eventStockId;
    private Integer stockIndustryId;
    private String industry;
    private String name;
    private String description;
    private Integer rate;
}
