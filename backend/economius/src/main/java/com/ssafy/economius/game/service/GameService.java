package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.INITIAL_MONEY;
import static com.ssafy.economius.game.enums.RateEnum.INITIAL_ZERO_VALUE;
import static com.ssafy.economius.game.enums.RateEnum.SALARY;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.ReceiptDto;
import com.ssafy.economius.game.dto.response.CalculateResponse;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.dto.response.GameRoomExitResponse;
import com.ssafy.economius.game.dto.response.GameStartResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.PortfolioBuildings;
import com.ssafy.economius.game.entity.redis.PortfolioGold;
import com.ssafy.economius.game.entity.redis.PortfolioInsurances;
import com.ssafy.economius.game.entity.redis.PortfolioSavings;
import com.ssafy.economius.game.entity.redis.PortfolioStocks;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public GameJoinResponse join(int roomId, Long player, String nickname) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        if (game.getPlayers().size() >= 4) {
            throw new RuntimeException("방에 인원이 다 찼습니다.");
        }

        game.getPlayers().add(player);
        game.getNicknames().put(player, nickname);
        gameRepository.save(game);

        return makeGameJoinResponse(roomId, game);
    }

    public GameStartResponse start(int roomId, Long hostPlayer) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        List<Long> players = game.getPlayers();

        if (!players.get(0).equals(hostPlayer)) {
            log.error("호스트가 아닌 사용자의 요청");
            throw new RuntimeException();
        }

        // 현제인원이 4명인지 체크
        if (players.size() != 4) {
            log.error("인원이 부족합니다.");
            throw new RuntimeException();
        }

        // 각자의 포트폴리오 생성
        uploadInitialPortfolioOnRedis(game);

        game.initializePlayerSequence();
        game.initializeLocations();
        game.getStocks().values().forEach(stock -> stock.initializeOwners(players));
        gameRepository.save(game);

        return new GameStartResponse(roomId);
    }

    public GameRoomExitResponse exit(int roomId, Long player) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        for (Long p : game.getPlayers()) {
            if (p.equals(player)) {
                game.getPlayers().remove(p);
                gameRepository.save(game);
                return new GameRoomExitResponse(player, game.getPlayers().get(0));
            }
        }

        gameValidator.throwNotExistPlayerResponse(roomId, player);
        return new GameRoomExitResponse(null, null);
    }

    private void uploadInitialPortfolioOnRedis(Game game) {
        Map<Long, Portfolio> portfolioMap = new HashMap<>();
        for (Long player : game.getPlayers()) {
            portfolioMap.put(player, Portfolio.builder()
                .money(INITIAL_MONEY.getValue())
                .player(player)
                .gold(makePortfolioGold())
                .savings(makePortfolioSavings())
                .buildings(makePortfolioBuildings())
                .stocks(makePortfolioStocks())
                .insurances(portfolioInsurances())
                .totalMoney(INITIAL_MONEY.getValue())
                .build());
        }

        game.initializePortfolio(portfolioMap);
    }

    private PortfolioStocks makePortfolioStocks() {
        return PortfolioStocks.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .earningPrice(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .earningRate(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    private PortfolioBuildings makePortfolioBuildings() {
        return PortfolioBuildings.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .earningPrice(INITIAL_ZERO_VALUE.getValue())
            .earningRate(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    private PortfolioGold makePortfolioGold() {
        return PortfolioGold.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    private PortfolioInsurances portfolioInsurances() {
        return PortfolioInsurances.builder()
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .amount(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    private PortfolioSavings makePortfolioSavings() {
        return PortfolioSavings.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    public CalculateResponse calculate(int roomId, Long player) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        game.updatePrize();
        int prize = game.getPrizeByPlayer(player);

        Portfolio portfolio = game.getPortfolios().get(player);
        PortfolioSavings savings = portfolio.getSavings();
        savings.updateSavings();

        int finishSaving = portfolio.getSavings().calculateFinishSaving();
        int savingPrice = savings.calculateSavingPrice();
        int insurancePrice = portfolio.getInsurances().getTotalPrice();
        int money = portfolio.getMoney();
        int income = (finishSaving - savingPrice - insurancePrice + SALARY.getValue());
        int tax = (int) (income * (double) game.getTax().get(prize) / 100);
        portfolio.setMoney(money + income - tax);

        ReceiptDto receipt = ReceiptDto.builder()
            .tax(tax)
            .salary(SALARY.getValue())
            .money(game.getPortfolios().get(player).getMoney())
            .insurancePrice(insurancePrice)
            .savingFinishBenefit(finishSaving)
            .savingsPrice(savingPrice)
            .totalIncome(income)
            .build();

        portfolio.updateTotalMoney();

        gameRepository.save(game);

        return CalculateResponse.builder()
            .receipt(receipt)
            .player(player)
            .build();
    }

    private GameJoinResponse makeGameJoinResponse(int roomId, Game game) {
        return GameJoinResponse.builder()
                .roomId(roomId)
                .players(game.getPlayers())
                .nicknames(game.getNicknames())
                .hostPlayer(game.getPlayers().get(0))
                .build();
    }
}
