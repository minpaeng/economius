package com.ssafy.economius.game.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@Builder
@Getter
public class GameRoomExitResponse {

    private int roomId;
    private List<Long> players;
    private Map<Long, String> nicknames;
    private Long hostPlayer;
}
