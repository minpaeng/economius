package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.response.SavingBankInfoResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.SavingResponse;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingService {

    private final GameRepository gameRepository;
    private final ModelMapper modelMapper;

    public SavingBankInfoResponse visitBank(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        // 멤버 아이디 포트폴리오 조회
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 아이디 적금 포트포리오 조회
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        // 멤버 아이디 적금 포트포리오 리스트 조회
        List<PortfolioSaving> portfolioSavingList = portfolioSavings.getSaving();

        //멤버 아이디 적금 포트폴리오 조회
        SavingDto savingDto = SavingDto.builder().build();

        if (portfolioSavingList != null)   {
            for(PortfolioSaving portfolioSaving : portfolioSavingList) {
                if(portfolioSaving.getBankId() == savingRequest.getBankId()) {
                    savingDto = SavingDto.builder()
                            .bankId(portfolioSaving.getBankId())
                            .savingName(portfolioSaving.getSavingName())
                            .monthlyDeposit(portfolioSaving.getMonthlyDeposit())
                            .currentPrice(portfolioSaving.getCurrentPrice())
                            .currentCount(portfolioSaving.getCurrentCount())
                            .totalCount(portfolioSaving.getFinishCount())
                            .rate(portfolioSaving.getRate())
                            .build();
                }
            }
        }
        else {
            savingDto = SavingDto.builder().build();
        }

        SavingBankInfoResponse savingBankInfoResponse = SavingBankInfoResponse.builder()
                .player(portfolio.getPlayer())
                .money(portfolio.getMoney())
                .savings(savingDto)
                .build();
        log.info(savingBankInfoResponse.toString());
        return savingBankInfoResponse;
    }

    public SavingResponse joinSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        // 멤버 아이디 포트폴리오 조회
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 아이디 적금 포트포리오 조회
        PortfolioSavings portfolioSavings = portfolio.getSavings();

        //해당 은행 적금 정보 조회
        List<Saving> savings = game.getSavings();
        PortfolioSaving newPortfolioSaving;
        for(Saving s : savings) {
            if(s.getBankId().toString().equals(savingRequest.getBankId())) {
                newPortfolioSaving = PortfolioSaving.builder()
                        .bankId(savingRequest.getBankId())
                        .savingName(s.getName())
                        .monthlyDeposit(s.getMonthlyDeposit())
                        .currentPrice(s.getMonthlyDeposit())
                        .currentCount(1)
                        .finishCount(s.getFinishCount())
                        .rate(s.getRate())
                        .build();
                portfolioSavings.getSaving().add(newPortfolioSaving);
            }
        }


        gameRepository.save(game);

        // 멤버 아이디 적금 포트포리오 리스트 조회
        List<PortfolioSaving> portfolioSavingList = portfolioSavings.getSaving();

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
