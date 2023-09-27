package com.ssafy.economius.game.dto;

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
    private int changePercentage;
    private String changeCategory;
}
