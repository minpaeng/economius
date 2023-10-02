package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.enums.IssueEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
@Builder
@AllArgsConstructor
@Getter
public class Issue {

    private int issueId;
    private String name;
    private IssueEnum type;
    private String country;
    private String year;
    private String description;
    private String url;
    private List<AssetChange> currentAssetChanges;
}
