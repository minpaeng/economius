package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.entity.mysql.StockIndustry;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@AllArgsConstructor
@Builder
@Getter
public class EventStock {
    private int eventStockId;
    private int stockIndustryId;
    private String industry;
    private String name;
    private String description;
    private int rate;
    private String url;
}
