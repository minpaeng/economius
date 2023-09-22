package com.ssafy.economius.game.dto;

import com.ssafy.economius.game.dto.mysql.EventMoneyDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class EventDto {
    private EventMoneyDto eventMoneyDto;
    private EventStockDto eventStockDto;
}
