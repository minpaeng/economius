package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.PriceDto;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SelectStockResponse {

    private Integer stockId;
    private String name;
    private Integer stockIndustryId;
    private String companyCategory;
    private String companySubCategory;
    // 아이디, 보유량
    private Map<Long, Integer> owners;
    private int remainingAmount;
    private int price;
    private int rate;
    private List<PriceDto> priceHistory;
    private List<Integer> rateHistory;

}
