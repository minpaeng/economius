package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum VolatileEnum {

    RESTAURANT("식사"),
    SHOP("쇼핑"),
    HOTEL("숙박"),
    GOLD("금"),
    INTEREST_RATE("금리"),
    BUIDING("부동산"),
    STOCK("주식");

    private final String value;

    VolatileEnum(String value) {
        this.value = value;
    }
}
