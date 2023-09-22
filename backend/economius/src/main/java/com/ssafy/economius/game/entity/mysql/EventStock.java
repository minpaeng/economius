package com.ssafy.economius.game.entity.mysql;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class EventStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventStockId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_industry_id")
    private StockIndustry stockIndustry;
    private String name;
    private String description;
    private Integer rate;
    private String url;
}
