package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@AllArgsConstructor
@Builder
@Getter
@ToString
public class EventMoney {
    private int eventMoneyId;

    private int insuranceTypeId;
    private String typeCode;
    private String typeName;

    private String name;
    private String description;
    private int money;
    private String url;
}
