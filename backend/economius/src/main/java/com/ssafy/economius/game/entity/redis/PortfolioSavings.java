package com.ssafy.economius.game.entity.redis;

import java.util.List;
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
    private List<PortfolioSaving> savings;

    public SavingsDto toDto() {
        List<SavingDto> savingDtoList = null;

        if (savings != null) {
            savingDtoList = savings.stream()
                    .map(PortfolioSaving::toDto) // 각 PortfolioSaving 객체를 SavingDto로 변환
                    .collect(Collectors.toList());
        }

        return SavingsDto.builder()
                .totalPrice(this.totalPrice)
                .amount(this.amount)
                .savings(savingDtoList)  // 변환된 SavingDto 리스트를 설정
                .build();
    }

    public int calculateFinishSaving() {
        if (savings != null) {
            return this.savings.stream()
                .filter(PortfolioSaving::checkSavingFinish)
                .mapToInt(this::deleteSaving)
                .sum();
        }
        return 0;
    }

    public void updateSavings(){
        this.savings.forEach(PortfolioSaving::updateCurrentCount);
    }

    public int calculateSavingPrice() {
        if (savings != null) {
            return this.savings.stream()
                .mapToInt(PortfolioSaving::getMonthlyDeposit)
                .sum();
        }
        return 0;

    }

    private int deleteSaving(PortfolioSaving saving) {
        int finishPrice = saving.getCurrentPrice();
        this.savings.remove(saving);
        return finishPrice;
    }

    @Override
    public String toString() {
        return "PortfolioSavings{" +
                "totalPrice=" + totalPrice +
                ", amount=" + amount +
                ", saving=" + savings +
                '}';
    }
}
