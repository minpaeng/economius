package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Integer> {
}
