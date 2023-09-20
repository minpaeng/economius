package com.ssafy.economius.game.entity.redis;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PortfolioSavings {

    private int totalPrice;
    private int amount;
    private List<PortfolioSaving> saving;

    public int calculateFinishSaving() {
        if (saving != null) {
            return this.saving.stream()
                .filter(PortfolioSaving::checkSavingFinish)
                .mapToInt(this::deleteSaving)
                .sum();
        }
        return 0;
    }

    public void updateSavings(){
        this.saving.forEach(PortfolioSaving::updateCurrentCount);
    }

    public int calculateSavingPrice() {
        if (saving != null) {
            return this.saving.stream()
                .mapToInt(PortfolioSaving::getMonthlyDeposit)
                .sum();
        }
        return 0;

    }

    private int deleteSaving(PortfolioSaving saving) {
        int finishPrice = saving.getCurrentPrice();
        this.saving.remove(saving);
        return finishPrice;
    @Override
    public String toString() {
        return "PortfolioSavings{" +
                "totalPrice=" + totalPrice +
                ", amount=" + amount +
                ", saving=" + saving +
                '}';
    }
}
