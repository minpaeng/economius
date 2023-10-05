package com.ssafy.economius.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CustomWebsocketRoomException extends RuntimeException {

    private Long player;
    private List<Long> players;
    private Map<Long, String> nicknames;
    private Long hostPlayer;
    private int code;
    private String message;
}
