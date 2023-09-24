package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class IssueStockDto {

    private Integer issueStockId;
    private Integer issueId;
    private String name;
    private boolean type;
    private String assetType;
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
