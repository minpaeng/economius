package com.ssafy.economius.game.dto.message;

import com.ssafy.economius.game.dto.BuildingChangeDto;
import com.ssafy.economius.game.dto.GoldChangeDto;
import com.ssafy.economius.game.dto.InterestChangeDto;
import com.ssafy.economius.game.dto.StockChangeDto;
import java.util.List;

public class SetEconomyMessage {
    private InterestChangeDto interestRate;
    private GoldChangeDto gold;
    private List<BuildingChangeDto> buildings;
    private List<StockChangeDto> stocks;
}
