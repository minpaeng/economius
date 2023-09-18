package com.ssafy.economius.game.service;

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
import com.ssafy.economius.game.entity.redis.Saving;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.enums.InitialData;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameRoomService {

    private final GameRepository gameRepository;

    private static final int INITIAL_INTEREST_RATE = 3;

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
            .portfolios(new HashMap<>())
            .interestRate(makeInterestRate())
            .gold(makeGold())
            .stocks(makeStocks())
            .savings(makeSavings())
            .insurances(makeInsurance())
            .buildings(makeBuildings())
            .build();

        gameRepository.save(game);
    }

    private InterestRate makeInterestRate() {
        return InterestRate.builder()
            .rate(INITIAL_INTEREST_RATE)
            .rateHistory(new ArrayList<>())
            .build();
    }

    private Gold makeGold() {
        VolatileDto gold = InitialData.VOLATILES.get(GOLD.getValue());

        return Gold.builder()
            .price(gold.getInitialValue())
            .priceHistory(new ArrayList<>())
            .rate(0)
            .rateHistory(new ArrayList<>())
            .build();
    }

    private List<Stock> makeStocks() {
        ArrayList<Stock> stocks = new ArrayList<>();
        for (StockDto stock : InitialData.STOCKS) {
            Stock tmpStock = Stock.builder()
                .name(stock.getCompany())
                .companyCategory(stock.getIndustry())
                .companySubCategory(stock.getType())
                .owners(new HashMap<>())
                .rateHistory(new ArrayList<>())
                .rate(0)
                .priceHistory(new ArrayList<>())
                .price(stock.getInitialValue())
                .build();

            stocks.add(tmpStock);
        }

        return stocks;
    }

    private List<Saving> makeSavings() {
        ArrayList<Saving> savings = new ArrayList<>();

        for (SavingsDto saving : InitialData.SAVINGS) {
            Saving tmpSaving = Saving.builder()
                .name(saving.getName())
                .price(saving.getMonthlyDeposit())
                .rate(saving.getFinishRate())
                .finishCount(saving.getFinishCount())
                .build();

            savings.add(tmpSaving);
        }

        return savings;
    }

    private List<Insurance> makeInsurance() {
        ArrayList<Insurance> insurances = new ArrayList<>();

        for (InsuranceDto insurance : InitialData.INSURANCES) {
            Insurance tmpInsurance = Insurance.builder()
                .benefitRate(insurance.getGuaranteeRate())
                .category(Character.toString(insurance.getProductCode().charAt(1)))
                .type(insurance.getTypeCode())
                .code(insurance.getProductCode())
                .name(insurance.getProductName())
                .price(insurance.getMonthlyDeposit())
                .build();

            insurances.add(tmpInsurance);
        }

        return insurances;
    }

    private List<Building> makeBuildings() {
        ArrayList<Building> buildings = new ArrayList<>();

        List<VolatileDto> tmpBuildings = List.of(
            InitialData.VOLATILES.get(HOTEL.getValue()),
            InitialData.VOLATILES.get(SHOP.getValue()),
            InitialData.VOLATILES.get(RESTAURANT.getValue()));

        for (VolatileDto building : tmpBuildings) {
            Building tmpBuilding = Building.builder()
                .name(building.getName())
                .ownerId(0L)
                .priceHistory(new ArrayList<>())
                .rateHistory(new ArrayList<>())
                .price(building.getInitialValue())
                .rate(0)
                .build();

            buildings.add(tmpBuilding);
        }

        return buildings;
    }
}
