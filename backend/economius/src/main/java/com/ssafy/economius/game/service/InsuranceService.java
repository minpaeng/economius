package com.ssafy.economius.game.service;

import com.ssafy.economius.common.exception.validator.GameValidator;
import com.ssafy.economius.game.dto.InsuranceDto;
import com.ssafy.economius.game.dto.request.InsuranceRequest;
import com.ssafy.economius.game.dto.response.InsuranceVisitResponse;
import com.ssafy.economius.game.entity.redis.*;
import com.ssafy.economius.game.repository.redis.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class InsuranceService {
    private final GameRepository gameRepository;
    private final GameValidator gameValidator;

    public boolean checkHaveInsurance(Game game, Long player, int insuranceId) {
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(player);
        // 멤버 포트폴리오 - 보험
        PortfolioInsurances portfolioInsurances = portfolio.getInsurances();
        //log.info(portfolio.toString());
        //log.info(portfolioInsurances.toString());
        return (portfolioInsurances.getInsurance()!=null && portfolioInsurances.getInsurance().get(insuranceId) != null);
    }
    public InsuranceVisitResponse visitInsurance(int roomId, InsuranceRequest insuranceRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);
        log.info(game.getInsurances().toString());
        Map<Integer, Insurance> insurances = game.getInsurances();

        //멤버의 보험 상품 별 가입 유무
        HashMap<Integer, Boolean> have = new HashMap<>();
        //보험 상품 정보
        HashMap<Integer, InsuranceDto> insuranceDto = new HashMap<>();
        for(Integer key : insurances.keySet()) {
            log.info(String.valueOf(checkHaveInsurance(game, insuranceRequest.getPlayer(), key)));
            if(checkHaveInsurance(game, insuranceRequest.getPlayer(), key)) {
                have.put(key, true);
            }
            else {
                have.put(key, false);
            }
            Insurance insurance = insurances.get(key);
            InsuranceDto dto = InsuranceDto.builder()
                    .insuranceCode(insurance.getProductCode())
                    .getInsuranceName(insurance.getProductName())
                    .perPrice(insurance.getMonthlyDeposit())
                    .insuranceBenefit(insurance.getGuaranteeRate())
                    .build();
            insuranceDto.put(key, dto);
        }

        InsuranceVisitResponse response = InsuranceVisitResponse.builder()
                .player(insuranceRequest.getPlayer())
                .have(have)
                .insuranceDto(insuranceDto)
                .build();
        //log.info(response.toString());
        return response;
    }

    public void joinInsurance(int roomId, InsuranceRequest insuranceRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(insuranceRequest.getPlayer());
        // 멤버 포트폴리오 - 보험
        PortfolioInsurances portfolioInsurance = portfolio.getInsurances();
        //보험 상품 정보
        Insurance nowInsuranceInfo = game.getInsurances().get(insuranceRequest.getInsuranceId());
        //log.info(nowInsuranceInfo.toString());

        // 지불 가능한지 먼저 확인
        gameValidator.canBuy(roomId, portfolio.getMoney(), nowInsuranceInfo.getMonthlyDeposit());

        PortfolioInsurances portfolioInsurances = portfolio.getInsurances();
        //가입 안되어 있는지 확인
        if(!checkHaveInsurance(game, insuranceRequest.getPlayer(), insuranceRequest.getInsuranceId())) {
            PortfolioInsurance nowInsurance = PortfolioInsurance.builder()
                    .insuranceId(insuranceRequest.getInsuranceId())
                    .category(nowInsuranceInfo.getCategory())
                    .categoryCode(nowInsuranceInfo.getCategoryCode())
                    .productCode(nowInsuranceInfo.getProductCode())
                    .productName(nowInsuranceInfo.getProductName())
                    .guaranteeRate(nowInsuranceInfo.getGuaranteeRate())
                    .monthlyDeposit(nowInsuranceInfo.getMonthlyDeposit())
                    .build();

            portfolio.setMoney(portfolio.getMoney() - nowInsuranceInfo.getMonthlyDeposit());
            portfolioInsurance.setTotalPrice(portfolioInsurance.getTotalPrice() + nowInsuranceInfo.getMonthlyDeposit());
            portfolioInsurance.setAmount(portfolioInsurance.getAmount() + 1);

            if(portfolioInsurances.getInsurance() == null) portfolioInsurances.setInsurance(new HashMap<>());
            portfolioInsurances.getInsurance().put(insuranceRequest.getInsuranceId(), nowInsurance);

            // redis 저장
            gameRepository.save(game);
            log.info("============ 보험 가입 : {} ============", nowInsurance.toString());
            log.info("============ 보험 가입 후 보험 포트폴리오 : {} ============", game.getPortfolios().get(insuranceRequest.getPlayer()).getInsurances().toString());
        }


    }

    public void stopInsurance(int roomId, InsuranceRequest insuranceRequest) {
        //게임 방 조회
        Game game = gameValidator.checkValidGameRoom(gameRepository.findById(roomId), roomId);

        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(insuranceRequest.getPlayer());
        // 멤버 포트폴리오 - 보험
        PortfolioInsurances portfolioInsurance = portfolio.getInsurances();
        //보험 상품 정보
        Insurance nowInsuranceInfo = game.getInsurances().get(insuranceRequest.getInsuranceId());
        //log.info(nowInsuranceInfo.toString());

        if(checkHaveInsurance(game, insuranceRequest.getPlayer(), insuranceRequest.getInsuranceId())) {
            // 현재 보험 정보에 기반하여 해지
            portfolioInsurance.setAmount(portfolioInsurance.getAmount() - 1);

            // 보험 해지
            portfolioInsurance.getInsurance().remove(insuranceRequest.getInsuranceId());
            gameRepository.save(game);
            log.info("============ 보험 해지 : {} ============", portfolioInsurance.getInsurance().get(insuranceRequest.getInsuranceId()).toString());
            log.info("============ 보험 해지 후 보험 포트폴리오: {} ============", game.getPortfolios().get(insuranceRequest.getPlayer()).getInsurances().toString());
        }
    }
}
