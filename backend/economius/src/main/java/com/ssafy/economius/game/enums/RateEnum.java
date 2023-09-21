package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum RateEnum {

    INITIAL_INTEREST_RATE(5),
    INITIAL_ZERO_VALUE(0),
    MAX_GAME_TURN(25),
    INITIAL_MONEY(500_000_000),

    FIRST_PRIZE_TAX(15),
    SECOND_PRIZE_TAX(10),
    THIRD_PRIZE_TAX(5),
    FOURTH_PRIZE_TAX(0),

    FIRST_PRIZE(1),
    SECOND_PRIZE(2),
    THIRD_PRIZE(3),
    FOURTH_PRIZE(4),

    SALARY(5000000),
    GOLD_RATE_LOWER_BOUND(-5),
    GOLD_RATE_UPPER_BOUND(10);



    private final int value;

    RateEnum(int value) {
        this.value = value;
    }
}
