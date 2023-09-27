package com.ssafy.economius.game.dto;

import com.ssafy.economius.game.enums.IssueEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@AllArgsConstructor
@Builder
public class AssetChangeDto {

    private String assetType;
    private Integer assetId;
    private String stockType;
    private ChangeUnitDto changeRate;
    private String changeReason;
}
