package com.ssafy.economius.common.exception.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotPlayerToRollResponse {

    private int code;
    private String message;
    private int roomId;
    private Long requestPlayer;
    private Long playerToRoll;
}
