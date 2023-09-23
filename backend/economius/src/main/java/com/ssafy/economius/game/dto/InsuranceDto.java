package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
@Getter
public class InsuranceDto {

    private String insuranceCode;
    private String getInsuranceName;
    private int perPrice;
    //private int totalPrice;
    private int insuranceBenefit;
}
