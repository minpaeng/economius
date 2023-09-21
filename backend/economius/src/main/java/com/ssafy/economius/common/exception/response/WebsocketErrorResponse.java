package com.ssafy.economius.common.exception.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class WebsocketErrorResponse {

    private int code;
    private String message;
}
