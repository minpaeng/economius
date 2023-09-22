package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
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
