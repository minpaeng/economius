package com.ssafy.economius.game.enums;

import lombok.Getter;

@Getter
public enum IssueEnum {

    DEPRESSION("불황"),
    BOOM("호황");

    private final String value;

    IssueEnum(String value) {
        this.value = value;
    }
}
