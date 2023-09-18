package com.ssafy.economius.game.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.economius.game.dto.GoldDto;
import com.ssafy.economius.game.dto.request.BuyGoldRequest;
import com.ssafy.economius.game.dto.response.BuyGoldResponse;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.entity.redis.Portfolio;
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

    public BuyGoldResponse buyGold(int roomId, BuyGoldRequest buyGoldRequest) {
        Game game = gameRepository.findById(roomId).orElseThrow(
            () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        Long player = buyGoldRequest.getPlayer();
        int amount = buyGoldRequest.getGoldAmount();

        Portfolio portfolio = game.getPortfolios().get(player);
        int money = portfolio.getMoney();
        int price = game.getGold().getPrice();

        if (price * amount > money){
            throw new RuntimeException("금액이 부족합니다.");
        }

        portfolio.setMoney(portfolio.getMoney() - price * buyGoldRequest.getGoldAmount());

        portfolio.getGold().setAmount(portfolio.getGold().getAmount() + amount);

        portfolio.getGold().setTotalPrice(portfolio.getGold().getAmount() * price);

        gameRepository.save(game);

        // 멤버아이디 돈 골드 디티오
        GoldDto goldDto = modelMapper.map(portfolio.getGold(), GoldDto.class);

        return null;
    }

}
