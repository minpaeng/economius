package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IssueDto {

    private Integer issueId;
    private String name;
    private boolean type;
    private String country;
    private String year;
    private String description;
    private String url;
    private List<IssueStockDto> issueStockDtos = new ArrayList<>();
    private List<PrevIssueDto> prevIssueDtos = new ArrayList<>();
}
