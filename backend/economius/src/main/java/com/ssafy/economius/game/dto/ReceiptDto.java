package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReceiptDto {

    private int salary;
    private int savingFinishBenefit;
    private int tax;
    private int savingsPrice;
    private int insurancePrice;
    private int totalIncome;
    private int money;
}
