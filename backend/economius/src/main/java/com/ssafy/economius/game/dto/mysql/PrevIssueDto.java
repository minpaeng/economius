package com.ssafy.economius.game.dto.mysql;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class PrevIssueDto {

    private Integer prevIssueId;
    private Integer issueId;
    private String foretoken;
}
