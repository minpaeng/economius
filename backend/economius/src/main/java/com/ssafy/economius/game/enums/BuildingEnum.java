package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum BuildingEnum {

    Building_FEE_RATE(10);

    private final int value;

    BuildingEnum(int value) {
        this.value = value;
    }
}
