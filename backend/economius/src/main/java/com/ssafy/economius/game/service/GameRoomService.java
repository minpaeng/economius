package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.FIRST_PRIZE;
import static com.ssafy.economius.game.enums.RateEnum.FIRST_PRIZE_TAX;
import static com.ssafy.economius.game.enums.RateEnum.FOURTH_PRIZE;
import static com.ssafy.economius.game.enums.RateEnum.FOURTH_PRIZE_TAX;
import static com.ssafy.economius.game.enums.RateEnum.INITIAL_INTEREST_RATE;
import static com.ssafy.economius.game.enums.RateEnum.INITIAL_ZERO_VALUE;
import static com.ssafy.economius.game.enums.RateEnum.MAX_GAME_TURN;
import static com.ssafy.economius.game.enums.RateEnum.SECOND_PRIZE;
import static com.ssafy.economius.game.enums.RateEnum.SECOND_PRIZE_TAX;
import static com.ssafy.economius.game.enums.RateEnum.THIRD_PRIZE;
import static com.ssafy.economius.game.enums.RateEnum.THIRD_PRIZE_TAX;
import static com.ssafy.economius.game.enums.VolatileEnum.GOLD;
import static com.ssafy.economius.game.enums.VolatileEnum.HOTEL;
import static com.ssafy.economius.game.enums.VolatileEnum.RESTAURANT;
import static com.ssafy.economius.game.enums.VolatileEnum.SHOP;

