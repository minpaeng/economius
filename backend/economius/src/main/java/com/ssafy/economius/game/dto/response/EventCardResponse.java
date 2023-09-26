package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.EventDto;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@ToString
public class EventCardResponse {
    private Long player;
    private boolean isGood;
    private EventDto eventDto;
    private List<Long> bankruptcyPlayers;
}

