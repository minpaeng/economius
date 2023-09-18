package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.EventStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventStockRepository extends JpaRepository<EventStock, Integer> {

    @Query("select e from EventStock e join fetch e.stockIndustry")
    List<EventStock> findAllWithStockIndustry();
}
