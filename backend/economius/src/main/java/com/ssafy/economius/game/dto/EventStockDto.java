package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class EventStockDto {
    private int eventStockId;
    private int stockIndustryId;
    private String industry;
    private String name;
    private String description;
    private int rate;
    private String url;
}
