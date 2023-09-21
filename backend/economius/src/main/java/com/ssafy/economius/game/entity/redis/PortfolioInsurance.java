package com.ssafy.economius.game.entity.redis;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
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
