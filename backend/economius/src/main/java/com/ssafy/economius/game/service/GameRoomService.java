package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.mysql.InsuranceDto;
import com.ssafy.economius.game.dto.mysql.IssueDto;
import com.ssafy.economius.game.dto.mysql.SavingsDto;
import com.ssafy.economius.game.dto.mysql.StockDto;
import com.ssafy.economius.game.dto.mysql.VolatileDto;
import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.entity.mysql.EventMoney;
import com.ssafy.economius.game.entity.mysql.EventStock;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.entity.redis.Insurance;
import com.ssafy.economius.game.entity.redis.InterestRate;
import com.ssafy.economius.game.entity.redis.Issue;
import com.ssafy.economius.game.entity.redis.Price;
import com.ssafy.economius.game.entity.redis.Saving;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.enums.IssueEnum;
import com.ssafy.economius.game.enums.RateEnum;
import com.ssafy.economius.game.repository.redis.GameRepository;
import com.ssafy.economius.game.util.RandomUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.economius.game.enums.RateEnum.*;
import static com.ssafy.economius.game.enums.VolatileEnum.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRepository gameRepository;

    public CreateRoomResponse createRoom(Long player) {
        // Redis에서 현제 키값들을 다 불러오는 기능
        Iterable<Game> all = gameRepository.findAll();

        // 새로운 keySet을 구현하는 방식을 통해 최적화 가능
        int roomId = 0;
        for (Game game : all) {
            roomId = Math.max(game.getRoomId(), roomId);
        }
        roomId++;
        creatRoomOnRedis(roomId, player);

        return new CreateRoomResponse(roomId);
    }

    private void creatRoomOnRedis(int roomId, Long player) {
        List<Issue> issues = makeIssues();

        Game game = Game.builder()
                .players(new ArrayList<>(List.of(player)))
                .gameTurn(0)
                .roomId(roomId)
                .interestRate(makeInterestRate())
                .gold(makeGold())
                .issues(issues)
                .currentPrevIssue(InitialData.getPrevIssue(issues.get(0).getIssueId()))
                .stocks(makeStocks())
                .savings(makeSavings())
                .insurances(makeInsurance())
                .buildings(makeBuildings())
                .tax(makeTax())
                .maxGameTurn(MAX_GAME_TURN.getValue())
                .eventMoney(makeEventMoney())
                .eventStock(makeEventStock())
                .build();
        gameRepository.save(game);
    }

    private List<EventStock> makeEventStock() {
        List<EventStock> eventStocks = new ArrayList<>();

        return eventStocks;
    }

    private List<EventMoney> makeEventMoney() {
        List<EventMoney> eventMonies = new ArrayList<>();

        return eventMonies;

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
                    .build();
            issues.add(tmpIssue);
        }
        return issues;
    }

    private List<Integer> pickIssues() {
        int size = RateEnum.ISSUE_COUNT.getValue();
        int lowerBound = 0;
        int upperBound = InitialData.ISSUES.size() - 1;
        return RandomUtil.getUniqueRandomNumbers(size, lowerBound, upperBound);
    }

    private Map<Integer, Stock> makeStocks() {
        Map<Integer, Stock> stocks = new HashMap<>();

        for (StockDto stock : InitialData.STOCKS) {
            Stock tmpStock = Stock.builder()
                    .stockId(stock.getStockId())
                    .name(stock.getCompany())
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

            //log.info(saving.getBankId().toString());
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
            //log.info(insurance.toString());
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
