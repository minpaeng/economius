package com.ssafy.economius.game.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class SavingsDto {

    private int totalPrice;
    private int amount;
    private Map<Integer, SavingDto> savings;

}
