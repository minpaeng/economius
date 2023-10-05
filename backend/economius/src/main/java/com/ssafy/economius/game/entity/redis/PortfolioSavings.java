package com.ssafy.economius.game.entity.redis;

import java.util.HashMap;
import java.util.Map;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class PortfolioSavings {

    private int totalPrice;
    private int amount;
    private Map<Integer, PortfolioSaving> savings;

    public int calculateFinishSaving() {
        if (savings != null) {
            return (int) this.savings.values().stream()
                    .filter(PortfolioSaving::checkSavingFinish)
                    .mapToDouble(s -> calculateFinalSavingWithRate(s))
                    .sum();
        }
        return 0;
    }

    private int calculateFinalSavingWithRate(PortfolioSaving saving) {
        double calculatedValue = saving.getCurrentPrice() + (saving.getCurrentPrice() * ((double) saving.getRate() / 100));
        return (int) Math.round(calculatedValue);
    }


    public void updateSavings(){
        if (savings != null){
            this.savings.values().forEach(PortfolioSaving::updateCurrentCount);
        }
    }

    public int calculateSavingPrice() {
        int sum = 0;
        if (savings != null) {
            for (PortfolioSaving saving : savings.values()) {
                saving.increaseCurrentPrice();
                saving.increaseCurrentCount();

                sum += saving.getMonthlyDeposit();
            }
            this.totalPrice += sum;
        }
        return sum;
    }

    private int deleteSaving(PortfolioSaving saving) {
        int finishPrice = saving.getCurrentPrice();
        this.totalPrice -= finishPrice;
        this.amount -= 1;
        this.savings.remove(saving.getBankId());
        return finishPrice;
    }

    public int earlyFinish(PortfolioSaving saving) {
        int currentPrice = saving.getCurrentPrice();
        this.totalPrice -= currentPrice;
        this.amount -= 1;
        this.savings.remove(saving.getBankId());
        return currentPrice;
    }

    public int join(PortfolioSaving saving) {
        int monthlyPrice = saving.getMonthlyDeposit();
        this.totalPrice += monthlyPrice;
        this.amount += 1;

        if(this.savings == null) savings = new HashMap<>();
        this.savings.put(saving.getBankId(), saving);
        return monthlyPrice;
    }

}
