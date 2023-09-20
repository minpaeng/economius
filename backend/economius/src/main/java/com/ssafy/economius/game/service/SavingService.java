package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.GoldDto;
import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.entity.redis.Game;
import com.ssafy.economius.game.dto.SavingsDto;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.SavingResponse;
import com.ssafy.economius.game.entity.redis.Portfolio;
import com.ssafy.economius.game.entity.redis.PortfolioSaving;
import com.ssafy.economius.game.entity.redis.PortfolioSavings;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingService {

    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;

//    @PostConstruct
//    public void init() {
//        modelMapper.createTypeMap(PortfolioSaving.class, SavingDto.class);
//    }

    public SavingResponse visitBank(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        //멤버 아이디 포트폴리오 조회
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        log.info(portfolio.toString());
        //멤버 아이디 적금 포트폴리오 조회
//        List<SavingsDto> savingsDtos = new ArrayList<>();
//        for(PortfolioSavings portfolioSavings : portfolio.getSavings()) {
//            SavingsDto savingsDto = SavingsDto.builder()
//                    .totalPrice(portfolioSavings.getTotalPrice())
//                    .amount(portfolioSavings.getAmount())
//                    .build();
//            savingsDtos.add(savingsDto);
//        }
        ModelMapper modelMapper1 = portfolio.getSavings()
        SavingResponse savingResponse = SavingResponse.builder()
                .player(portfolio.getPlayer())
                .money(portfolio.getMoney())
                //.savings(savingsDtos)
                .build();
        return savingResponse;
    }

    public SavingResponse joinSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        //멤버 아이디 포트폴리오 조회
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());

        //멤버 아이디 포트폴리오 - 적금 전체 조회
        SavingsDto savingsDto = modelMapper.map(portfolio.getSavings(), SavingsDto.class);

        // response
        SavingResponse savingResponse = SavingResponse.builder()
                .player(portfolio.getPlayer())
                .money(portfolio.getMoney())
                //.savings(savingsDto)
                .build();
        return savingResponse;
    }


    public SavingResponse stopSavings(int roomId, SavingRequest savingRequest) {
        SavingResponse savingResponse = SavingResponse.builder()
                .player(savingRequest.getPlayer())
                .build();
        return savingResponse;
    }
}
