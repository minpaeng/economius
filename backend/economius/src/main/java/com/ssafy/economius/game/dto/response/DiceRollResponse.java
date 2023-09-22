package com.ssafy.economius.game.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DiceRollResponse {

    private int moveCount;
    private Long player;
    private int location;
}
