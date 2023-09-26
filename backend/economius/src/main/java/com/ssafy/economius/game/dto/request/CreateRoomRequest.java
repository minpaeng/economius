package com.ssafy.economius.game.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CreateRoomRequest {
    private Long player;
    private String nickname;
}
