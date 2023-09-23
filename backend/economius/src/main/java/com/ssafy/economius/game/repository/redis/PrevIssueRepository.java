package com.ssafy.economius.game.repository.redis;

import com.ssafy.economius.game.entity.redis.PrevIssue;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PrevIssueRepository extends CrudRepository<PrevIssue, Integer> {

    List<PrevIssue> findByIssueId(int issueId);
}
