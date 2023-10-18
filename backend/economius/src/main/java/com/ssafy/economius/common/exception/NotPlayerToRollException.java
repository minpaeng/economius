package com.ssafy.economius.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class NotPlayerToRollException extends RuntimeException {

    private int code;
    private String message;
    private int roomId;
    private Long requestPlayer;
    private Long playerToRoll;
}
