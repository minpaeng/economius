package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsuranceDto {

    private Integer insuranceId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String productName;
    private String productCode;
    private Integer monthlyDeposit;
    private Integer guaranteeRate;
}
