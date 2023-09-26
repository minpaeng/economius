package com.ssafy.economius.game.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class MovePlayerRequest {

    private Long player;
    private int movementCount;
}
