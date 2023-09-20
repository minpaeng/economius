package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.enums.SavingIdEnums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Builder
@Getter
public class Saving {
    private SavingIdEnums bankId; // enum을 통한 id 컬럼 추가
    private String name;
    private int rate;
    private int monthlyDeposit;
    private int finishCount;

    @Override
    public String toString() {
        return "Saving{" +
                "bankId=" + bankId +
                ", name='" + name + '\'' +
                ", rate=" + rate +
                ", price=" + monthlyDeposit +
                ", finishCount=" + finishCount +
                '}';
    }
}
