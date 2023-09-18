package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Event {

    private List<EventStock> eventStocks = new ArrayList<>();
    private List<EventMoney> eventMonies = new ArrayList<>();
}
