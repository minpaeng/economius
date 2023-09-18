package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.StockIndustry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockIndustryRepository extends JpaRepository<StockIndustry, Integer> {
}
