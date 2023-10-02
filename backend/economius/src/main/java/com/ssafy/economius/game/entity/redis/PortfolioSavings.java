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
            return this.savings.values().stream()
                .filter(PortfolioSaving::checkSavingFinish)
                .mapToInt(this::deleteSaving)
                .sum();
        }
        return 0;
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
