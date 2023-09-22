package com.ssafy.economius.game.service;

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

    public boolean checkHaveInsurance(Game game, Long player, int insuranceId) {
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(player);
        // 멤버 포트폴리오 - 보험
        PortfolioInsurances portfolioInsurances = portfolio.getInsurances();
        log.info(portfolio.toString());
        log.info(portfolioInsurances.toString());
        return (portfolioInsurances.getInsurance()!=null && portfolioInsurances.getInsurance().get(insuranceId) != null);
    }
    public InsuranceVisitResponse visitInsurance(int roomId, InsuranceRequest insuranceRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );
        Map<Integer, Insurance> insurances = game.getInsurances();

        //멤버의 보험 상품 별 가입 유무
        HashMap<Integer, Boolean> have = new HashMap<>();
        //보험 상품 정보
        HashMap<Integer, InsuranceDto> insuranceDto = new HashMap<>();

        for(Integer key : insurances.keySet()) {
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
        log.info(response.toString());
        return response;
    }

    public void joinInsurance(int roomId, InsuranceRequest insuranceRequest) {
        //게임 방 조회
        Game game = gameRepository.findById(roomId).orElseThrow(
                () -> new RuntimeException("해당하는 게임이 존재하지 않습니다.")
        );
        // 멤버 포트폴리오
        Portfolio portfolio = game.getPortfolios().get(insuranceRequest.getPlayer());
        // 멤버 포트폴리오 - 보험
        PortfolioInsurances portfolioInsurance = portfolio.getInsurances();
        //보험 상품 정보
        Insurance nowInsuranceInfo = game.getInsurances().get(insuranceRequest.getInsuranceId());
        log.info(nowInsuranceInfo.toString());
        //가입 안되어 있는지 확인
        if(!checkHaveInsurance(game, insuranceRequest.getPlayer(), insuranceRequest.getInsuranceId())) {

            PortfolioInsurance joinInsurance = PortfolioInsurance.builder() 
                    .build();
        }


    }

    public void stopInsurance(int roomId, InsuranceRequest insuranceRequest) {
    }
}
