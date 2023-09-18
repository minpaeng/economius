package com.ssafy.economius.game.dto.mysql;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InitialDataDto {

    public static List<SavingsDto> savings = new ArrayList<>();
    public static Map<String, VolatileDto> volatileDtos = new HashMap<>();
    public static EventDto events = new EventDto();
    public static List<InsuranceDto> insuranceDtos = new ArrayList<>();
    public static List<IssueDto> issueDtos = new ArrayList<>();
    public static List<StockIndustryDto> stockIndustries = new ArrayList<>();
    public static List<StockDto> stockDtos = new ArrayList<>();
    public static List<InsuranceTypeDto> insuranceTypeDtos = new ArrayList<>();
}
