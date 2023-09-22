package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class IssueAssetChange {

    private Integer issueStockId;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
