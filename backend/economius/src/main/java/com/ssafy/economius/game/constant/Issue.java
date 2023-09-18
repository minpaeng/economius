package com.ssafy.economius.game.constant;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Issue {

    private Integer issueId;
    private String name;
    private boolean type;
    private String country;
    private String year;
    private String description;
    private List<IssueStock> issueStocks = new ArrayList<>();
    private List<PrevIssue> prevIssues = new ArrayList<>();
}
