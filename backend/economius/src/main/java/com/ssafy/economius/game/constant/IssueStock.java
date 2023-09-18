package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueStock {

    private Integer issueStockId;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
