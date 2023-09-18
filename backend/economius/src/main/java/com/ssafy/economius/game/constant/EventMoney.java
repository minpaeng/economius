package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventMoney {

    private Integer eventMoneyId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String name;
    private String description;
    private Integer money;
}
