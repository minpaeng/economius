package com.ssafy.economius.game.entity.redis;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class PortfolioInsurance {
    private Integer insuranceId;
    //private Integer insuranceTypeId;
    private String category;
    private String categoryCode;
    private String productCode;
    private String productName;
    private Integer guaranteeRate;
    private Integer monthlyDeposit;

}
