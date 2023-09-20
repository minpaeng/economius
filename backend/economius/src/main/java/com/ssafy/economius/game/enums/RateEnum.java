package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum RateEnum {

    INITIAL_INTEREST_RATE(5),
    INITIAL_ZERO_VALUE(0),
    INITIAL_MONEY(5000000),

    FIRST_PRIZE_TAX(15),
    SECOND_PRIZE_TAX(10),
    THIRD_PRIZE_TAX(5),
    FOURTH_PRIZE_TAX(0),

    FIRST_PRIZE(1),
    SECOND_PRIZE(2),
    THIRD_PRIZE(3),
    FOURTH_PRIZE(4),

    SALARY(5000000),
    ;



    private final int value;

    RateEnum(int value) {
        this.value = value;
    }
}
