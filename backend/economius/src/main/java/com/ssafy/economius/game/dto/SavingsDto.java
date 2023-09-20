package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SavingsDto {

    private int totalPrice;
    private int amount;
    private List<SavingDto> savings;
}
