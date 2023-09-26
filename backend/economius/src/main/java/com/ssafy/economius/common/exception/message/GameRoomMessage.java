package com.ssafy.economius.common.exception.message;

import lombok.Getter;

@Getter
public enum GameRoomMessage {

    GAME_NOT_EXIST(1000, "해당하는 게임이 존재하지 않습니다."),
    CANNOT_BUY(1001, "보유 현금이 부족합니다."),
    PLAYER_BANKRUPTCY(1002, "플레이어가 파산했습니다."),
    NOT_ENOUGH_STOCK(1003, "주식이 부족합니다."),
    PLAYER_NOT_EXIST(1004, "해당하는 플레이어가 존재하지 않습니다.");

    private final int code;
    private final String message;

    GameRoomMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
