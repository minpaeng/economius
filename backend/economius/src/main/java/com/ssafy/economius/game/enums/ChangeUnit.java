package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum ChangeUnit {
    LOWER(1, -5),
    lOW(2, -3),
    NO_CHANGE(3, 0),
    UP(4, 3),
    UPPER(5, 5);

    private final int code;
    private final int value;

    ChangeUnit(int code, int value) {
        this.code = code;
        this.value = value;
    }
}
