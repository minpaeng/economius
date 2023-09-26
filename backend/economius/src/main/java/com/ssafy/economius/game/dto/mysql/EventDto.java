package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EventDto {

    private List<EventStockDto> eventStocks = new ArrayList<>();
    private List<EventMoneyDto> eventMonies = new ArrayList<>();
}