import com.ssafy.economius.game.dto.mysql.*;
import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.dto.mysql.InsuranceDto;
import com.ssafy.economius.game.dto.mysql.IssueDto;
import com.ssafy.economius.game.dto.mysql.SavingsDto;
import com.ssafy.economius.game.dto.mysql.StockDto;
import com.ssafy.economius.game.dto.mysql.VolatileDto;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.entity.redis.Insurance;
import com.ssafy.economius.game.entity.redis.InterestRate;
import com.ssafy.economius.game.entity.redis.Issue;
import com.ssafy.economius.game.entity.redis.Price;
import com.ssafy.economius.game.entity.redis.Saving;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.enums.DescriptionTitleEnum;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.enums.IssueEnum;
import com.ssafy.economius.game.enums.RateEnum;
import com.ssafy.economius.game.enums.VolatileEnum;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRepository gameRepository;

    public CreateRoomResponse createRoom(Long player, String nickname) {
        // Redis에서 현제 키값들을 다 불러오는 기능
        Iterable<Game> all = gameRepository.findAll();

        // 새로운 keySet을 구현하는 방식을 통해 최적화 가능
        int roomId = 0;
        for (Game game : all) {
            roomId = Math.max(game.getRoomId(), roomId);
        }
        roomId++;
        creatRoomOnRedis(roomId, player, nickname);

        return new CreateRoomResponse(roomId);
    }

    private void creatRoomOnRedis(int roomId, Long player, String nickname) {
        List<Issue> issues = makeIssues();
        log.info(roomId + " " +  player + " " +  nickname);
        Game game = Game.builder()
                .players(new ArrayList<>(List.of(player)))
                .nicknames(new HashMap<>(){{put(player, nickname);}})
                .gameTurn(0)
                .roomId(roomId)
                .interestRate(makeInterestRate())
                .gold(makeGold())
                .issues(issues)
                .currentPrevIssues(InitialData.getPrevIssue(issues.get(0).getIssueId()))
                .stocks(makeStocks())
                .savings(makeSavings())
                .insurances(makeInsurance())
                .buildings(makeBuildings())
                .tax(makeTax())
                .maxGameTurn(MAX_GAME_TURN.getValue())
                .event(makeEvents())
                .build();

        log.info(game.getPlayers().toString());
        log.info(game.getNicknames().toString());
        gameRepository.save(game);
    }

    private Event makeEvents() {
        List<EventMoney> eventMonies = new ArrayList<>();
        List<EventStock> eventStocks = new ArrayList<>();
        for (EventMoneyDto eventDto : InitialData.EVENTS.getEventMonies()) {
            com.ssafy.economius.game.entity.redis.EventMoney eventMoney = com.ssafy.economius.game.entity.redis.EventMoney.builder()
                    .eventMoneyId(eventDto.getEventMoneyId())
                    .insuranceTypeId(eventDto.getInsuranceTypeId())
                    .typeCode(eventDto.getTypeCode())
                    .typeName(eventDto.getTypeName())
                    .name(eventDto.getName())
                    .description(eventDto.getDescription())
                    .money(eventDto.getMoney())
                    .url(eventDto.getUrl())
                    .build();
            eventMonies.add(eventMoney);
        }
        for (EventStockDto eventDto : InitialData.EVENTS.getEventStocks()) {
            com.ssafy.economius.game.entity.redis.EventStock eventStock = com.ssafy.economius.game.entity.redis.EventStock.builder()
                    .eventStockId(eventDto.getEventStockId())
                    .stockIndustryId(eventDto.getStockIndustryId())
                    .industry(eventDto.getIndustry())
                    .name(eventDto.getName())
                    .description(eventDto.getDescription())
                    .rate(eventDto.getRate())
                    .url(eventDto.getUrl())
                    .build();
            eventStocks.add(eventStock);
        }
        Event event = Event.builder()
                .eventMoney(eventMonies)
                .eventStock(eventStocks)
                .build();
        return event;
    }


    private static Map<Integer, Integer> makeTax() {
        return Map.of(FIRST_PRIZE.getValue(), FIRST_PRIZE_TAX.getValue(),
                SECOND_PRIZE.getValue(), SECOND_PRIZE_TAX.getValue(),
                THIRD_PRIZE.getValue(), THIRD_PRIZE_TAX.getValue(),
                FOURTH_PRIZE.getValue(), FOURTH_PRIZE_TAX.getValue());
    }

    private InterestRate makeInterestRate() {
        return InterestRate.builder()
                .rate(INITIAL_INTEREST_RATE.getValue())
                .rateHistory(new ArrayList<>(List.of(INITIAL_INTEREST_RATE.getValue())))
                .build();
    }

    private Gold makeGold() {
        VolatileDto gold = InitialData.VOLATILES.get(GOLD.getValue());

        return Gold.builder()
                .price(gold.getInitialValue())
                .priceHistory(new ArrayList<>(List.of(gold.getInitialValue())))
                .rate(INITIAL_ZERO_VALUE.getValue())
                .rateHistory(new ArrayList<>(List.of(0)))
                .build();
    }

    private List<Issue> makeIssues() {
        List<Issue> issues = new ArrayList<>();
        List<Integer> list = pickIssues();

        for (int idx : list) {
            IssueDto issue = InitialData.ISSUES.get(idx);
            Issue tmpIssue = Issue.builder()
                    .issueId(issue.getIssueId())
                    .name(issue.getName())
                    .type(issue.isType() ? IssueEnum.BOOM : IssueEnum.DEPRESSION)
                    .country(issue.getCountry())
                    .year(issue.getYear())
                    .description(issue.getDescription())
                    .url(issue.getUrl())
                    .currentAssetChanges(setCurrentAssetChanges(issue.getAssetChanges()))
                    .build();
            issues.add(tmpIssue);
        }
        return issues;
    }

    private List<AssetChange> setCurrentAssetChanges(List<IssueStockDto> assetChanges) {
        List<AssetChange> list = new ArrayList<>();

        for (IssueStockDto issueStockDto : assetChanges) {
            log.info("Dd: " + issueStockDto.getAssetType());
            list.add(AssetChange.builder()
                    .issueStockId(issueStockDto.getIssueStockId())
                    .issueId(issueStockDto.getIssueId())
                    .issueName(issueStockDto.getName())
                    .type(issueStockDto.getTypeIssueEnum())
                    .assetType(issueStockDto.getAssetType())
                    .assetId(issueStockDto.getAssetId())
                    .changeRate(issueStockDto.getChangeUnitEnum())
                    .changeReason(setChangeReasonTitle(issueStockDto) + issueStockDto.getChangeReason())
                    .build());
        }

        return list;
    }

    private String setChangeReasonTitle(IssueStockDto issueStockDto) {
        String type = issueStockDto.getAssetType();
        String space = " ";
        if (type.equals(VolatileEnum.GOLD.getValue()))
            return DescriptionTitleEnum.GOLD.getTitle() + space;
        else if (type.equals(VolatileEnum.INTEREST_RATE.getValue()))
            return DescriptionTitleEnum.INTEREST_RATE.getTitle() + space;
        else if (type.equals(VolatileEnum.BUIDING.getValue()))
            return DescriptionTitleEnum.BUILDING.getTitle() + space;
        else if (type.equals(VolatileEnum.STOCK.getValue())) {
            return DescriptionTitleEnum.STOCK.getTitle()
                    + getStockType(InitialData.STOCKS.get(issueStockDto.getAssetId()).getType()) + space;
        }
        return space;
    }

    private String getStockType(String type) {
        for (DescriptionTitleEnum titleEnum : DescriptionTitleEnum.values()) {
            if (type.equals(titleEnum.getType())) return titleEnum.getTitle();
        }
        return "";
    }


    private List<Integer> pickIssues() {
        int size = RateEnum.ISSUE_COUNT.getValue();
        int lowerBound = 0;
        int upperBound = InitialData.ISSUES.size() - 1;
        return RandomUtil.getUniqueRandomNumbers(size, lowerBound, upperBound);
    }

    private Map<Integer, Stock> makeStocks() {
        Map<Integer, Stock> stocks = new HashMap<>();

        for (StockDto stock : InitialData.STOCKS.values()) {
            Stock tmpStock = Stock.builder()
                    .stockId(stock.getStockId())
                    .name(stock.getCompany())
                    .stockIndustryId(stock.getStockIndustryId())
                    .companyCategory(stock.getIndustry())
                    .companySubCategory(stock.getType())
                    .owners(new HashMap<>())
                    .rateHistory(new ArrayList<>(List.of(0)))
                    .rate(INITIAL_ZERO_VALUE.getValue())
                    .price(stock.getInitialValue())
                    .priceHistory(
                            new ArrayList<>(List.of(
                                    Price.builder()
                                            .closingPrice(stock.getInitialValue())
                                            .highPrice(stock.getInitialValue())
                                            .lowPrice(stock.getInitialValue())
                                            .openingPrice(stock.getInitialValue())
                                            .build()))
                    )
                    .remainingAmount(100)
                    .build();

            stocks.put(stock.getStockId(), tmpStock);
        }

        return stocks;
    }

    private Map<Integer, Saving> makeSavings() {
        Map<Integer, Saving> savings = new HashMap<>();

        for (SavingsDto saving : InitialData.SAVINGS) {
            Saving tmpSaving = Saving.builder()
                    .name(saving.getSavingName())
                    .monthlyDeposit(saving.getMonthlyDeposit())
                    .rate(saving.getRate())
                    .finishCount(saving.getFinishCount())
                    .build();

            savings.put(saving.getBankId(), tmpSaving);
        }

        return savings;
    }

    private Map<Integer, Insurance> makeInsurance() {
        Map<Integer, Insurance> insurances = new HashMap<>();

        for (InsuranceDto insurance : InitialData.INSURANCES) {
            Insurance tmpInsurance = Insurance.builder()
                    .guaranteeRate(insurance.getGuaranteeRate())
                    .categoryCode(Character.toString(insurance.getProductCode().charAt(1)))
                    .category(insurance.getTypeCode())
                    .productCode(insurance.getProductCode())
                    .productName(insurance.getProductName())
                    .monthlyDeposit(insurance.getMonthlyDeposit())
                    .build();
            insurances.put(insurance.getInsuranceId(), tmpInsurance);
        }

        return insurances;
    }

    private Map<Integer, Building> makeBuildings() {
        Map<Integer, Building> buildings = new HashMap<>();

        List<VolatileDto> tmpBuildings = List.of(
                InitialData.VOLATILES.get(HOTEL.getValue()),
                InitialData.VOLATILES.get(SHOP.getValue()),
                InitialData.VOLATILES.get(RESTAURANT.getValue()));

        for (VolatileDto building : tmpBuildings) {
            Building tmpBuilding = Building.builder()
                    .name(building.getName())
                    .ownerId(null)
                    .priceHistory(new ArrayList<>(List.of(building.getInitialValue())))
                    .rateHistory(new ArrayList<>(List.of(0)))
                    .price(building.getInitialValue())
                    .rate(INITIAL_ZERO_VALUE.getValue())
                    .build();

            buildings.put(building.getVolatileId(), tmpBuilding);
        }

        return buildings;
    }
}
