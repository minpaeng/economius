package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.GoldDto;
import com.ssafy.economius.game.dto.response.BuyGoldResponse;
import com.ssafy.economius.game.dto.response.GoldSelectResponse;
import com.ssafy.economius.game.dto.response.SellGoldResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.PortfolioGold;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GoldService {

    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;
    private final GameValidator gameValidator;

    public BuyGoldResponse buyGold(int roomId, Long player, int goldAmount) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        Portfolio portfolio = game.getPortfolios().get(player);
        int money = portfolio.getMoney();
        int price = game.getGold().getPrice();

        if (price * goldAmount > money) {
            throw new RuntimeException("금액이 부족합니다.");
        }

        PortfolioGold gold = portfolio.getGold();

        portfolio.setMoney(portfolio.getMoney() - price * goldAmount);
        gold.dealGold(goldAmount, price);

        gameRepository.save(game);

        GoldDto goldDto = modelMapper.map(portfolio.getGold(), GoldDto.class);

        return BuyGoldResponse.builder()
            .gold(goldDto)
            .money(portfolio.getMoney())
            .player(player)
            .build();
    }

    public SellGoldResponse sellGold(int roomId, Long player, int goldAmount) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        Portfolio portfolio = game.getPortfolios().get(player);
        goldAmount *= -1;

        int price = game.getGold().getPrice();
        PortfolioGold gold = portfolio.getGold();
        gold.dealGold(goldAmount, price);
        portfolio.setMoney(portfolio.getMoney() - price * goldAmount);

        gameRepository.save(game);

        GoldDto goldDto = modelMapper.map(portfolio.getGold(), GoldDto.class);

        return SellGoldResponse.builder()
            .gold(goldDto)
            .money(portfolio.getMoney())
            .player(player)
            .build();
    }

    public GoldSelectResponse selectGold(int roomId, Long player) {
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        GoldSelectResponse goldSelectResponse = modelMapper.map(game.getGold(),
            GoldSelectResponse.class);
        goldSelectResponse.setPlayer(player);

        return goldSelectResponse;
    }
}
