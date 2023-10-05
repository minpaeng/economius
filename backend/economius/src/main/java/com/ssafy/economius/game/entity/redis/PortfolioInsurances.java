package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
import java.util.Map;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
@Setter
public class PortfolioInsurances {

    //private int totalPrice;
    private int amount;
    private Map<Integer, PortfolioInsurance> insurance;
    public int calculateInsurancePrice() {
        int sum = 0;
        if (insurance != null) {
            for (PortfolioInsurance portfolioInsurance : insurance.values()) {
                sum += portfolioInsurance.getMonthlyDeposit();
            }
            //this.totalPrice += sum;
        }
        return sum;
    }

    public synchronized void deleteInsurance(PortfolioInsurance portfolioInsurance) {
        this.amount -= 1;
        this.insurance.remove(portfolioInsurance.getInsuranceId());
    }

    public synchronized int join(PortfolioInsurance portfolioInsurance) {
        if(this.insurance == null) {
            this.amount = 0;
            insurance = new HashMap<>();
        }
        int monthlyPrice = portfolioInsurance.getMonthlyDeposit();
        this.amount += 1;
        this.insurance.put(portfolioInsurance.getInsuranceId(), portfolioInsurance);
        return monthlyPrice;
    }
}
