package com.ssafy.economius.game.controller.dto.response;

import com.ssafy.economius.game.controller.dto.StockAmountDto;
import java.util.List;

public class SelectStockResponse {

    private String player;
    private String companyCode;
    private List<StockAmountDto> stockAmount;

}
