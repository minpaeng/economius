package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.PortfolioDto;
import com.ssafy.economius.game.dto.ReceiptDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CalculateResponse {

    private Long player;
    private ReceiptDto receipt;
    private PortfolioDto portfolio;
}
