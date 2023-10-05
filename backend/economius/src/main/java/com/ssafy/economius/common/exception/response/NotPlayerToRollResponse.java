package com.ssafy.economius.common.exception.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotPlayerToRollResponse {

    private int roomId;
    private Long requestPlayer;
    private Long playerToRoll;
}
