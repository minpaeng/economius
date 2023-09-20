package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReceiptDto {

    private int salary;
    private int savingFinishCost;
    private int tax;
    private int savingsPrice;
    private int insurancePrice;
    private int totalPrice;
    private int money;
}
