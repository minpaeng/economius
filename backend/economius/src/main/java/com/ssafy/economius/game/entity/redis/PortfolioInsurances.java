package com.ssafy.economius.game.entity.redis;

import java.util.List;
import java.util.Map;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class PortfolioInsurances {

    private int totalPrice;
    private int amount;
    private Map<Integer, PortfolioInsurance> insurance;


}
