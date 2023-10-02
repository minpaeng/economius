package com.ssafy.economius.game.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ViewMovementCardResponse {

    private Long player;
    private List<Integer> cards;
}
