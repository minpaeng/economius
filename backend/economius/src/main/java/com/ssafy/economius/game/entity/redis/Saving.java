package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.dto.SavingInfoDto;
import com.ssafy.economius.game.enums.SavingIdEnums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Builder
@Getter
public class Saving {
    //private int bankId; // enum을 통한 id 컬럼 추가
    private String name;
    private int monthlyDeposit;
    private int finishCount;
    private int rate;

    @Override
    public String toString() {
        return "Saving{" +
                "name='" + name + '\'' +
                ", rate=" + rate +
                ", price=" + monthlyDeposit +
                ", finishCount=" + finishCount +
                '}';
    }

    public SavingInfoDto toDto() {
        return SavingInfoDto.builder()
                //.bankId(this.bankId)
                .name(this.name)
                .monthlyDeposit(this.monthlyDeposit)
                .finishCount(this.finishCount)
                .rate(this.rate)
                .build();
    }


}
