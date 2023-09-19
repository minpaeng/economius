package com.ssafy.economius.game.dto.request;

import com.ssafy.economius.game.dto.SavingsDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
public class SavingRequest {

    private Long player;
    private String bankCode;
}
