package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.InsuranceDto;
import com.ssafy.economius.game.dto.InsurancesDto;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Map;

@Data
@Builder
@ToString
public class InsuranceVisitResponse {
    private Long player;
    private Map<Integer, Boolean> have;
    private Map<Integer, InsuranceDto> insuranceDto;
}
