package com.ssafy.economius.game.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@ToString
public class EventCardResponse {
    private boolean isMoneyCard;
    private String name;
    private String description;
    private int eventValue;
    private String url;
    private String apply;
    private List<Long> bankruptcyPlayers;
}

