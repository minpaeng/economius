package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class EventMoneyDto {
    private int eventMoneyId;

    private int insuranceTypeId;
    private String typeCode;
    private String typeName;

    private String name;
    private String description;
    private int money;
    private String url;
}
