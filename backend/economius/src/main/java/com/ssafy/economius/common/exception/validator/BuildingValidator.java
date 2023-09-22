package com.ssafy.economius.common.exception.validator;

import com.ssafy.economius.common.exception.CustomWebsocketException;
import com.ssafy.economius.common.exception.message.BuildingMessage;
import com.ssafy.economius.game.entity.redis.Building;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class BuildingValidator {

    public void checkBuildingBuyingStatus(Long player, int roomId, Building building) {
        checkAlreadyOwnBuilding(player, building.getOwnerId(), roomId);
        checkAlreadyOwnedBuilding(building, roomId);
    }

    public void checkBuildingSellingStatus(Long player, int roomId, Building building) {
        checkNotOwnBuilding(player, building.getOwnerId(), roomId);
    }

    private void checkAlreadyOwnBuilding(Long player, Long ownerId, int roomId) {
        if (ownerId != null && Objects.equals(player, ownerId)) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(BuildingMessage.ALREADY_OWNED_BUILDING.getCode())
                    .message(BuildingMessage.ALREADY_OWNED_BUILDING.getMessage())
                    .build();
        }
    }

    private void checkAlreadyOwnedBuilding(Building building, int roomId) {
        if (building.getOwnerId() != null) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(BuildingMessage.ALREADY_OWNED_BUILDING.getCode())
                    .message(BuildingMessage.ALREADY_OWNED_BUILDING.getMessage())
                    .build();
        }
    }

    private void checkNotOwnBuilding(Long player, Long ownerId, int roomId) {
        if (ownerId != null && Objects.equals(player, ownerId)) {
            throw CustomWebsocketException.builder()
                    .roomId(roomId)
                    .code(BuildingMessage.ALREADY_OWNED_BUILDING.getCode())
                    .message(BuildingMessage.ALREADY_OWNED_BUILDING.getMessage())
                    .build();
        }
    }
}
