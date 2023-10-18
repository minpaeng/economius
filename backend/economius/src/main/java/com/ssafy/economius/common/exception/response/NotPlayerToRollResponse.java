package com.ssafy.economius.common.exception.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class NotPlayerToRollResponse {

    private int code;
    private String message;
    private int roomId;
    private Long requestPlayer;
    private Long currentPlayerToRoll;
}
