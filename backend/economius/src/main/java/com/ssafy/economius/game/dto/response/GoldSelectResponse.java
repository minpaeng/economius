package com.ssafy.economius.game.dto.response;

import java.util.List;
import lombok.Data;

@Data
public class GoldSelectResponse {
    private int price;
    private int rate;
    private List<Integer> priceHistory;
    private List<Integer> rateHistory;
}
