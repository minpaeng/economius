package com.ssafy.economius.game.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class ViewMovementCardResponse {

    private Long player;
    private List<Integer> cards;
}
