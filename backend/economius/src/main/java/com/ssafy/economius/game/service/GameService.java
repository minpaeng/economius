package com.ssafy.economius.game.service;

import static com.ssafy.economius.game.enums.RateEnum.*;

import com.ssafy.economius.game.dto.response.GameStartResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.PortfolioBuildings;
import com.ssafy.economius.game.entity.redis.PortfolioGold;
import com.ssafy.economius.game.entity.redis.PortfolioSavings;
import com.ssafy.economius.game.entity.redis.PortfolioStocks;
import com.ssafy.economius.game.repository.redis.GameRepository;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameRepository gameRepository;

    public GameStartResponse start(int roomId, Long hostPlayer) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("일치하는 방이 존재하지 않습니다.")
        );

        // 호스트의 요청인지 체크
        if(!game.getPlayers().get(0).equals(hostPlayer)){
            throw new RuntimeException();
        }

        // 현제인원이 4명인지 체크
        if (game.getPlayers().size() != 4) {
            throw new RuntimeException();
        }

        // 각자의 포트폴리오 생성
        uploadInitialPortfolioOnRedis(game);

        return new GameStartResponse(roomId);
    }

    private void uploadInitialPortfolioOnRedis(Game game) {
        for (Long player : game.getPlayers()) {
            game.getPortfolios().put(player, Portfolio.builder()
                .money(INITIAL_MONEY.getValue())
                .player(player)
                .gold(makePortfolioGold())
                .savings(makePortfolioSavings())
                .building(makePortfolioBuildings())
                .stocks(makePortfolioStocks())
                .build());
        }

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
}
