package com.ssafy.economius.common.exception.message;

import lombok.Getter;

@Getter
public enum GameRoomMessage {

    GAME_NOT_EXIST(1000, "해당하는 게임이 존재하지 않습니다."),
    CANNOT_BUY(1001, "보유 현금이 부족합니다."),
    PLAYER_BANKRUPTCY(1002, "플레이어가 파산했습니다."),
    NOT_ENOUGH_STOCK(1003, "주식이 부족합니다."),
    PLAYER_NOT_EXIST(1004, "해당하는 플레이어가 존재하지 않습니다."),
    ROOM_LIMIT(1005, "방에 인원이 다 찼습니다."),
    ALREADY_JOIN_PLAYER(1006, "이미 방에 참여중인 플레이어입니다."),
    NOT_ROOM_HOST(1007, "호스트만 게임을 시작할 수 있습니다"),
    UNDER_GAME_START_LIMIT(1008, "게임 시작 인원 미만입니다."),
    NOT_HOST_PLAYER(1009, "호스트가 아닌 사용자의 요청입니다."),
    INVALID_CURRENT_PLAYER_TO_ROLL(1010, "finishTurn 부적절한 플레이어의 호출입니다."),
    INVALID_MOVE_PLAYER(1011, "movePlayer 부적절한 플레이어의 호출입니다.");

    private final int code;
    private final String message;

    GameRoomMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
