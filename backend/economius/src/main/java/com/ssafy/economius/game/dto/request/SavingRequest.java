package com.ssafy.economius.game.dto.request;

import lombok.Getter;

@Getter
public class SavingRequest {

    private Long player;
    private int bankId;

    @Override
    public String toString() {
        return "SavingRequest{" +
                "player=" + player +
                ", bankId=" + bankId +
                '}';
    }
}

