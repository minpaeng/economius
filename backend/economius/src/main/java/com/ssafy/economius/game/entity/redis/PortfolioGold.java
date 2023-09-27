package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class PortfolioGold {

    private int totalPrice;
    private int amount;
    private int earningPrice;
    private int earningRete;

    // 금 구매, 금 판매, 금 가격 재설정시 호출
    public void updatePortfolioGold(int goldPrice) {
        log.info("updateGold" + goldPrice);

        earningPrice = goldPrice * amount;
        earningRete = (int) ((double) (earningPrice - totalPrice) / totalPrice * 100);
    }

    public void dealGold(int amount, int goldPrice) {
        this.amount += amount;
        totalPrice += amount * goldPrice;
        updatePortfolioGold(goldPrice);
    }
}
