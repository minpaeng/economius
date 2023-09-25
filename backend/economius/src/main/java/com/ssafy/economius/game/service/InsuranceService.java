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
 
        return (portfolioInsurances.getInsurance()!=null && portfolioInsurances.getInsurance().get(insuranceId) != null);
    }

    public int applyInsurance(Game game, Long player, int applyInsuranceId, int price) {
        int afterPrice = price;

        // 멤버 포트폴리오 - 보험
        Portfolio portfolio = game.getPortfolios().get(player);
        PortfolioInsurances portfolioInsurances = portfolio.getInsurances();
        int applyRate = 0;
        if(applyInsuranceId == 1) {
            if(checkHaveInsurance(game, player, 1)) applyRate += game.getInsurances().get(1).getGuaranteeRate();
            if(checkHaveInsurance(game, player, 2)) applyRate += game.getInsurances().get(2).getGuaranteeRate();
        }
        else if(applyInsuranceId == 2) {
            if(checkHaveInsurance(game, player, 2)) applyRate += game.getInsurances().get(2).getGuaranteeRate();
        }
        else if(applyInsuranceId == 3) {
            if(checkHaveInsurance(game, player, 3)) applyRate += game.getInsurances().get(3).getGuaranteeRate();
            if(checkHaveInsurance(game, player, 4)) applyRate += game.getInsurances().get(4).getGuaranteeRate();
        }
        else if(applyInsuranceId == 4) {
            if(checkHaveInsurance(game, player, 4)) applyRate += game.getInsurances().get(4).getGuaranteeRate();
        }
        afterPrice = price - (int) (price * (applyRate / 100.0));
        return afterPrice;
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
        log.info("============ 보험 방문 : {} ============", response.toString());
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
            portfolioInsurance.setTotalPrice(portfolioInsurance.getTotalPrice()+ nowInsuranceInfo.getMonthlyDeposit());
            portfolioInsurance.setAmount(portfolioInsurance.getAmount() + 1);

            if(portfolioInsurances.getInsurance() == null) portfolioInsurances.setInsurance(new HashMap<>());
            portfolioInsurances.getInsurance().put(insuranceRequest.getInsuranceId(), nowInsurance);

            // redis 저장
            gameRepository.save(game);
            log.info("============ 보험 가입 : {} ============", game.getPortfolios().get(insuranceRequest.getPlayer()).getInsurances().toString());
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

        if(checkHaveInsurance(game, insuranceRequest.getPlayer(), insuranceRequest.getInsuranceId())) {
            // 현재 보험 정보에 기반하여 해지
            portfolioInsurance.setAmount(portfolioInsurance.getAmount() - 1);

            // 보험 해지
            portfolioInsurance.getInsurance().remove(insuranceRequest.getInsuranceId());
            gameRepository.save(game);
            
            log.info("============ 보험 해지 : {} ============", game.getPortfolios().get(insuranceRequest.getPlayer()).getInsurances().toString());
        }
    }
}
