package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.PayFeeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class PayFeeResponse {

    private PayFeeDto visitor;
    private PayFeeDto owner;
}
