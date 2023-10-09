package com.ssafy.economius.game.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
public class GameStartResponse {

    private int roomId;
    private Long currentPlayerToRoll;
}
