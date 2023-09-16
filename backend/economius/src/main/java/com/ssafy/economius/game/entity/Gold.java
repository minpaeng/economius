package com.ssafy.economius.game.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Gold {

    private int price;
    private int rate;
    private List<Integer> priceHistory;
    private List<Integer> rateHistory;
}
