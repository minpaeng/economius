package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
@AllArgsConstructor
@Builder
@Getter
@ToString
public class Event {
    private List<EventMoney> eventMoney;
    private List<EventStock> eventStock;
}
