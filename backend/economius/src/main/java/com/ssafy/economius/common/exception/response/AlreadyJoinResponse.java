package com.ssafy.economius.common.exception.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@Builder
public class AlreadyJoinResponse {

    private int code;
    private String message;
    private List<Long> players;
    private Map<Long, String> nicknames;
    private Long hostPlayer;
}
