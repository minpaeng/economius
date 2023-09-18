package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Integer> {
}
