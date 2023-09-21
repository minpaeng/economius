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
    public Saving findNowSavingInfo(Game game, String bankId) {
        Saving nowSaving = Saving.builder().build();
//        for(Saving saving : game) {
//            log.info(saving.toString());
//            log.info(bankId);
//            if(saving.getBankId().toString().equals(bankId)) {
//                nowSaving = Saving.builder()
//                        .bankId(SavingIdEnums.valueOf(bankId))
//                        .name(saving.getName())
//                        .monthlyDeposit(saving.getMonthlyDeposit())
//                        .finishCount(saving.getFinishCount())
//                        .rate(saving.getRate())
//                        .build();
//            }
//        }
        log.info(game.getSavings().toString());
        nowSaving = game.getSavings().get(Integer.parseInt(bankId));
        log.info(nowSaving.toString());
        return nowSaving;
    }


    // 플레이어가 가진 특정 적금 정보 구하기
    public PortfolioSaving findMemberNowSaving(Game game, SavingRequest savingRequest) {
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        // 멤버 포트폴리오 - 소유 적금 리스트
        List<PortfolioSaving> portfolioSavingList = portfolioSavings.getSavings();

        if(portfolioSavingList == null) return null; //적금 아무것도 없는 경우
        else {
            for(PortfolioSaving savingList : portfolioSavingList) {
                //if(savingList.getBankId().equals(savingRequest.getBankId())) return savingList;
            }
        }
        return null;
    }

