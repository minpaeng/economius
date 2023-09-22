package com.ssafy.economius.game.entity.redis;

import com.ssafy.economius.game.enums.IssueEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@Builder
public class Issue {

    private String name;
    private IssueEnum type;
    private String country;
    private String year;
    private String description;
    private String url;
    private Map<Integer, IssueAssetChange> issueAssetsChanges;
    private List<PrevIssue> prevIssues;
}
