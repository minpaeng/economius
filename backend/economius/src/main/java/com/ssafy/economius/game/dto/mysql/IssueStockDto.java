package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IssueStockDto {

    private Integer issueStockId;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
