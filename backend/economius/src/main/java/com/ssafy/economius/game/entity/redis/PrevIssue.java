package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;

@Getter
@AllArgsConstructor
@Builder
public class PrevIssue {

    @Id
    private int prevIssueId;
    @Indexed
    private int issueId;
    private String foretoken;
}
