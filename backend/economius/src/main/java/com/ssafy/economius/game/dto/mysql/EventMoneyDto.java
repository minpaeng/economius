package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventMoneyDto {

    private Integer eventMoneyId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String name;
    private String description;
    private Integer money;
}
