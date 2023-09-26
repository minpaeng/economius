package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class EventDto {
    private EventMoneyDto eventMoneyDto;
    private EventStockDto eventStockDto;
}
