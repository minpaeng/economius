package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum RateEnum {

    INITIAL_INTEREST_RATE(5),
    INITIAL_RATE(0);

    private final int value;

    RateEnum(int value) {
        this.value = value;
    }
}
