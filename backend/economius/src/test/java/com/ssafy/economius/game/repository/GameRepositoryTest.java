package com.ssafy.economius.game.repository;

import com.ssafy.economius.game.entity.Game;
import com.ssafy.economius.game.entity.Portfolio;
import com.ssafy.economius.game.entity.PortfolioBuilding;
import com.ssafy.economius.game.entity.PortfolioBuildings;
import com.ssafy.economius.game.entity.PortfolioGold;
import com.ssafy.economius.game.entity.PortfolioSaving;
import com.ssafy.economius.game.entity.PortfolioStock;
import com.ssafy.economius.game.entity.PortfolioStocks;
import com.ssafy.economius.game.entity.Stock;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GameRepositoryTest {

    @Autowired
    private GameRepository gameRepository;

    @Test
    void test() {
        List<String> player = List.of("1", "2", "3", "4");
//        PortfolioGold portfolioGold = new PortfolioGold();
//        PortfolioStocks portfolioStocks = new PortfolioStocks();
//        new PortfolioSaving();
//        new PortfolioStocks();
//        new PortfolioBuilding();
//        new PortfolioBuildings();

        Game game = new Game();
        gameRepository.save(game);
    }
}