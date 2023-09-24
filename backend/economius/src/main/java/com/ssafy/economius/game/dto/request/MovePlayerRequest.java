package com.ssafy.economius.game.dto.request;

import lombok.Getter;

@Getter
public class MovePlayerRequest {

    private Long player;
    private int movementCount;
}
