package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VolatileDto {

    private Integer volatileId;
    private String name;
    private String type;
    private Integer initialValue;
}
