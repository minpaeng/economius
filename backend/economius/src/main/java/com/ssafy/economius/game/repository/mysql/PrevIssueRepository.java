package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.PrevIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PrevIssueRepository extends JpaRepository<PrevIssue, Integer> {

    @Query("select p from PrevIssue p join fetch p.issue")
    List<PrevIssue> findPrevIssueWithIssue();

    @Query("select p from PrevIssue p join fetch p.issue where p.issue.issueId=:issueId")
    List<PrevIssue> findPrevIssueByIssueId(@Param("issueId") int issueId);
}
