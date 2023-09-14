package com.ssafy.economius.game.controller.dto.message;

import com.ssafy.economius.game.controller.dto.BuildingChangeDto;
import com.ssafy.economius.game.controller.dto.GoldChangeDto;
import com.ssafy.economius.game.controller.dto.InterestChangeDto;
import com.ssafy.economius.game.controller.dto.StockChangeDto;
import java.util.List;

public class SetEconomyMessage {
    private InterestChangeDto interestRate;
    private GoldChangeDto gold;
    private List<BuildingChangeDto> buildings;
    private List<StockChangeDto> stocks;
}
