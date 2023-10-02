package com.ssafy.economius.game.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@Builder
public class GameJoinResponse {
    private int roomId;
    private List<Long> players;
    private Map<Long, String> nicknames;
    private Long hostPlayer;
}
