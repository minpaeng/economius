package com.ssafy.economius.game.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GameJoinResponse {
    private int roomId;
    private Long hostPlayer;
}
