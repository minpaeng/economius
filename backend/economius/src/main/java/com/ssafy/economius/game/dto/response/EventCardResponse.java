package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.EventDto;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class EventCardResponse { 
    private EventDto eventDto;
}

