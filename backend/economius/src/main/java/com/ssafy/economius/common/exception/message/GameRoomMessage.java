package com.ssafy.economius.common.exception.message;

import lombok.Getter;

@Getter
public enum GameRoomMessage {

    GAME_NOT_EXIST(1000, "해당하는 게임이 존재하지 않습니다.");

    private final int code;
    private final String message;

    GameRoomMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
