package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.SavingsDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SavingResponse {

    private Long player;
    private int money;
    private List<SavingsDto> savings;
}
