package com.ssafy.economius.game.service;

import com.ssafy.economius.game.dto.request.BuyBuildingsRequest;
import com.ssafy.economius.game.dto.request.PayFeeRequest;
import com.ssafy.economius.game.dto.request.SelectBuildingRequest;
import com.ssafy.economius.game.dto.request.SellBuildingsRequest;
import com.ssafy.economius.game.dto.response.BuyBuildingResponse;
import com.ssafy.economius.game.dto.response.PayFeeResponse;
import com.ssafy.economius.game.dto.response.SelectBuildingResponse;
import com.ssafy.economius.game.dto.response.SellBuildingsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BuildingService {

    public PayFeeResponse payFee(int roomId, PayFeeRequest payFeeRequest) {
        return PayFeeResponse.builder().build();
    }

    public BuyBuildingResponse buyBuildings(int roomId, BuyBuildingsRequest buyBuildingsRequest) {
        return BuyBuildingResponse.builder().build();
    }

    public SellBuildingsResponse sellBuildings(int roomId, SellBuildingsRequest sellBuildingsRequest) {
        return SellBuildingsResponse.builder()
                .build();
    }

    public SelectBuildingResponse selectBuilding(int roomId, SelectBuildingRequest selectBuildingRequest) {
        return SelectBuildingResponse.builder()
                .build();
    }
}
