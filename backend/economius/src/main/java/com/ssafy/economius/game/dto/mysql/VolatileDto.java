package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VolatileDto {

    private Integer volatileId;
    private String name;
    private String type;
    private Integer initialValue;
}
