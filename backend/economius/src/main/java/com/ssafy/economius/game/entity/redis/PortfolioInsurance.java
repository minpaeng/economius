package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioInsurance {

    private Integer insuranceId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String productName;
    private String productCode;
    private Integer monthlyDeposit;
    private Integer guaranteeRate;

}
