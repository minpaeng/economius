package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Integer> {

    @Query("select s from Stock s join fetch s.stockIndustry")
    List<Stock> findAllWithStockIndustries();
}
