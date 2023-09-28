package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.SavingsDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SavingResponse {

    private Long player;
    private int money;
    private SavingsDto savings;


}
