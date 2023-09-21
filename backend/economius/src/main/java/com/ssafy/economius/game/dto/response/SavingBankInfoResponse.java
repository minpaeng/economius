package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.SavingInfoDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SavingBankInfoResponse {

    private Long player;
    private int money;
    private boolean join;
    private SavingDto memberSavings;

}