//    public SavingBankInfoResponse visitBank(int roomId, SavingRequest savingRequest) {
//        //게임 방 조회
//        Game game = gameRepository.findById(roomId).orElseThrow(
//                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
//        );
//
//        // 멤버 아이디 포트폴리오 조회
//        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
//        // 멤버 아이디 적금 포트포리오 조회
//        PortfolioSavings portfolioSavings = portfolio.getSavings();
//        // 멤버 아이디 적금 포트포리오 리스트 조회
//        List<PortfolioSaving> portfolioSavingList = portfolioSavings.getSaving();
//
//        //멤버 아이디 적금 포트폴리오 조회
//        SavingDto savingDto = SavingDto.builder().build();
//
//        if (portfolioSavingList != null)   {
//            for(PortfolioSaving portfolioSaving : portfolioSavingList) {
//                if(portfolioSaving.getBankId() == savingRequest.getBankId()) {
//                    savingDto = SavingDto.builder()
//                            .bankId(portfolioSaving.getBankId())
//                            .savingName(portfolioSaving.getSavingName())
//                            .monthlyDeposit(portfolioSaving.getMonthlyDeposit())
//                            .currentPrice(portfolioSaving.getCurrentPrice())
//                            .currentCount(portfolioSaving.getCurrentCount())
//                            .totalCount(portfolioSaving.getFinishCount())
//                            .rate(portfolioSaving.getRate())
//                            .build();
//                }
//            }
//        }
//        else {
//            savingDto = SavingDto.builder().build();
//        }
//
//        SavingBankInfoResponse savingBankInfoResponse = SavingBankInfoResponse.builder()
//                .player(portfolio.getPlayer())
//                .money(portfolio.getMoney())
//                .savings(savingDto)
//                .build();
//        log.info(savingBankInfoResponse.toString());
//        return savingBankInfoResponse;
//    }
//
//    public SavingResponse joinSavings(int roomId, SavingRequest savingRequest) {
//        //게임 방 조회
//        Game game = gameRepository.findById(roomId).orElseThrow(
//                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
//        );
//
//        // 멤버 아이디 포트폴리오 조회
//        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
//        log.info(portfolio.toString());
//
//        // 멤버 아이디 적금 포트포리오 조회
//        //PortfolioSavings{totalPrice=0, amount=0, saving=null}
//        PortfolioSavings portfolioSavings = portfolio.getSavings();
//        log.info(portfolioSavings.toString());
//
//        // 멤버 아이디 적금 포트포리오 리스트 조회
//        //Unhandled exception from message handler method
//        // []
//        List<PortfolioSaving> portfolioSavingList;
//        if(portfolioSavings.getSaving()!=null) {
//            portfolioSavingList = portfolioSavings.getSaving();
//        }
//        else {
//            portfolioSavingList = new ArrayList<>();
//        }
//        log.info(portfolioSavingList.toString());
//
//        //해당 은행 적금 정보 조회
//        List<Saving> savings = game.getSavings();
//        log.info(savings.toString());
//
//        // 가입하는 내역 포트폴리오
//        PortfolioSaving joinPortfolioSaving = PortfolioSaving.builder().build();
//        // 가입 후 하나씩 적금 정보
//        SavingsDto joinSavingsDto = SavingsDto.builder().build();
//
//        // 가입 후 전체 적금 정보
//        List<SavingDto> savingDtoList = new ArrayList<>();
//
//        // 은행 정보 중 가입하는 은행 확인 후 적용
//        for(Saving s : savings) {
//            if(s.getBankId().toString().equals(savingRequest.getBankId())) {
//                joinPortfolioSaving = PortfolioSaving.builder()
//                        .bankId(savingRequest.getBankId())
//                        .savingName(s.getName())
//                        .monthlyDeposit(s.getMonthlyDeposit())
//                        .currentPrice(s.getMonthlyDeposit())
//                        .currentCount(1)
//                        .finishCount(s.getFinishCount())
//                        .rate(s.getRate())
//                        .build();
//
//                joinSavingsDto = SavingsDto.builder()
//                        .totalPrice(portfolioSavings.getTotalPrice() + s.getMonthlyDeposit())
//                        .amount(portfolioSavings.getAmount() + 1)
//                        .build();
//            }
//            SavingDto savingDto = SavingDto.builder()
//                    .bankId(savingRequest.getBankId())
//                    .savingName(s.getName())
//                    .monthlyDeposit(s.getMonthlyDeposit())
//                    .currentPrice(s.getMonthlyDeposit())
//                    .currentCount(1)
//                    .totalCount(1)
//                    .rate(s.getRate())
//                    .build();
//            savingDtoList.add(savingDto);
//        }
//
//
//        //현재 적금 지불 가능한지 확인
//        //gameValidator.canBuy(portfolio.getMoney(), joinPortfolioSaving.getMonthlyDeposit());
//
//        //적금 지불 적용
//        portfolioSavings.getSaving().add(joinPortfolioSaving);
//        gameRepository.save(game);
//
//        joinSavingsDto.setSavings(savingDtoList);
//
//        // response
//        SavingResponse savingResponse = SavingResponse.builder()
//                .player(portfolio.getPlayer())
//                .money(portfolio.getMoney())
//                .savings(joinSavingsDto)
//                .build();
//
//        return savingResponse;
//    }

    public SavingBankInfoResponse visitBank(int roomId, SavingRequest savingRequest) {
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        log.info(savingRequest.toString());
        Saving saving = findNowSavingInfo(game, String.valueOf(savingRequest.getBankId()));
        PortfolioSaving memberSaving = findMemberNowSaving(game, savingRequest);


        SavingDto memberSavings = SavingDto.builder().build();
        SavingInfoDto savingInfoDto = SavingInfoDto.builder().build();

        // 없는 경우 가입을 위해 현재 은행 적금 정보
        if(memberSaving == null) savingInfoDto = saving.toDto();
        // 있는 경우 멤버의 적금 정보
        else memberSavings = memberSaving.toDto();


        SavingBankInfoResponse savingBankInfoResponse = SavingBankInfoResponse.builder()
                .player(savingRequest.getPlayer())
                .money(game.getPortfolios().get(savingRequest.getPlayer()).getMoney())
                .memberSavings(memberSavings)
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
        List<PortfolioSaving> memberSavingList = Optional.ofNullable(memberSavingInfo.getSavings())
                                                            .orElse(new ArrayList<>());



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
