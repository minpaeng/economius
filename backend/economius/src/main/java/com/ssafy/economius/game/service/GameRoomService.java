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

import com.ssafy.economius.game.dto.mysql.InsuranceDto;
import com.ssafy.economius.game.dto.mysql.SavingsDto;
import com.ssafy.economius.game.dto.mysql.StockDto;
import com.ssafy.economius.game.dto.mysql.VolatileDto;
import com.ssafy.economius.game.dto.response.CreateRoomResponse;
import com.ssafy.economius.game.entity.redis.Building;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Gold;
import com.ssafy.economius.game.entity.redis.Insurance;
import com.ssafy.economius.game.entity.redis.InterestRate;
import com.ssafy.economius.game.entity.redis.Price;
import com.ssafy.economius.game.entity.redis.Saving;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
        Game game = Game.builder()
            .players(new ArrayList<>(List.of(player)))
            .gameTurn(0)
            .roomId(roomId)
            .interestRate(makeInterestRate())
            .gold(makeGold())
            .stocks(makeStocks())
            .savings(makeSavings())
            .insurances(makeInsurance())
            .buildings(makeBuildings())
            .tax(makeTax())
            .maxGameTurn(MAX_GAME_TURN.getValue())
            .build();

        gameRepository.save(game);
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

    private Map<Integer, Stock> makeStocks() {
        Map<Integer, Stock> stocks = new HashMap<>();

        for (StockDto stock : InitialData.STOCKS) {
            Stock tmpStock = Stock.builder()
                .name(stock.getCompany())
                .companyCategory(stock.getIndustry())
                .companySubCategory(stock.getType())
                .owners(new HashMap<>())
                .rateHistory(new ArrayList<>(List.of(0)))
                .rate(INITIAL_ZERO_VALUE.getValue())
                .priceHistory(new ArrayList<>())
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

            log.info(saving.getBankId().toString());
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
            log.info(insurance.toString());
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
