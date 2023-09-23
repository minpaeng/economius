package com.ssafy.economius.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;

@RedisHash
@Data
@AllArgsConstructor
@Builder
public class IssueAssetChange {

    @Id
    private Integer issueStockId;
    @Indexed
    private String assetType;
    @Indexed
    private Integer assetId;
    private Integer changeUnit;
    private String changeReason;
}
