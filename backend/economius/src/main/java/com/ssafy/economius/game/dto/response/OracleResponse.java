package com.ssafy.economius.game.dto.response;

import com.ssafy.economius.game.enums.IssueEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OracleResponse {

    private int issueId;
    private String name;
    private IssueEnum type;
    private String country;
    private String year;
    private String description;
    private String url;
}
