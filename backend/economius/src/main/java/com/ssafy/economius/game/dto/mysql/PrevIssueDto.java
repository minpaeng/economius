package com.ssafy.economius.game.dto.mysql;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class PrevIssueDto {

    private Integer prevIssueId;
    private Integer issueId;
    private String foretoken;
}
