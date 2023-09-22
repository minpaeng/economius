package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.EventDto;
import lombok.Getter;

@Getter
public class EventCardResponse {
    private Long player;
    private boolean isGood;
    private EventDto eventDto;
}

