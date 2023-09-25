package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PriceDto {

    private Integer openingPrice;
    private Integer closingPrice;
    private Integer highPrice;
    private Integer lowPrice;
}
