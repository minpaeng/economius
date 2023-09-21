package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.SavingInfoDto;
import com.ssafy.economius.game.dto.response.SavingBankInfoResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.SavingResponse;
import com.ssafy.economius.game.enums.SavingIdEnums;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingService {

    private final GameRepository gameRepository;
    private GameValidator gameValidator;

    //현재 은행 적금 정보 구하기
    public Saving findNowSavingInfo(Game game, SavingRequest savingRequest) {
        Saving nowSaving = Saving.builder().build();
        nowSaving = game.getSavings().get(savingRequest.getPlayer());
        log.info(nowSaving.toString());
        return nowSaving;
    }


    // 플레이어가 현재 적금 정보 구하기
    public PortfolioSaving findMemberNowSaving(Game game, SavingRequest savingRequest) {
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        // 멤버 포트폴리오 - 소유 적금 리스트
        PortfolioSaving portfolioSaving  = portfolioSavings.getSavings().get(savingRequest.getBankId());

        return portfolioSaving;
    }

    public SavingBankInfoResponse visitBank(int roomId, SavingRequest savingRequest) {
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();


        // 멤버 포트폴리오 - 소유 적금 리스트
        //PortfolioSaving portfolioSaving = portfolioSavings.getSavings().get(savingRequest.getBankId());

        //log.info(portfolioSaving.toString());
        // 없는 경우 가입을 위해 현재 은행 적금 정보

        // 있는 경우 멤버의 적금 정보


        SavingBankInfoResponse savingBankInfoResponse = SavingBankInfoResponse.builder()
                //.player(savingRequest.getPlayer())
                //.money(game.getPortfolios().get(savingRequest.getPlayer()).getMoney())
                //.memberSavings(memberSavings)
                //.savingInfoDto(savingInfoDto)
                .build();
        log.info(savingBankInfoResponse.toString());
        return savingBankInfoResponse;
    }

    public SavingResponse joinSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        //멤버 적금 포폴(전체 & 리스트) 구하기
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 적금 포폴 (전체)
        PortfolioSavings memberSavingInfo = portfolio.getSavings();
        // 멤버 적금 포폴 (리스트)
        List<PortfolioSaving> memberSavingList;
        //= Optional.ofNullable(memberSavingInfo.getSavings()).orElse(new ArrayList<>());



        //멤버가 지불 가능한지 확인


        //현재 적금 포폴 + 현재 은행 적금 (추가 & 레디스 저장)
//        PortfolioSaving joinSavingInfo = PortfolioSaving.builder()
//                .bankId(nowSaving.getBankId().toString())
//                .savingName(nowSaving.getName())
//                .monthlyDeposit(nowSaving.getMonthlyDeposit())
//                .currentPrice(nowSaving.getMonthlyDeposit()) //지금까지 낸 금액
//                .currentCount(1) //지금까지 낸 횟수
//                .finishCount(nowSaving.getFinishCount()) //해당 적금 만기까지 총 횟수
//                .rate(nowSaving.getRate())
//                .build();
//        memberSavingList.add(joinSavingInfo);
//        PortfolioSavings afterJoin = PortfolioSavings.builder()
//                .totalPrice((memberSavingInfo.getTotalPrice() + nowSaving.getMonthlyDeposit()))
//                .amount((memberSavingInfo.getAmount()) + 1)
//                .savings(memberSavingList)
//                .build();


        //game.getPortfolios().get(savingRequest.getPlayer()).setSavings(afterJoin);
        gameRepository.save(game);


        // response
        SavingResponse savingResponse = SavingResponse.builder()
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
