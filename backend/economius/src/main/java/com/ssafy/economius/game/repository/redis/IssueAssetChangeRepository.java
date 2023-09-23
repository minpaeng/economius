package com.ssafy.economius.game.repository.redis;

import com.ssafy.economius.game.entity.redis.IssueAssetChange;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IssueAssetChangeRepository extends CrudRepository<IssueAssetChange, Integer> {

    List<IssueAssetChange> findByAssetType(String assetType);
}
