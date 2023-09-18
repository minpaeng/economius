package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.IssueStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueStockRepository extends JpaRepository<IssueStock, Integer> {
}
