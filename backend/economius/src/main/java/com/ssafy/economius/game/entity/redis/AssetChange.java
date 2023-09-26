package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.enums.ChangeUnit;
import com.ssafy.economius.game.enums.IssueEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class AssetChange {

    private Integer issueStockId;
    private Integer issueId;
    private String issueName;
    private IssueEnum type;
    private String assetType;
    private Integer assetId;
    private String stockType;
    private ChangeUnit changeRate;
    private String changeReason;
}
