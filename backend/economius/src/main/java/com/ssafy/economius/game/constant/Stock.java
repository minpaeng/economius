package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Stock {

    private Integer stockId;
    private Integer stockIndustryId;
    private String industry;
    private String type;
    private String company;
    private Integer initialValue;
}
