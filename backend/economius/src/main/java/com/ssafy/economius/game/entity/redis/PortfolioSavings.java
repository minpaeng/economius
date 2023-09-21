package com.ssafy.economius.game.entity.redis;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.SavingsDto;
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
        this.savings.values().forEach(PortfolioSaving::updateCurrentCount);
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
