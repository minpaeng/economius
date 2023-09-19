package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.*;

import com.ssafy.economius.game.dto.response.CalculateResponse;
import com.ssafy.economius.game.dto.response.GameJoinResponse;
import com.ssafy.economius.game.dto.response.GameStartResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.PortfolioBuildings;
import com.ssafy.economius.game.entity.redis.PortfolioGold;
import com.ssafy.economius.game.entity.redis.PortfolioSavings;
import com.ssafy.economius.game.entity.redis.PortfolioStocks;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameRepository gameRepository;

    public GameJoinResponse join(int roomId, Long player) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );

        if (game.getPlayers().size() >=4){
            throw new RuntimeException("방에 인원이 다 찼습니다.");
        }

        game.getPlayers().add(player);
        gameRepository.save(game);

        return new GameJoinResponse(roomId);
    }

    public GameStartResponse start(int roomId, Long hostPlayer) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );

        if (!game.getPlayers().get(0).equals(hostPlayer)) {
            log.error("호스트가 아닌 사용자의 요청");
            throw new RuntimeException();
        }

        // 현제인원이 4명인지 체크
        if (game.getPlayers().size() != 4) {
            log.error("인원이 부족합니다.");
            throw new RuntimeException();
        }

        // 각자의 포트폴리오 생성
        uploadInitialPortfolioOnRedis(game);

        return new GameStartResponse(roomId);
    }

    private void uploadInitialPortfolioOnRedis(Game game) {
        Map<Long, Portfolio> portfolioMap = new HashMap<>();
        for (Long player : game.getPlayers()) {
            portfolioMap.put(player, Portfolio.builder()
                .money(INITIAL_MONEY.getValue())
                .player(player)
                .gold(makePortfolioGold())
                .savings(makePortfolioSavings())
                .building(makePortfolioBuildings())
                .stocks(makePortfolioStocks())
                .build());
        }

        game.initializePortfolio(portfolioMap);
        gameRepository.save(game);
    }

    private PortfolioStocks makePortfolioStocks() {
        return PortfolioStocks.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .earningPrice(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .earningRate(INITIAL_ZERO_VALUE.getValue())
            .stocks(new ArrayList<>())
            .build();
    }

    private PortfolioBuildings makePortfolioBuildings(){
        return PortfolioBuildings.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .earningPrice(INITIAL_ZERO_VALUE.getValue())
            .earningRate(INITIAL_ZERO_VALUE.getValue())
            .building(new ArrayList<>())
            .build();
    }

    private PortfolioGold makePortfolioGold() {
        return PortfolioGold.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .build();
    }

    private PortfolioSavings makePortfolioSavings() {
        return PortfolioSavings.builder()
            .amount(INITIAL_ZERO_VALUE.getValue())
            .totalPrice(INITIAL_ZERO_VALUE.getValue())
            .savings(new ArrayList<>())
            .build();
    }

    public CalculateResponse calculate(int roomId, Long player) {
        return null;
    }
}
