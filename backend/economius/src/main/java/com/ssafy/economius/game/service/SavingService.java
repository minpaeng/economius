package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.SavingDto;
import com.ssafy.economius.game.dto.SavingsDto;
import com.ssafy.economius.game.dto.response.SavingVisitResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.dto.request.SavingRequest;
import com.ssafy.economius.game.dto.response.SavingResponse;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class SavingService {

    private final GameRepository gameRepository;
    private GameValidator gameValidator;
    private ModelMapper modelMapper;

    //현재 은행 적금 정보 구하기
    public Saving findNowSavingInfo(Game game, SavingRequest savingRequest) {
        Saving nowSaving = game.getSavings().get(savingRequest.getBankId());
        log.info("============ 현재 은행의 적금 정보 : {} ============", nowSaving.toString());
        return nowSaving;
    }

    // 포트폴리오 적금 리스트 entity -> Dto
    public Map<Integer, SavingDto> convertToDtoMap(Map<Integer, PortfolioSaving> savings) {
        return savings.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey, // key는 그대로 사용
                        entry -> convertToSavingDto(entry.getValue()) // value는 변환된 DTO를 사용
                ));
    }
    private SavingDto convertToSavingDto(PortfolioSaving portfolioSaving) {
        return SavingDto.builder()
                .bankId(portfolioSaving.getBankId())
                .name(portfolioSaving.getName())
                .monthlyDeposit(portfolioSaving.getMonthlyDeposit())
                .currentPrice(portfolioSaving.getCurrentPrice())
                .currentCount(portfolioSaving.getCurrentCount())
                .finishCount(portfolioSaving.getFinishCount())
                .rate(portfolioSaving.getRate())
                .build();
    }


    public SavingVisitResponse visitBank(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();

        // 현재 은행 정보
        Saving nowSavingInfo = findNowSavingInfo(game, savingRequest);

        boolean have;
        SavingDto savingDto;
        
        // 멤버 포트폴리오 - 소유 적금 리스트
        if(portfolioSavings.getSavings()!=null && portfolioSavings.getSavings().get(savingRequest.getBankId()) != null) {
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

    public SavingResponse joinSavings(int roomId, SavingRequest savingRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(savingRequest.getPlayer());
        // 멤버 포트폴리오 - 적금
        PortfolioSavings portfolioSavings = portfolio.getSavings();
        //현재 은행 정보
        Saving nowSavingInfo = findNowSavingInfo(game, savingRequest);

        // 지불 가능한지 먼저 확인
        gameValidator.canBuy(roomId, portfolio.getMoney(), nowSavingInfo.getMonthlyDeposit());

        // 현재 은행 정보에 기반하여 가입
        portfolio.setMoney(portfolio.getMoney()-nowSavingInfo.getMonthlyDeposit());
        portfolioSavings.setTotalPrice(portfolioSavings.getTotalPrice()+ nowSavingInfo.getMonthlyDeposit());
        portfolioSavings.setAmount(portfolioSavings.getAmount()+1);

        PortfolioSaving nowSaving = PortfolioSaving.builder()
                .bankId(savingRequest.getBankId())
                .name(nowSavingInfo.getName())
                .monthlyDeposit(nowSavingInfo.getMonthlyDeposit())
                .currentPrice(nowSavingInfo.getMonthlyDeposit())
                .currentCount(1)
                .finishCount(nowSavingInfo.getFinishCount())
                .rate(nowSavingInfo.getRate())
                .build();

        if (portfolioSavings.getSavings() == null) portfolioSavings.setSavings(new HashMap<>());
        portfolioSavings.getSavings().put(savingRequest.getBankId(), nowSaving);

        // redis 저장
        gameRepository.save(game);

        Map<Integer, SavingDto> savingsDtoMap = convertToDtoMap(portfolioSavings.getSavings());
        SavingsDto responseSaving = SavingsDto.builder()
                .totalPrice(portfolioSavings.getTotalPrice())
                .amount(portfolioSavings.getAmount())
                .savings(savingsDtoMap)
                .build();

        // response
        SavingResponse savingResponse = SavingResponse.builder()
                .player(savingRequest.getPlayer())
                .money(portfolio.getMoney())
                .savings(responseSaving)
                .build();
        log.info("============ 은행 적금 가입 시 반환 : {} ============", savingResponse.toString());
        return savingResponse;
    }

    public SavingResponse stopSavings(int roomId, SavingRequest savingRequest) {
        SavingResponse savingResponse = SavingResponse.builder()
                .player(savingRequest.getPlayer())
                .build();
        return savingResponse;
    }
}
