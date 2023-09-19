package com.ssafy.economius.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CustomWebsocketException extends RuntimeException {

    private int roomId;
    private int code;
    private String message;
}
