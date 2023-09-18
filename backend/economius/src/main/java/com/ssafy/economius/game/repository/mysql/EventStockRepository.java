package com.ssafy.economius.game.repository.mysql;

import com.ssafy.economius.game.entity.mysql.EventStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventStockRepository extends JpaRepository<EventStock, Integer> {
}
