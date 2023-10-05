package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.response.SavingVisitResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingService {

    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    //현재 은행 적금 정보 구하기
    public Saving findNowSavingInfo(Game game, int bankId) {
        Saving nowSaving = game.getSavings().get(bankId);
        log.info("============ 현재 은행의 적금 정보 : {} ============", nowSaving.toString());
        return nowSaving;
    }

    public boolean checkHaveSaving(Game game, Long player, int bankId) {
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(player);
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();

        return (portfolioSavings.getSavings()!=null && portfolioSavings.getSavings().get(bankId) != null);
    }

    public SavingVisitResponse visitBank(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();

        // 현재 은행 정보
        Saving nowSavingInfo = findNowSavingInfo(game, savingRequest.getBankId());

        boolean have;
        SavingDto savingDto;
        
        // 멤버 포트폴리오 - 소유 적금 리스트
        if(checkHaveSaving(game, savingRequest.getPlayer(), savingRequest.getBankId())) {
            // 해당 적금 갖고있는 경우 - 해당 사용자의 적금 정보를 mapping
            have = true;
            PortfolioSaving hasSavingInfo = portfolioSavings.getSavings().get(savingRequest.getBankId());
            savingDto = SavingDto.builder()
                    .bankId(savingRequest.getBankId())
                    .name(hasSavingInfo.getName())
                    .monthlyDeposit(hasSavingInfo.getMonthlyDeposit())
                    .currentPrice(hasSavingInfo.getCurrentPrice())
                    .currentCount(hasSavingInfo.getCurrentCount())
                    .finishCount(hasSavingInfo.getFinishCount())
                    .rate(hasSavingInfo.getRate())
                    .build();
        }
        else {
            // 해당 적금 없는 경우 - 현재 은행의 적금 정보를 mapping
            have = false;
            savingDto = SavingDto.builder()
                    .bankId(savingRequest.getBankId())
                    .name(nowSavingInfo.getName())
                    .monthlyDeposit(nowSavingInfo.getMonthlyDeposit())
                    .currentPrice(0)
                    .currentCount(0)
                    .finishCount(nowSavingInfo.getFinishCount())
                    .rate(nowSavingInfo.getRate())
                    .build();
        }

        SavingVisitResponse savingVisitResponse = SavingVisitResponse.builder()
                .player(savingRequest.getPlayer())
                .money(portfolio.getMoney())
                .have(have)
                .savingDto(savingDto)
                .build();

        log.info("============ 은행 방문 시 반환 : {} ============", savingVisitResponse.toString());
        return savingVisitResponse;
    }

    public void joinSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        //현재 은행 정보
        Saving nowSavingInfo = findNowSavingInfo(game, savingRequest.getBankId());
        log.info(String.valueOf(portfolio.getMoney()));


        gameValidator.canBuy(roomId, portfolio.getMoney(),nowSavingInfo.getMonthlyDeposit() );

        // 가입 안되어 있는지 확인 
        if(!checkHaveSaving(game, savingRequest.getPlayer(), savingRequest.getBankId())) {
            PortfolioSaving nowSaving = PortfolioSaving.builder()
                    .bankId(savingRequest.getBankId())
                    .name(nowSavingInfo.getName())
                    .monthlyDeposit(nowSavingInfo.getMonthlyDeposit())
                    .currentPrice(nowSavingInfo.getMonthlyDeposit())
                    .currentCount(1)
                    .finishCount(nowSavingInfo.getFinishCount())
                    .rate(nowSavingInfo.getRate())
                    .build();

            // 현재 은행 정보에 기반하여 가입
            int money = portfolioSavings.join(nowSaving);
            portfolio.setMoney(portfolio.getMoney()-money);

            // redis 저장
            gameRepository.save(game);
            log.info("============ 은행 적금 가입 : {} ============", game.getPortfolios().get(savingRequest.getPlayer()).getSavings().toString());
        }

    }

    public void stopSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        // 해지 대상 적금
        PortfolioSaving nowSaving = portfolioSavings.getSavings().get(savingRequest.getBankId());

        // 가입 되어있는지 확인
        if(checkHaveSaving(game, savingRequest.getPlayer(), savingRequest.getBankId())) {
            // 적금 중도 해지
            int money = portfolioSavings.earlyFinish(nowSaving);

            // 해지금 현금화
            portfolio.setMoney(money);

            gameRepository.save(game);
            log.info("============ 은행 적금 해지 : {} ============", game.getPortfolios().get(savingRequest.getPlayer()).getSavings().toString());
        }
    }

}
