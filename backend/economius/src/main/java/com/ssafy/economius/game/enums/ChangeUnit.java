package com.ssafy.economius.game.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
@Getter
public enum ChangeUnit {
    LOWER(1, -30, "급격한 하락"),
    lOW(2, -15, "하락"),
    NO_CHANGE(3, 0, "안정"),
    UP(4, 15, "상승"),
    UPPER(5, 30, "급격한 상승");

    private final int code;
    private final int value;
    private final String message;

    ChangeUnit(int code, int value, String message) {
        this.code = code;
        this.value = value;
        this.message = message;
    }
}
