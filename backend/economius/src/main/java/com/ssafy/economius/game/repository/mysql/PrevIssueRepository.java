package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.PrevIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrevIssueRepository extends JpaRepository<PrevIssue, Integer> {
}
