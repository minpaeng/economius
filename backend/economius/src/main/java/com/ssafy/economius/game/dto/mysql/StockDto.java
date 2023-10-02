package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StockDto {

    private Integer stockId;
    private Integer stockIndustryId;
    private String industry;
    private String type;
    private String company;
    private Integer initialValue;
}
