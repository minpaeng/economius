package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.SavingDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SavingVisitResponse {

    private Long player;
    private int money;
    private boolean have;
    private SavingDto savingDto;

}
