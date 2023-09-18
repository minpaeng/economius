package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Integer> {
}
