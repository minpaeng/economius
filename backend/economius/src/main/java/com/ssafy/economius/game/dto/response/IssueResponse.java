package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.dto.AssetChangeDto;
import com.ssafy.economius.game.enums.IssueEnum;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@ToString
@Data
@Builder
public class IssueResponse {

    private int issueId;
    private String name;
    private IssueEnum type;
    private String country;
    private String year;
    private String description;
    private String url;
    private AssetChangeDto goldChange;
    private AssetChangeDto interestRateChange;
    private AssetChangeDto buildingChange;
    private List<AssetChangeDto> stockChanges;
}
