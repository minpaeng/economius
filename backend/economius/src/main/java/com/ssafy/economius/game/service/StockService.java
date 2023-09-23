package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.Stock;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class StockService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public void buyStock(int roomId, int stockId, int stockAmount, Long player){
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 주식의 갯수만큼 주식을 살 수 있는지 파악

        // 갯수는 문제없는지
        Stock stock = game.getStocks().get(stockId);
        if (stock.checkStockAvailableToPurchase(stockAmount)) {
            // 에러 발생
            // 갯수부족
        }

        // 금액은 문제 없는지
        Portfolio portfolio = game.getPortfolios().get(player);
        int money = portfolio.getMoney();
        int price = stock.getPrice() * stockAmount;
        gameValidator.canBuy(roomId, money, price);

        // 모두 통과했다..
        stock.dealStock(player, stockAmount);
        portfolio.getStocks().updatePortfolioStock(stock, stockAmount);

        gameRepository.save(game);
    }
}
