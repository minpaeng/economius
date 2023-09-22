package com.ssafy.economius.game.enums;

import com.ssafy.economius.game.dto.mysql.EventDto;
import com.ssafy.economius.game.dto.mysql.InsuranceDto;
import com.ssafy.economius.game.dto.mysql.InsuranceTypeDto;
import com.ssafy.economius.game.dto.mysql.IssueDto;
import com.ssafy.economius.game.dto.mysql.SavingsDto;
import com.ssafy.economius.game.dto.mysql.StockDto;
import com.ssafy.economius.game.dto.mysql.StockIndustryDto;
import com.ssafy.economius.game.dto.mysql.VolatileDto;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InitialData {

    public static List<SavingsDto> SAVINGS = new ArrayList<>();
    public static Map<String, VolatileDto> VOLATILES = new HashMap<>();
    public static EventDto EVENTS = new EventDto();
    public static List<InsuranceDto> INSURANCES = new ArrayList<>();
    public static List<IssueDto> ISSUES = new ArrayList<>();
    public static List<StockIndustryDto> STOCK_INDUSTRIES = new ArrayList<>();
    public static List<StockDto> STOCKS = new ArrayList<>();
    public static List<InsuranceTypeDto> INSURANCE_TYPE = new ArrayList<>();
}
