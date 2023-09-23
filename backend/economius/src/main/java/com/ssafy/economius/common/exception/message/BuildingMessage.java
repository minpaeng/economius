package com.ssafy.economius.common.exception.message;

import lombok.Getter;

@Getter
public enum BuildingMessage {

    ALREADY_OWN_BUILDING(2000, "이미 소유한 건물입니다."),
    ALREADY_OWNED_BUILDING(2001, "다른 사람이 이미 구매한 건물입니다.");

    private final int code;
    private final String message;

    BuildingMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
