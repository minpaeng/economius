package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Insurance {

    private Integer insuranceId;
    private Integer insuranceTypeId;
    private String typeCode;
    private String typeName;
    private String productName;
    private String productCode;
    private Integer monthlyDeposit;
    private Integer guaranteeRate;
}
