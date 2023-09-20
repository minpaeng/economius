package com.ssafy.economius.common.exception.validator;

import com.ssafy.economius.game.entity.redis.Building;
import org.springframework.stereotype.Component;

@Component
public class BuildingValidator {

    public void checkBuildingBuyingStatus(int money, int buildingId, Building building) {
        // 이미 구매한 빌딩이라면 에러


        // 이미 누군가사 소유한 빌딩이라면 에러

        // 보유 자산이 빌딩 가격보다 적다면 에러
//        if (money < building.getPrice())처리
    }
}
