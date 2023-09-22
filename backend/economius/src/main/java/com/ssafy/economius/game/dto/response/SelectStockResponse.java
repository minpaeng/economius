package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.StockAmountDto;
import java.util.List;

public class SelectStockResponse {

    private Long player;
    private String companyCode;
    private List<StockAmountDto> stockAmount;

}
