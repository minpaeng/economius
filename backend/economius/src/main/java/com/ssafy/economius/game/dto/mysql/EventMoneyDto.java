package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EventMoneyDto {

    private Integer eventMoneyId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String name;
    private String description;
    private Integer money;
    private String url;
}
