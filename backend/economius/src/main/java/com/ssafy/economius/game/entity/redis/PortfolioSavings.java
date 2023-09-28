package com.ssafy.economius.game.entity.redis;

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
        if (savings != null) {
            return this.savings.values().stream()
                .mapToInt(PortfolioSaving::getMonthlyDeposit)
                .sum();
        }
        return 0;

    }

    private int deleteSaving(PortfolioSaving saving) {
        int finishPrice = saving.getCurrentPrice();
        this.savings.remove(saving.getBankId());
        return finishPrice;
    }
    
}
