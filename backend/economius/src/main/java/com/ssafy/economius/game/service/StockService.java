package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.message.GameRoomMessage;
import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.response.BuyStockResponse;
import com.ssafy.economius.game.dto.response.SellStockResponse;
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

    public BuyStockResponse buyStock(int roomId, int stockId, int stockAmount, Long player) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 갯수는 문제없는지
        Stock stock = game.getStocks().get(stockId);

        // 금액은 문제 없는지
        Portfolio portfolio = game.getPortfolios().get(player);
        validateStockToBuy(roomId, stockAmount, stock, portfolio);

        // 모두 통과했다..
        stock.dealStock(player, stockAmount);
        portfolio.getStocks().updatePortfolioStock(stock, stockAmount);

        gameRepository.save(game);

        return new BuyStockResponse(player);
    }


    public SellStockResponse sellStock(int roomId, int stockId, int stockAmount, Long player) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        stockAmount *= -1;
        Stock stock = game.getStocks().get(stockId);
        Portfolio portfolio = game.getPortfolios().get(player);

        validateStockToBuy(roomId, stockAmount, stock, portfolio);

        stock.dealStock(player, stockAmount);
        portfolio.getStocks().updatePortfolioStock(stock, stockAmount);

        gameRepository.save(game);

        return new SellStockResponse(player);
    }

    private void validateStockToBuy(int roomId, int stockAmount, Stock stock, Portfolio portfolio) {
        int money = portfolio.getMoney();
        int price = stock.getPrice() * stockAmount;
        gameValidator.canBuy(roomId, money, price);

        if (stock.checkStockAvailableToPurchase(stockAmount)) {
            throw CustomWebsocketException.builder()
                .roomId(roomId)
                .code(GameRoomMessage.NOT_ENOUGH_STOCK.getCode())
                .message(GameRoomMessage.NOT_ENOUGH_STOCK.getMessage())
                .build();
        }
    }

}
